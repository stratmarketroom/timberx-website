import { timingSafeEqual } from "node:crypto";
import {
  handleTelegramUpdate,
  type TelegramUpdate,
} from "@/lib/lead-system/telegram";

export const runtime = "nodejs";

const telegramSecretHeader = "x-telegram-bot-api-secret-token";

function getTelegramWebhookSecret() {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (!secret || secret.includes("PASTE_")) {
    return null;
  }

  return secret;
}

function safeEquals(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function authorizeTelegramWebhook(request: Request) {
  const expectedSecret = getTelegramWebhookSecret();

  if (!expectedSecret) {
    console.error("Telegram webhook secret is not configured");
    return {
      ok: false as const,
      response: Response.json(
        { ok: false, error: "Telegram webhook secret is not configured" },
        { status: 500 },
      ),
    };
  }

  const receivedSecret = request.headers.get(telegramSecretHeader);

  if (!receivedSecret || !safeEquals(receivedSecret, expectedSecret)) {
    return {
      ok: false as const,
      response: Response.json({ ok: false, error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { ok: true as const };
}

export async function POST(request: Request) {
  const authorization = authorizeTelegramWebhook(request);

  if (!authorization.ok) {
    return authorization.response;
  }

  let update: TelegramUpdate;

  try {
    update = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const result = await handleTelegramUpdate(update);
    return Response.json(result);
  } catch (error) {
    console.error("Failed to handle Telegram update", error);
    return Response.json(
      { ok: false, error: "Telegram update could not be handled" },
      { status: 500 },
    );
  }
}
