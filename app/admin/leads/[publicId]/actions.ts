"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import {
  addAdminClientContact,
  addAdminLeadNote,
  updateAdminClientFields,
  updateAdminLeadWorkingFields,
  uploadAdminLeadFile,
} from "@/lib/admin/leads";

function readPublicId(formData: FormData) {
  const publicId = formData.get("publicId");

  if (typeof publicId !== "string" || !publicId.trim()) {
    throw new Error("Lead public id is required");
  }

  return publicId.trim();
}

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/leads?auth=invalid");
  }
}

function redirectBack(publicId: string, saved: string) {
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${publicId}`);
  redirect(`/admin/leads/${publicId}?saved=${saved}`);
}

export async function updateLeadAction(formData: FormData) {
  await requireAdmin();

  const publicId = readPublicId(formData);

  await updateAdminLeadWorkingFields({
    publicId,
    productInterest: formData.get("productInterest"),
    projectType: formData.get("projectType"),
    scale: formData.get("scale"),
    location: formData.get("location"),
    timeline: formData.get("timeline"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    note: formData.get("note"),
  });

  redirectBack(publicId, "lead");
}

export async function updateClientAction(formData: FormData) {
  await requireAdmin();

  const publicId = readPublicId(formData);

  await updateAdminClientFields({
    publicId,
    name: formData.get("name"),
    company: formData.get("company"),
    clientType: formData.get("clientType"),
    note: formData.get("note"),
  });

  redirectBack(publicId, "client");
}

export async function addNoteAction(formData: FormData) {
  await requireAdmin();

  const publicId = readPublicId(formData);

  await addAdminLeadNote({
    publicId,
    text: formData.get("text"),
  });

  redirectBack(publicId, "note");
}

export async function addContactAction(formData: FormData) {
  await requireAdmin();

  const publicId = readPublicId(formData);

  await addAdminClientContact({
    publicId,
    contactType: formData.get("contactType"),
    contactValue: formData.get("contactValue"),
    label: formData.get("label"),
    isPrimary: formData.get("isPrimary"),
  });

  redirectBack(publicId, "contact");
}

export async function uploadFileAction(formData: FormData) {
  await requireAdmin();

  const publicId = readPublicId(formData);
  const file = formData.get("file");

  if (!(file instanceof File)) {
    throw new Error("File is required");
  }

  await uploadAdminLeadFile({
    publicId,
    file,
    fileCategory: formData.get("fileCategory"),
  });

  redirectBack(publicId, "file");
}
