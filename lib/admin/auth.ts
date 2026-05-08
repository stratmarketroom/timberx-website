import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const adminSessionCookie = "timberx_admin_session";

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

export async function createAdminSession(passwordAttempt: string) {
  const password = getAdminPassword();

  if (!password || password.includes("PASTE_")) {
    return { ok: false as const, error: "Адмін-пароль не налаштований." };
  }

  if (!safeEquals(passwordAttempt, password)) {
    return { ok: false as const, error: "Невірний пароль." };
  }

  (await cookies()).set(adminSessionCookie, createSessionValue(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 12,
  });

  return { ok: true as const };
}

export async function clearAdminSession() {
  (await cookies()).delete(adminSessionCookie);
}

