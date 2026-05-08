import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const adminSessionCookie = "timberx_admin_session";
const adminActorCookie = "timberx_admin_actor";

function getAdminPassword() {
  return process.env.TIMBERX_ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD ?? null;
}

function createSessionValue(password: string) {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  return createHash("sha256")
    .update(`timberx-admin:${password}:${serviceKey}`)
    .digest("hex");
}

function safeEquals(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function cleanActorName(value: unknown) {
  if (typeof value !== "string") {
    return "Менеджер";
  }

  const trimmed = value.trim();

  return trimmed ? trimmed.slice(0, 80) : "Менеджер";
}

export function isAdminConfigured() {
  const password = getAdminPassword();
  return Boolean(password && !password.includes("PASTE_"));
}

export async function isAdminAuthenticated() {
  const password = getAdminPassword();

  if (!password || password.includes("PASTE_")) {
    return false;
  }

  const session = (await cookies()).get(adminSessionCookie)?.value;

  if (!session) {
    return false;
  }

  return safeEquals(session, createSessionValue(password));
}

export async function getAdminActorName() {
  const actor = (await cookies()).get(adminActorCookie)?.value;

  if (!actor) {
    return "Менеджер";
  }

  return cleanActorName(decodeURIComponent(actor));
}

export async function createAdminSession(passwordAttempt: string, actorName?: unknown) {
  const password = getAdminPassword();

  if (!password || password.includes("PASTE_")) {
    return { ok: false as const, error: "Адмін-пароль не налаштований." };
  }

  if (!safeEquals(passwordAttempt, password)) {
    return { ok: false as const, error: "Невірний пароль." };
  }

  const cookieStore = await cookies();

  cookieStore.set(adminSessionCookie, createSessionValue(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 12,
  });
  cookieStore.set(adminActorCookie, encodeURIComponent(cleanActorName(actorName)), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 12,
  });

  return { ok: true as const };
}

export async function clearAdminSession() {
  const cookieStore = await cookies();

  cookieStore.delete(adminSessionCookie);
  cookieStore.delete(adminActorCookie);
}
