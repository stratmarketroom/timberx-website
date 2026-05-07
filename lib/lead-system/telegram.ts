import { insertSupabaseRow, selectSupabaseRows } from "./supabase-rest";
import { findLeadByPublicId } from "./leads";

type TelegramChat = {
  id?: number;
  type?: string;
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
};

type TelegramUser = {
  id?: number;
  username?: string;
  first_name?: string;
  last_name?: string;
};

type TelegramMessage = {
  message_id?: number;
  text?: string;
  chat?: TelegramChat;
  from?: TelegramUser;
};

export type TelegramUpdate = {
  update_id?: number;
  message?: TelegramMessage;
};

function getTelegramConfig() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const leadsChatId = process.env.TELEGRAM_LEADS_CHAT_ID;

  if (!botToken || !leadsChatId) {
    throw new Error("Telegram configuration is missing");
  }

  return {
    botToken,
    leadsChatId,
  };
}

function getDisplayName(user?: TelegramUser) {
  if (!user) {
    return "Невідомий користувач";
  }

  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");

  if (user.username) {
    return fullName ? `${fullName} (@${user.username})` : `@${user.username}`;
  }

  return fullName || `Telegram ID ${user.id}`;
}

function getTelegramLabel(user?: TelegramUser) {
  const name = getDisplayName(user);

  if (user?.id) {
    return `${name} / Telegram user_id ${user.id}`;
  }

  return name;
}

function getStartPayload(text?: string) {
  if (!text?.startsWith("/start")) {
    return null;
  }

  return text.replace(/^\/start(@\w+)?\s*/i, "").trim() || "direct";
}

function createClientPublicId() {
  const timestamp = new Date().toISOString().replace(/\D/g, "").slice(2, 17);
  return `TXC-${timestamp}`;
}

async function sendTelegramMessage(chatId: string | number, text: string) {
  const { botToken } = getTelegramConfig();
  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  const body = await response.text();

  if (!response.ok) {
    throw new Error(`Telegram sendMessage failed: ${response.status} ${body}`);
  }
}

async function findClientByTelegramChatId(chatId: number) {
  const rows = await selectSupabaseRows({
    table: "client_contacts",
    select: "client_id,clients(id,public_id,name,company)",
    filters: {
      contact_type: "telegram",
      contact_value: chatId,
    },
    limit: 1,
  });

  const row = rows[0];

  if (!row || typeof row.client_id !== "string") {
    return null;
  }

  const client = row.clients;
  const clientRecord =
    client && typeof client === "object" && !Array.isArray(client)
      ? (client as Record<string, unknown>)
      : null;

  return {
    id: row.client_id,
    publicId:
      typeof clientRecord?.public_id === "string" ? clientRecord.public_id : null,
  };
}

async function createTelegramClient(chatId: number, user?: TelegramUser) {
  const clientRows = await insertSupabaseRow({
    table: "clients",
    payload: {
      public_id: createClientPublicId(),
      name: getDisplayName(user),
      client_type: "unknown",
    },
  });

  const client = clientRows[0];
  const clientId = typeof client?.id === "string" ? client.id : null;
  const publicId = typeof client?.public_id === "string" ? client.public_id : null;

  if (!clientId) {
    throw new Error("Supabase did not return created client id");
  }

  await insertSupabaseRow({
    table: "client_contacts",
    payload: {
      client_id: clientId,
      contact_type: "telegram",
      contact_value: String(chatId),
      label: getTelegramLabel(user),
      is_primary: true,
      verified_at: new Date().toISOString(),
    },
  });

  return {
    id: clientId,
    publicId,
  };
}

async function addTelegramContactToClient({
  clientId,
  chatId,
  user,
}: {
  clientId: string;
  chatId: number;
  user?: TelegramUser;
}) {
  try {
    await insertSupabaseRow({
      table: "client_contacts",
      payload: {
        client_id: clientId,
        contact_type: "telegram",
        contact_value: String(chatId),
        label: getTelegramLabel(user),
        is_primary: false,
        verified_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (!message.includes("duplicate key")) {
      throw error;
    }
  }
}

async function registerTelegramStart({
  chatId,
  user,
  startPayload,
}: {
  chatId: number;
  user?: TelegramUser;
  startPayload: string;
}) {
  const existingClient = await findClientByTelegramChatId(chatId);
  const lead = startPayload.startsWith("TX-")
    ? await findLeadByPublicId(startPayload)
    : null;
  const client = existingClient ?? (
    lead
      ? { id: lead.clientId, publicId: null }
      : await createTelegramClient(chatId, user)
  );

  if (!existingClient && lead) {
    await addTelegramContactToClient({
      clientId: lead.clientId,
      chatId,
      user,
    });
  }

  await insertSupabaseRow({
    table: "lead_events",
    payload: {
      client_id: client.id,
      lead_id: lead?.id ?? null,
      event_type: "messenger_opened",
      channel: "telegram",
      source_cta: startPayload,
      metadata: {
        telegram_chat_id: chatId,
        telegram_user_id: user?.id ?? null,
        telegram_username: user?.username ?? null,
        telegram_first_name: user?.first_name ?? null,
        telegram_last_name: user?.last_name ?? null,
        start_payload: startPayload,
        client_was_created: !existingClient,
        linked_lead_public_id: lead?.publicId ?? null,
      },
    },
  });

  return {
    client,
    created: !existingClient,
  };
}

export async function handleTelegramUpdate(update: TelegramUpdate) {
  const message = update.message;
  const chat = message?.chat;
  const text = message?.text;
  const startPayload = getStartPayload(text);

  if (!message || !chat?.id || !startPayload) {
    return { ok: true, ignored: true };
  }

  const { leadsChatId } = getTelegramConfig();
  const userLabel = getDisplayName(message.from);
  const registration = await registerTelegramStart({
    chatId: chat.id,
    user: message.from,
    startPayload,
  });

  await sendTelegramMessage(
    chat.id,
    "Вітаємо! Це TimberX. Тут менеджер уточнить деталі для попереднього прорахунку. Якщо маєте креслення, планування або короткий опис задачі, можете надіслати їх сюди.",
  );

  await sendTelegramMessage(
    leadsChatId,
    [
      "Новий Telegram контакт TimberX",
      "",
      `Користувач: ${userLabel}`,
      `Клієнт у базі: ${registration.client.publicId ?? registration.client.id}`,
      `Статус клієнта: ${registration.created ? "створено" : "знайдено існуючого"}`,
      `Telegram chat_id: ${chat.id}`,
      `Джерело: ${startPayload}`,
    ].join("\n"),
  );

  return { ok: true, ignored: false, startPayload };
}
