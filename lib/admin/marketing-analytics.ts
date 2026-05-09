import "server-only";

import type { DashboardRange } from "@/lib/admin/dashboard";

type SupabaseRow = Record<string, unknown>;

type AnalyticsStatus = "not_configured" | "cache_missing" | "ready" | "limit_reached" | "error";

export type DashboardTrafficMetrics = {
  connected: boolean;
  status: AnalyticsStatus;
  message: string;
  sessions: number | null;
  leadConversionPercent: number | null;
  costPerLead: number | null;
  refreshedAt: string | null;
  refreshesToday: number;
  dailyLimit: 1 | 3 | 5;
};

type CachedTrafficData = {
  sessions?: unknown;
  refreshedAt?: unknown;
};

const cacheTable = "dashboard_analytics_cache";
const oauthTokenUrl = "https://oauth2.googleapis.com/token";
const analyticsDataApiUrl = "https://analyticsdata.googleapis.com/v1beta";

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey || serviceRoleKey.includes("PASTE_")) {
    throw new Error("Supabase server configuration is missing");
  }

  return {
    url: url.replace(/\/+$/, ""),
    serviceRoleKey,
  };
}

function getSupabaseHeaders() {
  const { serviceRoleKey } = getSupabaseConfig();

  return {
    apikey: serviceRoleKey,
    authorization: `Bearer ${serviceRoleKey}`,
  };
}

function getAnalyticsConfig() {
  const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;

  if (!propertyId || !clientId || !clientSecret || !refreshToken) {
    return null;
  }

  return {
    propertyId: propertyId.replace(/^properties\//, ""),
    clientId,
    clientSecret,
    refreshToken,
  };
}

function getDailyLimit(): 1 | 3 | 5 {
  const value = process.env.TIMBERX_ANALYTICS_DAILY_LIMIT;

  if (value === "3" || value === "5") {
    return Number(value) as 3 | 5;
  }

  return 1;
}

function getCacheKey(range: DashboardRange) {
  return `ga4_director_dashboard:${range}`;
}

function getPragueDateKey() {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Europe/Prague",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${values.year}-${values.month}-${values.day}`;
}

function getUsageKey() {
  return `ga4_refresh_usage:${getPragueDateKey()}`;
}

function rangeToGa4DateRange(range: DashboardRange) {
  if (range === "all") {
    return {
      startDate: "2020-01-01",
      endDate: "today",
    };
  }

  return {
    startDate: `${Number(range) - 1}daysAgo`,
    endDate: "today",
  };
}

function asRecord(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function asString(value: unknown) {
  return typeof value === "string" ? value : null;
}

async function selectCacheRow(cacheKey: string) {
  const { url } = getSupabaseConfig();
  const params = new URLSearchParams({
    select: "cache_key,data,updated_at",
    cache_key: `eq.${cacheKey}`,
    limit: "1",
  });
  const response = await fetch(`${url}/rest/v1/${cacheTable}?${params.toString()}`, {
    method: "GET",
    headers: getSupabaseHeaders(),
    cache: "no-store",
  });
  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Analytics cache select failed: ${response.status} ${responseText}`);
  }

  return (JSON.parse(responseText) as SupabaseRow[])[0] ?? null;
}

async function upsertCacheRow(cacheKey: string, data: Record<string, unknown>) {
  const { url } = getSupabaseConfig();
  const params = new URLSearchParams({ on_conflict: "cache_key" });
  const response = await fetch(`${url}/rest/v1/${cacheTable}?${params.toString()}`, {
    method: "POST",
    headers: {
      ...getSupabaseHeaders(),
      "content-type": "application/json",
      prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify({
      cache_key: cacheKey,
      data,
    }),
  });
  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Analytics cache upsert failed: ${response.status} ${responseText}`);
  }
}

function emptyTrafficMetrics(status: AnalyticsStatus, message: string): DashboardTrafficMetrics {
  return {
    connected: status !== "not_configured",
    status,
    message,
    sessions: null,
    leadConversionPercent: null,
    costPerLead: null,
    refreshedAt: null,
    refreshesToday: 0,
    dailyLimit: getDailyLimit(),
  };
}

function calculateLeadConversion(sessions: number | null, siteLeadCount: number) {
  if (!sessions || sessions <= 0) {
    return null;
  }

  return Math.round((siteLeadCount / sessions) * 1000) / 10;
}

