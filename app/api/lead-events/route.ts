import { createLeadEvent } from "@/lib/lead-system/lead-events";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const result = await createLeadEvent(
      body && typeof body === "object" ? body : {},
    );

    if (!result.ok) {
      return Response.json(
        { ok: false, error: result.error },
        { status: result.status },
      );
    }

    return Response.json(
      {
        ok: true,
        id: result.id,
        createdAt: result.createdAt,
      },
      { status: result.status },
    );
  } catch (error) {
    console.error("Failed to create lead event", error);

    return Response.json(
      { ok: false, error: "Lead event could not be saved" },
      { status: 500 },
    );
  }
}

