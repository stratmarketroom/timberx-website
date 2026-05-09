import "server-only";

import { getMarketingAnalyticsMetrics, type DashboardTrafficMetrics } from "@/lib/admin/marketing-analytics";

type SupabaseRow = Record<string, unknown>;

export type DashboardRange = "7" | "30" | "90" | "all";

export type DashboardStatusMetric = {
  status: string;
  label: string;
  count: number;
  percent: number;
};

export type DashboardGroupMetric = {
  key: string;
  label: string;
  count: number;
  percent: number;
};

export type DashboardSourceQualityMetric = DashboardGroupMetric & {
  qualityLeads: number;
  proposals: number;
  won: number;
  qualityPercent: number;
};

export type DashboardMoneyTotals = Record<"UAH" | "EUR" | "USD", number>;

export type DashboardStaleLead = {
  publicId: string;
  clientName: string;
  status: string;
  lastActivityAt: string;
};

export type AdminDashboardMetrics = {
  range: DashboardRange;
  rangeLabel: string;
  totalLeads: number;
  statusMetrics: DashboardStatusMetric[];
  conversionMetrics: DashboardStatusMetric[];
  averageFirstActionHours: number | null;
  staleLeads: DashboardStaleLead[];
  manualVsSite: DashboardGroupMetric[];
  directions: DashboardGroupMetric[];
  channels: DashboardGroupMetric[];
  sourceQuality: DashboardSourceQualityMetric[];
  finance: {
    proposalTotals: DashboardMoneyTotals;
    wonTotals: DashboardMoneyTotals;
  };
  traffic: DashboardTrafficMetrics;
};

type DashboardLead = {
  id: string;
  publicId: string;
  clientName: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  initialChannel: string;
  sourcePage: string | null;
  sourceCta: string | null;
  productInterest: string | null;
  proposalAmount: number | null;
  proposalCurrency: string | null;
  wonAmount: number | null;
  wonCurrency: string | null;
};

type DashboardEvent = {
  leadId: string;
  eventType: string;
  channel: string | null;
  createdAt: string;
};

const statusLabels: Record<string, string> = {
  new: "Нові",
  in_progress: "В роботі",
  qualified: "Кваліфіковані",
  proposal_sent: "КП",
  won: "Виграні",
  lost: "Втрачені",
  no_response: "Без відповіді",
  spam: "Спам",
};

const rangeLabels: Record<DashboardRange, string> = {
  "7": "7 днів",
  "30": "30 днів",
  "90": "90 днів",
  all: "Весь час",
};

const managerActionEvents = new Set([
  "manual_lead_created",
  "manager_note",
  "lead_updated",
  "lead_status_updated",
  "client_updated",
  "contact_added",
  "file_uploaded",
  "file_deleted",
]);

const qualityStatuses = new Set(["proposal_sent", "won"]);
const terminalStatuses = new Set(["won", "lost", "spam"]);
const productDirections = [
  "Модульні будинки",
  "Клеєні конструкції",
  "Ферми з металозубчатими пластинами",
  "Каркасно-модульні будинки",
  "Санітарно-технічні модулі",
  "Фахверкові будинки",
];

const directionLabels: Record<string, string> = {
  "Ферми з металозубчатими пластинами": "Ферми з МЗП",
};

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

async function selectRows(table: string, params: URLSearchParams) {
  const { url, serviceRoleKey } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/${table}?${params.toString()}`, {
    method: "GET",
    headers: {
      apikey: serviceRoleKey,
      authorization: `Bearer ${serviceRoleKey}`,
    },
    cache: "no-store",
  });
  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Supabase dashboard select failed: ${response.status} ${responseText}`);
  }

  return JSON.parse(responseText) as SupabaseRow[];
}

function asString(value: unknown) {
  return typeof value === "string" ? value : null;
}

function asMoneyAmount(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function asRecord(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as SupabaseRow)
    : null;
}

function inFilter(values: string[]) {
  return `in.(${values.join(",")})`;
}

function normalizeRange(value: string | string[] | undefined): DashboardRange {
  const range = Array.isArray(value) ? value[0] : value;

  if (range === "7" || range === "30" || range === "90" || range === "all") {
    return range;
  }

  return "30";
}

function getRangeStart(range: DashboardRange) {
  if (range === "all") {
    return null;
  }

  const start = new Date();
  start.setDate(start.getDate() - Number(range));
  start.setHours(0, 0, 0, 0);

  return start;
}

function percent(count: number, total: number) {
  if (!total) {
    return 0;
  }

  return Math.round((count / total) * 100);
}

function hoursBetween(start: string, end: string) {
  const diff = new Date(end).getTime() - new Date(start).getTime();

  if (!Number.isFinite(diff) || diff < 0) {
    return null;
  }

  return diff / 1000 / 60 / 60;
}

