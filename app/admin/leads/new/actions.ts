"use server";

import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { createManualAdminLead } from "@/lib/admin/leads";

export async function createManualLeadAction(formData: FormData) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/leads?auth=invalid");
  }

  const result = await createManualAdminLead({
    name: formData.get("name"),
    company: formData.get("company"),
    clientType: formData.get("clientType"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    telegram: formData.get("telegram"),
    viber: formData.get("viber"),
    sourceKind: formData.get("sourceKind"),
    productInterest: formData.get("productInterest"),
    projectType: formData.get("projectType"),
    scale: formData.get("scale"),
    location: formData.get("location"),
    timeline: formData.get("timeline"),
    priority: formData.get("priority"),
    note: formData.get("note"),
  });

  redirect(`/admin/leads/${result.leadPublicId}?saved=manual`);
}