async function getRefreshesToday() {
  try {
    const row = await selectCacheRow(getUsageKey());
    const data = asRecord(row?.data);

    return asNumber(data?.count) ?? 0;
  } catch {
    return 0;
  }
}

async function incrementRefreshesToday(currentCount: number) {
  await upsertCacheRow(getUsageKey(), {
    count: currentCount + 1,
    date: getPragueDateKey(),
  });
}

async function getGoogleAccessToken() {
  const config = getAnalyticsConfig();

  if (!config) {
    throw new Error("Google Analytics OAuth configuration is missing");
  }

  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    refresh_token: config.refreshToken,
    grant_type: "refresh_token",
  });
  const response = await fetch(oauthTokenUrl, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });
  const responseData = (await response.json()) as Record<string, unknown>;

  if (!response.ok) {
    throw new Error(`Google OAuth token refresh failed: ${response.status} ${JSON.stringify(responseData)}`);
  }

  const accessToken = asString(responseData.access_token);

  if (!accessToken) {
    throw new Error("Google OAuth token response did not include access_token");
  }

  return accessToken;
}

async function fetchGa4Sessions(range: DashboardRange) {
  const config = getAnalyticsConfig();

  if (!config) {
    throw new Error("Google Analytics configuration is missing");
  }

  const accessToken = await getGoogleAccessToken();
  const response = await fetch(`${analyticsDataApiUrl}/properties/${config.propertyId}:runReport`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      dateRanges: [rangeToGa4DateRange(range)],
      metrics: [{ name: "sessions" }],
      limit: "1",
      returnPropertyQuota: true,
    }),
    cache: "no-store",
  });
  const responseData = (await response.json()) as Record<string, unknown>;

  if (!response.ok) {
    throw new Error(`GA4 runReport failed: ${response.status} ${JSON.stringify(responseData)}`);
  }

  const firstRow = Array.isArray(responseData.rows) ? asRecord(responseData.rows[0]) : null;
  const metricValues = Array.isArray(firstRow?.metricValues) ? firstRow.metricValues : [];
  const firstMetric = asRecord(metricValues[0]);

  return asNumber(firstMetric?.value) ?? 0;
}

export async function getMarketingAnalyticsMetrics({
  range,
  siteLeadCount,
}: {
  range: DashboardRange;
  siteLeadCount: number;
}): Promise<DashboardTrafficMetrics> {
  if (!getAnalyticsConfig()) {
    return emptyTrafficMetrics(
      "not_configured",
      "Додайте Google Analytics OAuth env, щоб підключити живу аналітику.",
    );
  }

  const refreshesToday = await getRefreshesToday();

  try {
    const row = await selectCacheRow(getCacheKey(range));
    const data = asRecord(row?.data) as CachedTrafficData | null;
    const sessions = asNumber(data?.sessions);
    const refreshedAt = asString(data?.refreshedAt) ?? asString(row?.updated_at);

    if (sessions === null) {
      return {
        ...emptyTrafficMetrics("cache_missing", "Натисніть оновлення, щоб отримати перші дані з GA4."),
        refreshesToday,
      };
    }

    return {
      connected: true,
      status: "ready",
      message: "Дані з GA4 прочитані з кешу.",
      sessions,
      leadConversionPercent: calculateLeadConversion(sessions, siteLeadCount),
      costPerLead: null,
      refreshedAt,
      refreshesToday,
      dailyLimit: getDailyLimit(),
    };
  } catch {
    return {
      ...emptyTrafficMetrics("error", "Сховище кешу аналітики ще не готове або недоступне."),
      refreshesToday,
    };
  }
}

export async function refreshMarketingAnalytics(range: DashboardRange) {
  if (!getAnalyticsConfig()) {
    return "not_configured" as const;
  }

  const dailyLimit = getDailyLimit();
  const refreshesToday = await getRefreshesToday();

  if (refreshesToday >= dailyLimit) {
    return "limit_reached" as const;
  }

  try {
    const sessions = await fetchGa4Sessions(range);
    const refreshedAt = new Date().toISOString();

    await upsertCacheRow(getCacheKey(range), {
      sessions,
      refreshedAt,
      source: "ga4",
    });
    await incrementRefreshesToday(refreshesToday);

    return "ready" as const;
  } catch {
    return "error" as const;
  }
}
