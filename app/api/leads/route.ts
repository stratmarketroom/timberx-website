import { createLeadFromQuiz } from "@/lib/lead-system/leads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const result = await createLeadFromQuiz(
      payload && typeof payload === "object" && !Array.isArray(payload)
        ? payload
        : {},
    );

    return Response.json(result, { status: result.status });
  } catch (error) {
    console.error("Failed to create lead", error);
    return Response.json(
      { ok: false, error: "Lead could not be created" },
      { status: 500 },
    );
  }
}
