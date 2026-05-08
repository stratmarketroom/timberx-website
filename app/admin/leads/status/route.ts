import { NextResponse } from "next/server";
import { getAdminActorName, isAdminAuthenticated } from "@/lib/admin/auth";
import { updateAdminLeadStatus } from "@/lib/admin/leads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    publicId?: unknown;
    status?: unknown;
  };

  if (typeof body.publicId !== "string" || !body.publicId.trim()) {
    return NextResponse.json({ ok: false, error: "Lead public id is required" }, { status: 400 });
  }

  try {
    await updateAdminLeadStatus({
      publicId: body.publicId.trim(),
      status: body.status,
      actorName: await getAdminActorName(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Status update failed" },
      { status: 500 },
    );
  }
}
