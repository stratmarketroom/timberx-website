import { insertSupabaseRow, selectSupabaseRows } from "./supabase-rest";

export type LeadRequestInput = {
  name?: unknown;
  contactType?: unknown;
  contactValue?: unknown;
  phone?: unknown;
  email?: unknown;
  audienceType?: unknown;
  hasConsent?: unknown;
  productInterest?: unknown;
  projectType?: unknown;
  scale?: unknown;
  location?: unknown;
  timeline?: unknown;
  sourcePage?: unknown;
  sourceCta?: unknown;
};

function cleanString(value: unknown, maxLength = 500) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  return trimmed.slice(0, maxLength);
}

function normalizeContactValue(contactType: string, value: string) {
  if (contactType === "email") {
    return value.toLowerCase();
  }

  if (contactType === "phone" || contactType === "viber" || contactType === "whatsapp") {
    const normalized = value.replace(/[^\d+]/g, "");
    return normalized.startsWith("+") ? normalized : `+${normalized}`;
  }

  return value;
}

function createPublicId(prefix: "TX" | "TXC") {
  const timestamp = new Date().toISOString().replace(/\D/g, "").slice(2, 17);
  const suffix = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `${prefix}-${timestamp}${suffix}`;
}

function mapAudienceToClientType(audienceType: string | null) {
  switch (audienceType) {
    case "Девелопер":
      return "developer";
    case "Генпідрядник":
      return "general_contractor";
    case "Громада":
      return "community";
    case "Бізнес":
      return "business";
    case "Приватний замовник":
      return "private_client";
    default:
      return "unknown";
  }
}

async function findClientByContact(contactType: string, contactValue: string) {
  const rows = await selectSupabaseRows({
    table: "client_contacts",
    select: "client_id,clients(id,public_id)",
    filters: {
      contact_type: contactType,
      contact_value: contactValue,
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

async function insertClientContact({
  clientId,
  contactType,
  contactValue,
  label,
  isPrimary,
}: {
  clientId: string;
  contactType: string;
  contactValue: string;
  label: string;
  isPrimary: boolean;
}) {
  try {
    await insertSupabaseRow({
      table: "client_contacts",
      payload: {
        client_id: clientId,
        contact_type: contactType,
        contact_value: contactValue,
        label,
        is_primary: isPrimary,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (!message.includes("duplicate key")) {
      throw error;
    }
  }
}

async function createClient({
  name,
  phone,
  email,
  clientType,
}: {
  name: string | null;
  phone: string;
  email: string | null;
  clientType: string;
}) {
  const clientRows = await insertSupabaseRow({
    table: "clients",
    payload: {
      public_id: createPublicId("TXC"),
      name,
      client_type: clientType,
    },
  });

  const client = clientRows[0];
  const clientId = typeof client?.id === "string" ? client.id : null;
  const publicId = typeof client?.public_id === "string" ? client.public_id : null;

  if (!clientId) {
    throw new Error("Supabase did not return created client id");
  }

  await insertClientContact({
    clientId,
    contactType: "phone",
    contactValue: phone,
    label: name ? `Телефон: ${name}` : "Телефон",
    isPrimary: true,
  });

  if (email) {
    await insertClientContact({
      clientId,
      contactType: "email",
      contactValue: email,
      label: name ? `Email: ${name}` : "Email",
      isPrimary: false,
    });
  }

  return {
    id: clientId,
    publicId,
  };
}

async function getOrCreateClient({
  name,
  phone,
  email,
  clientType,
}: {
  name: string | null;
  phone: string;
  email: string | null;
  clientType: string;
}) {
  const existingClient =
    (await findClientByContact("phone", phone)) ??
    (email ? await findClientByContact("email", email) : null);

  if (existingClient) {
    if (email) {
      await insertClientContact({
        clientId: existingClient.id,
        contactType: "email",
        contactValue: email,
        label: name ? `Email: ${name}` : "Email",
        isPrimary: false,
      });
    }

    return {
      client: existingClient,
      created: false,
    };
  }

  return {
    client: await createClient({ name, phone, email, clientType }),
    created: true,
  };
}

export async function createLeadFromQuiz(input: LeadRequestInput) {
  const name = cleanString(input.name, 160);
  const rawPhone = cleanString(input.phone, 160) ?? cleanString(input.contactValue, 160);
  const rawEmail = cleanString(input.email, 160);
  const audienceType = cleanString(input.audienceType, 220);
  const productInterest = cleanString(input.productInterest, 220);
  const projectType = cleanString(input.projectType, 220);
  const hasConsent = input.hasConsent === true;

  if (!rawPhone) {
    return {
      ok: false as const,
      status: 400,
      error: "phone is required",
    };
  }

  if (!hasConsent) {
    return {
      ok: false as const,
      status: 400,
      error: "personal data consent is required",
    };
  }

  if (!productInterest) {
    return {
      ok: false as const,
      status: 400,
      error: "productInterest is required",
    };
  }

  const phone = normalizeContactValue("phone", rawPhone);
  const email = rawEmail ? normalizeContactValue("email", rawEmail) : null;
  const clientType = mapAudienceToClientType(audienceType);
  const { client, created } = await getOrCreateClient({
    name,
    phone,
    email,
    clientType,
  });

  const leadRows = await insertSupabaseRow({
    table: "leads",
    payload: {
      public_id: createPublicId("TX"),
      client_id: client.id,
      source_page: cleanString(input.sourcePage, 500),
      source_cta: cleanString(input.sourceCta, 160) ?? "estimate_quiz",
      initial_channel: "site",
      product_interest: productInterest,
      project_type: projectType,
      scale: cleanString(input.scale, 220),
      location: cleanString(input.location, 220),
      timeline: cleanString(input.timeline, 220),
      status: "new",
      priority: "warm",
    },
  });

  const lead = leadRows[0];
  const leadId = typeof lead?.id === "string" ? lead.id : null;
  const leadPublicId = typeof lead?.public_id === "string" ? lead.public_id : null;

  if (!leadId || !leadPublicId) {
    throw new Error("Supabase did not return created lead id");
  }

  await insertSupabaseRow({
    table: "lead_events",
    payload: {
      client_id: client.id,
      lead_id: leadId,
      event_type: "quiz_submitted",
      channel: "site",
      source_page: cleanString(input.sourcePage, 500),
      source_cta: cleanString(input.sourceCta, 160) ?? "estimate_quiz",
      metadata: {
        client_was_created: created,
        contact_type: "phone",
        has_email: Boolean(email),
        personal_data_consent: hasConsent,
        audience_type: audienceType,
        product_interest: productInterest,
        project_type: projectType,
      },
    },
  });

  return {
    ok: true as const,
    status: 201,
    leadId,
    leadPublicId,
    clientId: client.id,
    clientPublicId: client.publicId,
  };
}

export async function findLeadByPublicId(publicId: string) {
  const rows = await selectSupabaseRows({
    table: "leads",
    select: "id,public_id,client_id",
    filters: {
      public_id: publicId,
    },
    limit: 1,
  });

  const row = rows[0];

  if (!row || typeof row.id !== "string" || typeof row.client_id !== "string") {
    return null;
  }

  return {
    id: row.id,
    publicId: typeof row.public_id === "string" ? row.public_id : publicId,
    clientId: row.client_id,
  };
}
