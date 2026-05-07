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

function getStartPayload(text?: string) {
  if (!text?.startsWith("/start")) {
    return null;
  }

  return text.replace(/^\/start(@\w+)?\s*/i, "").trim() || "direct";
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
      `Telegram chat_id: ${chat.id}`,
      `Джерело: ${startPayload}`,
    ].join("\n"),
  );

  return { ok: true, ignored: false, startPayload };
}

