import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const adminSessionCookie = "timberx_admin_session";
const adminActorCookie = "timberx_admin_actor";
const adminRoleCookie = "timberx_admin_role";

export type AdminRole = "manager" | "director";

function getAdminPassword() {
  return process.env.TIMBERX_ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD ?? null;
}

function getDirectorPassword() {
  return process.env.TIMBERX_DIRECTOR_PASSWORD ?? process.env.DIRECTOR_PASSWORD ?? null;
}

function isUsablePassword(password: string | null) {
  return Boolean(password && !password.includes("PASTE_"));
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
  const directorPassword = getDirectorPassword();

  return isUsablePassword(password) || isUsablePassword(directorPassword);
}

export function isDirectorConfigured() {
  return isUsablePassword(getDirectorPassword());
}

async function getAuthenticatedRole(): Promise<AdminRole | null> {
  const password = getAdminPassword();
  const directorPassword = getDirectorPassword();
  const session = (await cookies()).get(adminSessionCookie)?.value;

  if (!session) {
    return null;
  }

  if (isUsablePassword(directorPassword) && safeEquals(session, createSessionValue(directorPassword as string))) {
    return "director";
  }

  if (isUsablePassword(password) && safeEquals(session, createSessionValue(password as string))) {
    return "manager";
  }

  return null;
}

export async function isAdminAuthenticated() {
  return Boolean(await getAuthenticatedRole());
}

export async function isDirectorAuthenticated() {
  return (await getAuthenticatedRole()) === "director";
}

export async function getAdminRole() {
  return getAuthenticatedRole();
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
  const directorPassword = getDirectorPassword();
  let matchedPassword: string | null = null;
  let matchedRole: AdminRole | null = null;

  if (!isUsablePassword(password) && !isUsablePassword(directorPassword)) {
    return { ok: false as const, error: "Адмін-пароль не налаштований." };
  }

  if (isUsablePassword(directorPassword) && safeEquals(passwordAttempt, directorPassword as string)) {
    matchedPassword = directorPassword as string;
    matchedRole = "director";
  } else if (isUsablePassword(password) && safeEquals(passwordAttempt, password as string)) {
    matchedPassword = password as string;
    matchedRole = "manager";
  }

  if (!matchedPassword || !matchedRole) {
    return { ok: false as const, error: "Невірний пароль." };
  }

  const cookieStore = await cookies();

  cookieStore.set(adminSessionCookie, createSessionValue(matchedPassword), {
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
  cookieStore.set(adminRoleCookie, matchedRole, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 12,
  });

  return { ok: true as const, role: matchedRole };
}

export async function clearAdminSession() {
  const cookieStore = await cookies();

  cookieStore.delete(adminSessionCookie);
  cookieStore.delete(adminActorCookie);
  cookieStore.delete(adminRoleCookie);
}
