"use server";

import { redirect } from "next/navigation";
import { clearAdminSession, createAdminSession } from "@/lib/admin/auth";

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password");

  if (typeof password !== "string") {
    redirect("/admin/leads?auth=invalid");
  }

  const result = await createAdminSession(password);

  if (!result.ok) {
    redirect(`/admin/leads?auth=${result.error.includes("налаштований") ? "missing" : "invalid"}`);
  }

  redirect("/admin/leads");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/leads");
}

