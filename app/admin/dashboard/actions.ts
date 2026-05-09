"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isDirectorAuthenticated } from "@/lib/admin/auth";
import { refreshMarketingAnalytics } from "@/lib/admin/marketing-analytics";
import type { DashboardRange } from "@/lib/admin/dashboard";

function normalizeRange(value: FormDataEntryValue | null): DashboardRange {
  if (value === "7" || value === "30" || value === "90" || value === "all") {
    return value;
  }

  return "30";
}

export async function refreshDashboardAnalytics(formData: FormData) {
  if (!(await isDirectorAuthenticated())) {
    redirect("/admin/dashboard?auth=director");
  }

  const range = normalizeRange(formData.get("range"));
  const status = await refreshMarketingAnalytics(range);

  revalidatePath("/admin/dashboard");
  redirect(`/admin/dashboard?range=${range}&analytics=${status}`);
}
