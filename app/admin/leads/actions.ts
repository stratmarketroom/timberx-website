"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, createAdminSession, getAdminActorName, isAdminAuthenticated } from "@/lib/admin/auth";
import { updateAdminLeadStatus } from "@/lib/admin/leads";

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password");
  const actorName = formData.get("actorName");

  if (typeof password !== "string") {
    redirect("/admin/leads?auth=invalid");
  }

  const result = await createAdminSession(password, actorName);

  if (!result.ok) {
    redirect(`/admin/leads?auth=${result.error.includes("налаштований") ? "missing" : "invalid"}`);
  }

  redirect("/admin/leads");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/leads");
}

export async function updateLeadStatusFromList(formData: FormData) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/leads?auth=invalid");
  }

  const publicId = formData.get("publicId");
  const returnTo = formData.get("returnTo");

  if (typeof publicId !== "string" || !publicId.trim()) {
    throw new Error("Lead public id is required");
  }

  await updateAdminLeadStatus({
    publicId: publicId.trim(),
    status: formData.get("status"),
    actorName: await getAdminActorName(),
  });

  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${publicId.trim()}`);

  if (typeof returnTo === "string" && returnTo.startsWith("/admin/leads") && !returnTo.includes("://")) {
    redirect(returnTo);
  }

  redirect("/admin/leads");
}
