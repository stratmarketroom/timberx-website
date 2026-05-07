import {
  handleTelegramUpdate,
  type TelegramUpdate,
} from "@/lib/lead-system/telegram";

export const runtime = "nodejs";

export async function POST(request: Request) {
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

