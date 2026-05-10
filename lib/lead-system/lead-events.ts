import { insertSupabaseRow } from "./supabase-rest";

const allowedChannels = new Set([
  "site",
  "telegram",
  "viber",
  "phone",
  "email",
  "whatsapp",
]);

const allowedPublicEventTypes = new Set([
  "messenger_click",
]);

export type LeadEventInput = {
  eventType?: unknown;
  channel?: unknown;
  sourcePage?: unknown;
  sourceCta?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  utmContent?: unknown;
  referrer?: unknown;
  landingPage?: unknown;
  metadata?: unknown;
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

function cleanMetadata(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

export async function createLeadEvent(input: LeadEventInput) {
  const eventType = cleanString(input.eventType, 120);
  const channel = cleanString(input.channel, 40) ?? "site";
  const sourcePage = cleanString(input.sourcePage, 500);
  const sourceCta = cleanString(input.sourceCta, 160);

  if (!eventType) {
    return {
      ok: false as const,
      status: 400,
      error: "eventType is required",
    };
  }

  if (!allowedPublicEventTypes.has(eventType)) {
    return {
      ok: false as const,
      status: 400,
      error: "eventType is invalid",
    };
  }

  if (!allowedChannels.has(channel)) {
    return {
      ok: false as const,
      status: 400,
      error: "channel is invalid",
    };
  }

  const rows = await insertSupabaseRow({
    table: "lead_events",
    payload: {
      event_type: eventType,
      channel,
      source_page: sourcePage,
      source_cta: sourceCta,
      utm_source: cleanString(input.utmSource, 200),
      utm_medium: cleanString(input.utmMedium, 200),
      utm_campaign: cleanString(input.utmCampaign, 200),
      utm_content: cleanString(input.utmContent, 200),
      referrer: cleanString(input.referrer, 1000),
      landing_page: cleanString(input.landingPage, 1000),
      metadata: cleanMetadata(input.metadata),
    },
  });

  const row = rows[0];

  return {
    ok: true as const,
    status: 201,
    id: typeof row?.id === "string" ? row.id : null,
    createdAt: typeof row?.created_at === "string" ? row.created_at : null,
  };
}