function groupMetrics<T>(
  items: T[],
  getKey: (item: T) => string,
  getLabel: (key: string) => string,
  total = items.length,
) {
  const counts = new Map<string, number>();

  for (const item of items) {
    const key = getKey(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([key, count]) => ({
      key,
      label: getLabel(key),
      count,
      percent: percent(count, total),
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "uk"));
}

function sourceGroup(lead: DashboardLead) {
  const raw = `${lead.initialChannel} ${lead.sourcePage ?? ""} ${lead.sourceCta ?? ""}`.toLowerCase();

  if (lead.initialChannel === "admin") {
    return "manual";
  }

  if (raw.includes("telegram")) {
    return "telegram";
  }

  if (
    raw.includes("instagram") ||
    raw.includes("facebook") ||
    raw.includes("fb") ||
    raw.includes("meta") ||
    raw.includes("social")
  ) {
    return "social";
  }

  if (lead.initialChannel === "site") {
    return "site";
  }

  return "other";
}

function sourceLabel(key: string) {
  const labels: Record<string, string> = {
    site: "Сайт",
    telegram: "Telegram",
    manual: "Вручну",
    social: "Соцмережі",
    other: "Інше",
  };

  return labels[key] ?? key;
}

function normalizeDirection(value: string | null) {
  const cleanValue = value?.trim();

  if (!cleanValue) {
    return "other";
  }

  const lowerValue = cleanValue.toLowerCase();

  if (lowerValue.includes("модульні будинки")) {
    return "Модульні будинки";
  }

  if (lowerValue.includes("клеєні")) {
    return "Клеєні конструкції";
  }

  if (lowerValue.includes("ферми") || lowerValue.includes("мзп")) {
    return "Ферми з металозубчатими пластинами";
  }

  if (lowerValue.includes("каркасно")) {
    return "Каркасно-модульні будинки";
  }

  if (lowerValue.includes("санітар")) {
    return "Санітарно-технічні модулі";
  }

  if (lowerValue.includes("фахвер")) {
    return "Фахверкові будинки";
  }

  return "other";
}

function getDirectionMetrics(leads: DashboardLead[]) {
  const total = leads.length;
  const counts = new Map(productDirections.map((direction) => [direction, 0]));
  let otherCount = 0;

  for (const lead of leads) {
    const direction = normalizeDirection(lead.productInterest);

    if (counts.has(direction)) {
      counts.set(direction, (counts.get(direction) ?? 0) + 1);
    } else {
      otherCount += 1;
    }
  }

  const metrics = productDirections.map((direction) => {
    const count = counts.get(direction) ?? 0;

    return {
      key: direction,
      label: directionLabels[direction] ?? direction,
      count,
      percent: percent(count, total),
    };
  });

  if (otherCount) {
    metrics.push({
      key: "other",
      label: "Інше / не вказано",
      count: otherCount,
      percent: percent(otherCount, total),
    });
  }

  return metrics;
}

function createEmptyMoneyTotals(): DashboardMoneyTotals {
  return {
    UAH: 0,
    EUR: 0,
    USD: 0,
  };
}

function addMoney(totals: DashboardMoneyTotals, amount: number | null, currency: string | null) {
  if (amount === null) {
    return;
  }

  if (currency === "EUR" || currency === "USD" || currency === "UAH") {
    totals[currency] += amount;
  }
}

function getFinanceTotals(leads: DashboardLead[]) {
  const proposalTotals = createEmptyMoneyTotals();
  const wonTotals = createEmptyMoneyTotals();

  for (const lead of leads) {
    addMoney(proposalTotals, lead.proposalAmount, lead.proposalCurrency);
    addMoney(wonTotals, lead.wonAmount, lead.wonCurrency);
  }

  return {
    proposalTotals,
    wonTotals,
  };
}

function activityTimestamp(lead: DashboardLead, events: DashboardEvent[]) {
  const eventDates = events
    .filter((event) => event.leadId === lead.id)
    .map((event) => new Date(event.createdAt).getTime())
    .filter(Number.isFinite);
  const updatedAt = new Date(lead.updatedAt).getTime();
  const latestEventAt = eventDates.length ? Math.max(...eventDates) : 0;
  const latest = Math.max(updatedAt, latestEventAt);

  return Number.isFinite(latest) && latest > 0 ? new Date(latest).toISOString() : lead.updatedAt;
}

function mapLead(row: SupabaseRow): DashboardLead | null {
  const id = asString(row.id);
  const publicId = asString(row.public_id);
  const createdAt = asString(row.created_at);
  const updatedAt = asString(row.updated_at);

  if (!id || !publicId || !createdAt || !updatedAt) {
    return null;
  }

  const client = asRecord(row.clients);

  return {
    id,
    publicId,
    clientName: asString(client?.name) ?? "Клієнт без імені",
    createdAt,
    updatedAt,
    status: asString(row.status) ?? "new",
    initialChannel: asString(row.initial_channel) ?? "site",
    sourcePage: asString(row.source_page),
    sourceCta: asString(row.source_cta),
    productInterest: asString(row.product_interest),
    proposalAmount: asMoneyAmount(row.proposal_amount),
    proposalCurrency: asString(row.proposal_currency),
    wonAmount: asMoneyAmount(row.won_amount),
    wonCurrency: asString(row.won_currency),
  };
}

function mapEvent(row: SupabaseRow): DashboardEvent | null {
  const leadId = asString(row.lead_id);
  const eventType = asString(row.event_type);
  const createdAt = asString(row.created_at);

  if (!leadId || !eventType || !createdAt) {
    return null;
  }

  return {
    leadId,
    eventType,
    channel: asString(row.channel),
    createdAt,
  };
}

export async function getAdminDashboardMetrics(input?: {
  range?: string | string[] | undefined;
}): Promise<AdminDashboardMetrics> {
  const range = normalizeRange(input?.range);
  const rangeStart = getRangeStart(range);
  const leadParams = new URLSearchParams({
    select:
      "id,public_id,source_page,source_cta,initial_channel,product_interest,status,proposal_amount,proposal_currency,won_amount,won_currency,created_at,updated_at,clients(name)",
    order: "created_at.desc",
    limit: "1000",
  });
  const leadRows = await selectRows("leads", leadParams);
  const allLeads = leadRows.map(mapLead).filter((lead): lead is DashboardLead => Boolean(lead));
  const leads = rangeStart
    ? allLeads.filter((lead) => new Date(lead.createdAt).getTime() >= rangeStart.getTime())
    : allLeads;
  const leadIds = leads.map((lead) => lead.id);
  let events: DashboardEvent[] = [];

  if (leadIds.length) {
    const eventParams = new URLSearchParams({
      select: "lead_id,event_type,channel,created_at",
      order: "created_at.asc",
      limit: "3000",
    });
    eventParams.set("lead_id", inFilter(leadIds));
    const eventRows = await selectRows("lead_events", eventParams);
    events = eventRows.map(mapEvent).filter((event): event is DashboardEvent => Boolean(event));
  }

  const totalLeads = leads.length;
  const statusMetrics = ["new", "in_progress", "qualified", "proposal_sent", "won", "lost"].map((status) => {
    const count = leads.filter((lead) => lead.status === status).length;

    return {
      status,
      label: statusLabels[status] ?? status,
      count,
      percent: percent(count, totalLeads),
    };
  });
  const conversionMetrics = statusMetrics.filter((metric) =>
    ["in_progress", "qualified", "proposal_sent", "won", "lost"].includes(metric.status),
  );
  const actionDurations = leads
    .map((lead) => {
      const firstAction = events.find(
        (event) => event.leadId === lead.id && managerActionEvents.has(event.eventType),
      );

      return firstAction ? hoursBetween(lead.createdAt, firstAction.createdAt) : null;
    })
    .filter((value): value is number => typeof value === "number");
  const averageFirstActionHours = actionDurations.length
    ? actionDurations.reduce((sum, value) => sum + value, 0) / actionDurations.length
    : null;
  const staleBorder = new Date();
  staleBorder.setDate(staleBorder.getDate() - 7);
  const staleLeads = leads
    .filter((lead) => !terminalStatuses.has(lead.status))
    .map((lead) => ({
      publicId: lead.publicId,
      clientName: lead.clientName,
      status: lead.status,
      lastActivityAt: activityTimestamp(lead, events),
    }))
    .filter((lead) => new Date(lead.lastActivityAt).getTime() < staleBorder.getTime())
    .sort((a, b) => new Date(a.lastActivityAt).getTime() - new Date(b.lastActivityAt).getTime())
    .slice(0, 8);
  const manualVsSite = groupMetrics(
    leads,
    (lead) => (lead.initialChannel === "admin" ? "manual" : "site"),
    (key) => (key === "manual" ? "Вручну" : "Сайт та месенджери"),
    totalLeads,
  );
  const directions = getDirectionMetrics(leads);
  const channels = groupMetrics(leads, sourceGroup, sourceLabel, totalLeads);
  const finance = getFinanceTotals(leads);
  const siteLeadCount = leads.filter((lead) => lead.initialChannel !== "admin").length;
  const traffic = await getMarketingAnalyticsMetrics({ range, siteLeadCount });
  const sourceQuality = channels.map((channel) => {
    const channelLeads = leads.filter((lead) => sourceGroup(lead) === channel.key);
    const qualityLeads = channelLeads.filter((lead) => qualityStatuses.has(lead.status)).length;
    const proposals = channelLeads.filter((lead) => lead.status === "proposal_sent").length;
    const won = channelLeads.filter((lead) => lead.status === "won").length;

    return {
      ...channel,
      qualityLeads,
      proposals,
      won,
      qualityPercent: percent(qualityLeads, channel.count),
    };
  });

  return {
    range,
    rangeLabel: rangeLabels[range],
    totalLeads,
    statusMetrics,
    conversionMetrics,
    averageFirstActionHours,
    staleLeads,
    manualVsSite,
    directions,
    channels,
    sourceQuality,
    finance,
    traffic,
  };
}
