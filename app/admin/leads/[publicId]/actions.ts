"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminActorName, isAdminAuthenticated } from "@/lib/admin/auth";
import {
  addAdminClientContact,
  addAdminLeadNote,
  deleteAdminLeadFile,
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
  const actorName = await getAdminActorName();

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
    actorName,
  });

  redirectBack(publicId, "lead");
}

export async function updateClientAction(formData: FormData) {
  await requireAdmin();

  const publicId = readPublicId(formData);
  const actorName = await getAdminActorName();

  await updateAdminClientFields({
    publicId,
    name: formData.get("name"),
    company: formData.get("company"),
    clientType: formData.get("clientType"),
    note: formData.get("note"),
    actorName,
  });

  redirectBack(publicId, "client");
}

export async function addNoteAction(formData: FormData) {
  await requireAdmin();

  const publicId = readPublicId(formData);
  const actorName = await getAdminActorName();

  await addAdminLeadNote({
    publicId,
    text: formData.get("text"),
    actorName,
  });

  redirectBack(publicId, "note");
}

export async function addContactAction(formData: FormData) {
  await requireAdmin();

  const publicId = readPublicId(formData);
  const actorName = await getAdminActorName();

  await addAdminClientContact({
    publicId,
    contactType: formData.get("contactType"),
    contactValue: formData.get("contactValue"),
    label: formData.get("label"),
    isPrimary: formData.get("isPrimary"),
    actorName,
  });

  redirectBack(publicId, "contact");
}

export async function uploadFileAction(formData: FormData) {
  await requireAdmin();

  const publicId = readPublicId(formData);
  const actorName = await getAdminActorName();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    throw new Error("File is required");
  }

  await uploadAdminLeadFile({
    publicId,
    file,
    fileCategory: formData.get("fileCategory"),
    actorName,
  });

  redirectBack(publicId, "file");
}

export async function deleteFileAction(formData: FormData) {
  await requireAdmin();

  const publicId = readPublicId(formData);
  const actorName = await getAdminActorName();

  await deleteAdminLeadFile({
    publicId,
    fileId: formData.get("fileId"),
    actorName,
  });

  redirectBack(publicId, "file");
}
