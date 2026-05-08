import "server-only";

type SupabaseRow = Record<string, unknown>;

export type AdminContact = {
  id: string;
  type: string;
  value: string;
  label: string | null;
  isPrimary: boolean;
};

export type AdminLead = {
  id: string;
  publicId: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  priority: string;
  sourcePage: string | null;
  sourceCta: string | null;
  initialChannel: string;
  productInterest: string | null;
  projectType: string | null;
  scale: string | null;
  location: string | null;
  timeline: string | null;
  proposalAmount: number | null;
  proposalCurrency: string | null;
  wonAmount: number | null;
  wonCurrency: string | null;
  client: {
    id: string;
    publicId: string | null;
    name: string | null;
    company: string | null;
    clientType: string | null;
  };
  contacts: AdminContact[];
  latestEvent: {
    type: string;
    createdAt: string;
    text: string | null;
  } | null;
  quiz: {
    projectTitle: string | null;
    projectSlug: string | null;
    projectCategory: string | null;
    audienceType: string | null;
  } | null;
};

export type AdminLeadEvent = {
  id: string;
  type: string;
  channel: string | null;
  sourcePage: string | null;
  sourceCta: string | null;
  createdAt: string;
  metadata: SupabaseRow;
};

export type AdminLeadFile = {
  id: string;
  fileName: string;
  fileType: string | null;
  fileSize: number | null;
  storageBucket: string;
  storagePath: string;
  signedUrl: string | null;
  fileCategory: string;
  source: string;
  uploadedBy: string;
  createdAt: string;
};

export type AdminLeadDetails = AdminLead & {
  events: AdminLeadEvent[];
  files: AdminLeadFile[];
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

function getLeadFilesBucket() {
  return process.env.SUPABASE_LEAD_FILES_BUCKET ?? "lead-files";
}

function encodeStoragePath(path: string) {
  return path.split("/").map(encodeURIComponent).join("/");
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
    throw new Error(`Supabase admin select failed: ${response.status} ${responseText}`);
  }

  return JSON.parse(responseText) as SupabaseRow[];
}

async function insertRows(table: string, payload: SupabaseRow) {
  const { url, serviceRoleKey } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      authorization: `Bearer ${serviceRoleKey}`,
      "content-type": "application/json",
      prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });
  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Supabase admin insert failed: ${response.status} ${responseText}`);
  }

  return responseText ? (JSON.parse(responseText) as SupabaseRow[]) : [];
}

async function updateRows(table: string, filters: Record<string, string>, payload: SupabaseRow) {
  const { url, serviceRoleKey } = getSupabaseConfig();
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    params.set(key, `eq.${value}`);
  }

  const response = await fetch(`${url}/rest/v1/${table}?${params.toString()}`, {
    method: "PATCH",
    headers: {
      apikey: serviceRoleKey,
      authorization: `Bearer ${serviceRoleKey}`,
      "content-type": "application/json",
      prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });
  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Supabase admin update failed: ${response.status} ${responseText}`);
  }

  return responseText ? (JSON.parse(responseText) as SupabaseRow[]) : [];
}

async function deleteRows(table: string, filters: Record<string, string>) {
  const { url, serviceRoleKey } = getSupabaseConfig();
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    params.set(key, `eq.${value}`);
  }

  const response = await fetch(`${url}/rest/v1/${table}?${params.toString()}`, {
    method: "DELETE",
    headers: {
      apikey: serviceRoleKey,
      authorization: `Bearer ${serviceRoleKey}`,
      prefer: "return=representation",
    },
  });
  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Supabase admin delete failed: ${response.status} ${responseText}`);
  }

  return responseText ? (JSON.parse(responseText) as SupabaseRow[]) : [];
}

async function storageRequest(path: string, init: RequestInit = {}) {
  const { url, serviceRoleKey } = getSupabaseConfig();

  return fetch(`${url}/storage/v1${path}`, {
    ...init,
    headers: {
      apikey: serviceRoleKey,
      authorization: `Bearer ${serviceRoleKey}`,
      ...(init.headers ?? {}),
    },
  });
}

function asString(value: unknown) {
  return typeof value === "string" ? value : null;
}

function asBoolean(value: unknown) {
  return typeof value === "boolean" ? value : false;
}

function asNumber(value: unknown) {
  return typeof value === "number" ? value : null;
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

function cleanString(value: unknown, maxLength = 500) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  return trimmed.slice(0, maxLength);
}

function cleanActorName(value: unknown) {
  return cleanString(value, 80) ?? "Менеджер";
}

function cleanMoneyAmount(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") {
    return null;
  }

  const normalized = String(value).trim().replace(",", ".");

  if (!normalized) {
    return null;
  }

  const amount = Number(normalized);

  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("Invalid amount");
  }

  return Math.round(amount * 100) / 100;
}

const allowedCurrencies = new Set(["UAH", "EUR", "USD"]);

function cleanCurrency(value: unknown) {
  const currency = cleanString(value, 3)?.toUpperCase() ?? null;

  if (!currency) {
    return null;
  }

  if (!allowedCurrencies.has(currency)) {
    throw new Error("Invalid currency");
  }

  return currency;
}

function normalizeContactValue(contactType: string, value: string) {
  if (contactType === "email") {
    return value.toLowerCase();
  }

  if (contactType === "phone" || contactType === "viber" || contactType === "whatsapp") {
    const normalized = value.replace(/[^\d+]/g, "");
    return normalized.startsWith("+") ? normalized : `+${normalized}`;
  }

  return value;
}

function sanitizeFileName(value: string) {
  const fallback = "file";
  const cleaned = value
    .normalize("NFKD")
    .replace(/[^\w.\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 140);

  return cleaned || fallback;
}

function createPublicId(prefix: "TX" | "TXC") {
  const timestamp = new Date().toISOString().replace(/\D/g, "").slice(2, 17);
  const suffix = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `${prefix}-${timestamp}${suffix}`;
}

async function createLeadPublicId() {
  const params = new URLSearchParams({
    select: "public_id",
    limit: "1000",
  });
  const rows = await selectRows("leads", params);
  const maxNumber = rows.reduce((max, row) => {
    const publicId = asString(row.public_id) ?? "";
    const match = publicId.match(/^TX-(\d+)$/);

    return match ? Math.max(max, Number(match[1])) : max;
  }, 1000);

  return `TX-${maxNumber + 1}`;
}

function createLeadParams(searchParams: AdminLeadSearchParams) {
  const params = new URLSearchParams({
    select:
      "id,public_id,client_id,source_page,source_cta,initial_channel,product_interest,project_type,scale,location,timeline,status,priority,proposal_amount,proposal_currency,won_amount,won_currency,created_at,updated_at,clients(id,public_id,name,company,client_type)",
    order: "created_at.desc",
    limit: "50",
  });

  if (searchParams.status) {
    params.set("status", `eq.${searchParams.status}`);
  }

  if (searchParams.priority) {
    params.set("priority", `eq.${searchParams.priority}`);
  }

  if (searchParams.channel) {
    params.set("initial_channel", `eq.${searchParams.channel}`);
  }

  return params;
}

function normalizeContact(row: SupabaseRow): AdminContact | null {
  const id = asString(row.id);
  const type = asString(row.contact_type);
  const value = asString(row.contact_value);

  if (!id || !type || !value) {
    return null;
  }

  return {
    id,
    type,
    value,
    label: asString(row.label),
    isPrimary: asBoolean(row.is_primary),
  };
}

function normalizeEvent(row: SupabaseRow) {
  const leadId = asString(row.lead_id);
  const eventType = asString(row.event_type);
  const createdAt = asString(row.created_at);

  if (!leadId || !eventType || !createdAt) {
    return null;
  }

  const metadata = asRecord(row.metadata) ?? {};

  return {
    leadId,
    type: eventType,
    createdAt,
    metadata,
  };
}

function normalizeFullEvent(row: SupabaseRow): AdminLeadEvent | null {
  const id = asString(row.id);
  const type = asString(row.event_type);
  const createdAt = asString(row.created_at);

  if (!id || !type || !createdAt) {
    return null;
  }

  return {
    id,
    type,
    channel: asString(row.channel),
    sourcePage: asString(row.source_page),
    sourceCta: asString(row.source_cta),
    createdAt,
    metadata: asRecord(row.metadata) ?? {},
  };
}

function normalizeFile(row: SupabaseRow): AdminLeadFile | null {
  const id = asString(row.id);
  const fileName = asString(row.file_name);
  const storageBucket = asString(row.storage_bucket);
  const storagePath = asString(row.storage_path);
  const fileCategory = asString(row.file_category);
  const source = asString(row.source);
  const uploadedBy = asString(row.uploaded_by);
  const createdAt = asString(row.created_at);

  if (
    !id ||
    !fileName ||
    !storageBucket ||
    !storagePath ||
    !fileCategory ||
    !source ||
    !uploadedBy ||
    !createdAt
  ) {
    return null;
  }

  return {
    id,
    fileName,
    fileType: asString(row.file_type),
    fileSize: asNumber(row.file_size),
    storageBucket,
    storagePath,
    signedUrl: null,
    fileCategory,
    source,
    uploadedBy,
    createdAt,
  };
}

async function ensureLeadFilesBucket() {
  const bucket = getLeadFilesBucket();
  const existingBucketResponse = await storageRequest(`/bucket/${encodeURIComponent(bucket)}`, {
    method: "GET",
    cache: "no-store",
  });

  if (existingBucketResponse.ok) {
    return bucket;
  }

  const responseText = await existingBucketResponse.text();
  const bucketWasNotFound =
    existingBucketResponse.status === 404 ||
    (existingBucketResponse.status === 400 && responseText.toLowerCase().includes("bucket not found"));

  if (!bucketWasNotFound) {
    throw new Error(`Supabase storage bucket check failed: ${existingBucketResponse.status} ${responseText}`);
  }

  const createBucketResponse = await storageRequest("/bucket", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: bucket,
      name: bucket,
      public: false,
    }),
  });

  if (!createBucketResponse.ok && createBucketResponse.status !== 409) {
    const responseText = await createBucketResponse.text();
    throw new Error(`Supabase storage bucket create failed: ${createBucketResponse.status} ${responseText}`);
  }

  return bucket;
}

async function createSignedStorageUrl(bucket: string, path: string) {
  const response = await storageRequest(
    `/object/sign/${encodeURIComponent(bucket)}/${encodeStoragePath(path)}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ expiresIn: 60 * 60 }),
      cache: "no-store",
    },
  );
  const responseText = await response.text();

  if (!response.ok) {
    return null;
  }

  const payload = JSON.parse(responseText) as { signedURL?: string; signedUrl?: string };
  const signedPath = payload.signedURL ?? payload.signedUrl;

  if (!signedPath) {
    return null;
  }

  if (signedPath.startsWith("http")) {
    return signedPath;
  }

  const { url } = getSupabaseConfig();
  return `${url}/storage/v1${signedPath}`;
}

export type AdminLeadSearchParams = {
  status?: string;
  priority?: string;
  channel?: string;
  q?: string;
};

export async function getAdminLeads(searchParams: AdminLeadSearchParams = {}) {
  const leadRows = await selectRows("leads", createLeadParams(searchParams));
  const clientIds = Array.from(
    new Set(leadRows.map((row) => asString(row.client_id)).filter(Boolean)),
  ) as string[];
  const leadIds = Array.from(
    new Set(leadRows.map((row) => asString(row.id)).filter(Boolean)),
  ) as string[];

  const contactRows = clientIds.length
    ? await selectRows(
        "client_contacts",
        new URLSearchParams({
          select: "id,client_id,contact_type,contact_value,label,is_primary,created_at",
          client_id: inFilter(clientIds),
          order: "is_primary.desc,created_at.desc",
        }),
      )
    : [];

  const eventRows = leadIds.length
    ? await selectRows(
        "lead_events",
        new URLSearchParams({
          select: "id,lead_id,event_type,metadata,created_at",
          lead_id: inFilter(leadIds),
          order: "created_at.desc",
          limit: "300",
        }),
      )
    : [];

  const contactsByClient = new Map<string, AdminContact[]>();

  for (const row of contactRows) {
    const clientId = asString(row.client_id);
    const contact = normalizeContact(row);

    if (!clientId || !contact) {
      continue;
    }

    contactsByClient.set(clientId, [...(contactsByClient.get(clientId) ?? []), contact]);
  }

  const eventsByLead = new Map<string, NonNullable<ReturnType<typeof normalizeEvent>>[]>();

  for (const row of eventRows) {
    const event = normalizeEvent(row);

    if (!event) {
      continue;
    }

    eventsByLead.set(event.leadId, [...(eventsByLead.get(event.leadId) ?? []), event]);
  }

  const leads = leadRows
    .map((row): AdminLead | null => {
      const id = asString(row.id);
      const publicId = asString(row.public_id);
      const clientId = asString(row.client_id);
      const createdAt = asString(row.created_at);
      const updatedAt = asString(row.updated_at);
      const status = asString(row.status);
      const priority = asString(row.priority);

      if (!id || !publicId || !clientId || !createdAt || !updatedAt || !status || !priority) {
        return null;
      }

      const client = asRecord(row.clients);
      const leadEvents = eventsByLead.get(id) ?? [];
      const latestEvent = leadEvents[0] ?? null;
      const quizEvent = leadEvents.find((event) => event.type === "quiz_submitted") ?? null;

      return {
        id,
        publicId,
        createdAt,
        updatedAt,
        status,
        priority,
        sourcePage: asString(row.source_page),
        sourceCta: asString(row.source_cta),
        initialChannel: asString(row.initial_channel) ?? "site",
        productInterest: asString(row.product_interest),
        projectType: asString(row.project_type),
        scale: asString(row.scale),
        location: asString(row.location),
        timeline: asString(row.timeline),
        proposalAmount: asMoneyAmount(row.proposal_amount),
        proposalCurrency: asString(row.proposal_currency),
        wonAmount: asMoneyAmount(row.won_amount),
        wonCurrency: asString(row.won_currency),
        client: {
          id: clientId,
          publicId: asString(client?.public_id),
          name: asString(client?.name),
          company: asString(client?.company),
          clientType: asString(client?.client_type),
        },
        contacts: contactsByClient.get(clientId) ?? [],
        latestEvent: latestEvent
          ? {
              type: latestEvent.type,
              createdAt: latestEvent.createdAt,
              text: asString(latestEvent.metadata.text),
            }
          : null,
        quiz: quizEvent
          ? {
              projectTitle: asString(quizEvent.metadata.project_title),
              projectSlug: asString(quizEvent.metadata.project_slug),
              projectCategory: asString(quizEvent.metadata.project_category),
              audienceType: asString(quizEvent.metadata.audience_type),
            }
          : null,
      };
    })
    .filter(Boolean) as AdminLead[];

  const query = searchParams.q?.trim().toLowerCase();

  if (!query) {
    return leads;
  }

  return leads.filter((lead) => {
    const haystack = [
      lead.publicId,
      lead.client.name,
      lead.client.company,
      lead.productInterest,
      lead.projectType,
      lead.location,
      ...lead.contacts.map((contact) => contact.value),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export async function getAdminLeadDetails(publicId: string) {
  const leadRows = await selectRows(
    "leads",
    new URLSearchParams({
      select:
        "id,public_id,client_id,source_page,source_cta,initial_channel,product_interest,project_type,scale,location,timeline,status,priority,proposal_amount,proposal_currency,won_amount,won_currency,created_at,updated_at,clients(id,public_id,name,company,client_type)",
      public_id: `eq.${publicId}`,
      limit: "1",
    }),
  );
  const leadRow = leadRows[0];
  const id = asString(leadRow?.id);
  const clientId = asString(leadRow?.client_id);
  const createdAt = asString(leadRow?.created_at);
  const updatedAt = asString(leadRow?.updated_at);
  const status = asString(leadRow?.status);
  const priority = asString(leadRow?.priority);

  if (!leadRow || !id || !clientId || !createdAt || !updatedAt || !status || !priority) {
    return null;
  }

  const [contactRows, eventRows, fileRows] = await Promise.all([
    selectRows(
      "client_contacts",
      new URLSearchParams({
        select: "id,client_id,contact_type,contact_value,label,is_primary,created_at",
        client_id: `eq.${clientId}`,
        order: "is_primary.desc,created_at.desc",
      }),
    ),
    selectRows(
      "lead_events",
      new URLSearchParams({
        select:
          "id,lead_id,event_type,channel,source_page,source_cta,metadata,created_at",
        lead_id: `eq.${id}`,
        order: "created_at.desc",
        limit: "200",
      }),
    ),
    selectRows(
      "lead_files",
      new URLSearchParams({
        select:
          "id,file_name,file_type,file_size,storage_bucket,storage_path,file_category,source,uploaded_by,created_at",
        lead_id: `eq.${id}`,
        order: "created_at.desc",
      }),
    ),
  ]);

  const client = asRecord(leadRow.clients);
  const contacts = contactRows.map(normalizeContact).filter(Boolean) as AdminContact[];
  const events = eventRows.map(normalizeFullEvent).filter(Boolean) as AdminLeadEvent[];
  const files = fileRows.map(normalizeFile).filter(Boolean) as AdminLeadFile[];
  const filesWithUrls = await Promise.all(
    files.map(async (file) => ({
      ...file,
      signedUrl: await createSignedStorageUrl(file.storageBucket, file.storagePath),
    })),
  );
  const latestEvent = events[0] ?? null;
  const quizEvent = events.find((event) => event.type === "quiz_submitted") ?? null;

  return {
    id,
    publicId,
    createdAt,
    updatedAt,
    status,
    priority,
    sourcePage: asString(leadRow.source_page),
    sourceCta: asString(leadRow.source_cta),
    initialChannel: asString(leadRow.initial_channel) ?? "site",
    productInterest: asString(leadRow.product_interest),
    projectType: asString(leadRow.project_type),
    scale: asString(leadRow.scale),
    location: asString(leadRow.location),
    timeline: asString(leadRow.timeline),
    proposalAmount: asMoneyAmount(leadRow.proposal_amount),
    proposalCurrency: asString(leadRow.proposal_currency),
    wonAmount: asMoneyAmount(leadRow.won_amount),
    wonCurrency: asString(leadRow.won_currency),
    client: {
      id: clientId,
      publicId: asString(client?.public_id),
      name: asString(client?.name),
      company: asString(client?.company),
      clientType: asString(client?.client_type),
    },
    contacts,
    latestEvent: latestEvent
      ? {
          type: latestEvent.type,
          createdAt: latestEvent.createdAt,
          text: asString(latestEvent.metadata.text),
        }
      : null,
    quiz: quizEvent
      ? {
          projectTitle: asString(quizEvent.metadata.project_title),
          projectSlug: asString(quizEvent.metadata.project_slug),
          projectCategory: asString(quizEvent.metadata.project_category),
          audienceType: asString(quizEvent.metadata.audience_type),
        }
      : null,
    events,
    files: filesWithUrls,
  } satisfies AdminLeadDetails;
}

const allowedLeadStatuses = new Set([
  "new",
  "in_progress",
  "qualified",
  "proposal_sent",
  "won",
  "lost",
  "no_response",
  "spam",
]);

const allowedPriorities = new Set(["hot", "warm", "cold"]);

const allowedClientTypes = new Set([
  "developer",
  "builder",
  "general_contractor",
  "community",
  "architect",
  "private_client",
  "business",
  "other",
  "unknown",
]);

const allowedContactTypes = new Set(["phone", "email", "telegram", "viber", "whatsapp"]);

async function insertAdminEvent({
  lead,
  eventType,
  metadata,
}: {
  lead: AdminLeadDetails;
  eventType: string;
  metadata: SupabaseRow;
}) {
  await insertRows("lead_events", {
    client_id: lead.client.id,
    lead_id: lead.id,
    event_type: eventType,
    channel: "admin",
    source_cta: "admin_panel",
    metadata,
  });
}

function changedFields(before: SupabaseRow, after: SupabaseRow) {
  return Object.keys(after).filter((key) => before[key] !== after[key]);
}

export async function updateAdminLeadWorkingFields({
  publicId,
  productInterest,
  projectType,
  scale,
  location,
  timeline,
  status,
  priority,
  proposalAmount,
  proposalCurrency,
  wonAmount,
  wonCurrency,
  note,
  actorName,
}: {
  publicId: string;
  productInterest: unknown;
  projectType: unknown;
  scale: unknown;
  location: unknown;
  timeline: unknown;
  status: unknown;
  priority: unknown;
  proposalAmount?: unknown;
  proposalCurrency?: unknown;
  wonAmount?: unknown;
  wonCurrency?: unknown;
  note?: unknown;
  actorName?: unknown;
}) {
  const lead = await getAdminLeadDetails(publicId);

  if (!lead) {
    throw new Error("Lead not found");
  }

  const nextStatus = cleanString(status, 80);
  const nextPriority = cleanString(priority, 40);
  const nextProposalAmount = cleanMoneyAmount(proposalAmount);
  const nextProposalCurrency = nextProposalAmount === null ? null : cleanCurrency(proposalCurrency) ?? "UAH";
  const nextWonAmount = cleanMoneyAmount(wonAmount);
  const nextWonCurrency = nextWonAmount === null ? null : cleanCurrency(wonCurrency) ?? "UAH";

  if (!nextStatus || !allowedLeadStatuses.has(nextStatus)) {
    throw new Error("Invalid lead status");
  }

  if (!nextPriority || !allowedPriorities.has(nextPriority)) {
    throw new Error("Invalid lead priority");
  }

  const before = {
    product_interest: lead.productInterest,
    project_type: lead.projectType,
    scale: lead.scale,
    location: lead.location,
    timeline: lead.timeline,
    status: lead.status,
    priority: lead.priority,
    proposal_amount: lead.proposalAmount,
    proposal_currency: lead.proposalCurrency,
    won_amount: lead.wonAmount,
    won_currency: lead.wonCurrency,
  };
  const after = {
    product_interest: cleanString(productInterest, 220),
    project_type: cleanString(projectType, 220),
    scale: cleanString(scale, 220),
    location: cleanString(location, 220),
    timeline: cleanString(timeline, 220),
    status: nextStatus,
    priority: nextPriority,
    proposal_amount: nextProposalAmount,
    proposal_currency: nextProposalCurrency,
    won_amount: nextWonAmount,
    won_currency: nextWonCurrency,
  };
  const fields = changedFields(before, after);
  const managerNote = cleanString(note, 1200);

  if (!fields.length && !managerNote) {
    return { updated: false };
  }

  if (fields.length) {
    await updateRows("leads", { id: lead.id }, after);
  }

  await insertAdminEvent({
    lead,
    eventType: "lead_updated",
    metadata: {
      changed_fields: fields,
      before,
      after,
      note: managerNote,
      actor: cleanActorName(actorName),
    },
  });

  return { updated: true };
}

export async function updateAdminLeadStatus({
  publicId,
  status,
  actorName,
}: {
  publicId: string;
  status: unknown;
  actorName?: unknown;
}) {
  const lead = await getAdminLeadDetails(publicId);

  if (!lead) {
    throw new Error("Lead not found");
  }

  const nextStatus = cleanString(status, 80);

  if (!nextStatus || !allowedLeadStatuses.has(nextStatus)) {
    throw new Error("Invalid lead status");
  }

  if (nextStatus === lead.status) {
    return { updated: false };
  }

  await updateRows("leads", { id: lead.id }, {
    status: nextStatus,
  });

  await insertAdminEvent({
    lead,
    eventType: "lead_updated",
    metadata: {
      changed_fields: ["status"],
      before: {
        status: lead.status,
      },
      after: {
        status: nextStatus,
      },
      actor: cleanActorName(actorName),
    },
  });

  return { updated: true };
}

export async function updateAdminClientFields({
  publicId,
  name,
  company,
  clientType,
  note,
  actorName,
}: {
  publicId: string;
  name: unknown;
  company: unknown;
  clientType: unknown;
  note?: unknown;
  actorName?: unknown;
}) {
  const lead = await getAdminLeadDetails(publicId);

  if (!lead) {
    throw new Error("Lead not found");
  }

  const nextClientType = cleanString(clientType, 80) ?? "unknown";

  if (!allowedClientTypes.has(nextClientType)) {
    throw new Error("Invalid client type");
  }

  const before = {
    name: lead.client.name,
    company: lead.client.company,
    client_type: lead.client.clientType ?? "unknown",
  };
  const after = {
    name: cleanString(name, 160),
    company: cleanString(company, 180),
    client_type: nextClientType,
  };
  const fields = changedFields(before, after);
  const managerNote = cleanString(note, 1200);

  if (!fields.length && !managerNote) {
    return { updated: false };
  }

  if (fields.length) {
    await updateRows("clients", { id: lead.client.id }, after);
  }

  await insertAdminEvent({
    lead,
    eventType: "client_updated",
    metadata: {
      changed_fields: fields,
      before,
      after,
      note: managerNote,
      actor: cleanActorName(actorName),
    },
  });

  return { updated: true };
}

export async function addAdminLeadNote({
  publicId,
  text,
  actorName,
}: {
  publicId: string;
  text: unknown;
  actorName?: unknown;
}) {
  const lead = await getAdminLeadDetails(publicId);
  const noteText = cleanString(text, 2400);

  if (!lead) {
    throw new Error("Lead not found");
  }

  if (!noteText) {
    throw new Error("Note text is required");
  }

  await insertAdminEvent({
    lead,
    eventType: "manager_note",
    metadata: {
      text: noteText,
      actor: cleanActorName(actorName),
    },
  });
}

export async function addAdminClientContact({
  publicId,
  contactType,
  contactValue,
  label,
  isPrimary,
  actorName,
}: {
  publicId: string;
  contactType: unknown;
  contactValue: unknown;
  label?: unknown;
  isPrimary?: unknown;
  actorName?: unknown;
}) {
  const lead = await getAdminLeadDetails(publicId);
  const nextContactType = cleanString(contactType, 40);
  const rawValue = cleanString(contactValue, 220);

  if (!lead) {
    throw new Error("Lead not found");
  }

  if (!nextContactType || !allowedContactTypes.has(nextContactType)) {
    throw new Error("Invalid contact type");
  }

  if (!rawValue) {
    throw new Error("Contact value is required");
  }

  const normalizedValue = normalizeContactValue(nextContactType, rawValue);

  try {
    await insertRows("client_contacts", {
      client_id: lead.client.id,
      contact_type: nextContactType,
      contact_value: normalizedValue,
      label: cleanString(label, 220),
      is_primary: isPrimary === "on",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (!message.includes("duplicate key")) {
      throw error;
    }
  }

  await insertAdminEvent({
    lead,
    eventType: "contact_added",
    metadata: {
      contact_type: nextContactType,
      contact_value: normalizedValue,
      label: cleanString(label, 220),
      is_primary: isPrimary === "on",
      actor: cleanActorName(actorName),
    },
  });
}

async function findClientByContact(contactType: string, contactValue: string) {
  const rows = await selectRows(
    "client_contacts",
    new URLSearchParams({
      select: "client_id,clients(id,public_id,name,company,client_type)",
      contact_type: `eq.${contactType}`,
      contact_value: `eq.${contactValue}`,
      limit: "1",
    }),
  );
  const row = rows[0];
  const clientId = asString(row?.client_id);

  if (!clientId) {
    return null;
  }

  const client = asRecord(row.clients);

  return {
    id: clientId,
    publicId: asString(client?.public_id),
    name: asString(client?.name),
    company: asString(client?.company),
    clientType: asString(client?.client_type),
  };
}

async function createAdminClient({
  name,
  company,
  clientType,
}: {
  name: string | null;
  company: string | null;
  clientType: string;
}) {
  const rows = await insertRows("clients", {
    public_id: createPublicId("TXC"),
    name,
    company,
    client_type: clientType,
  });
  const row = rows[0];
  const id = asString(row?.id);

  if (!id) {
    throw new Error("Created client id is missing");
  }

  return {
    id,
    publicId: asString(row.public_id),
    name,
    company,
    clientType,
  };
}

async function insertClientContactSafely({
  clientId,
  contactType,
  contactValue,
  label,
  isPrimary,
}: {
  clientId: string;
  contactType: string;
  contactValue: string;
  label: string | null;
  isPrimary: boolean;
}) {
  try {
    await insertRows("client_contacts", {
      client_id: clientId,
      contact_type: contactType,
      contact_value: contactValue,
      label,
      is_primary: isPrimary,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (!message.includes("duplicate key")) {
      throw error;
    }
  }
}

export async function createManualAdminLead({
  name,
  company,
  clientType,
  phone,
  email,
  telegram,
  viber,
  sourceKind,
  productInterest,
  projectType,
  scale,
  location,
  timeline,
  priority,
  note,
}: {
  name: unknown;
  company: unknown;
  clientType: unknown;
  phone: unknown;
  email: unknown;
  telegram: unknown;
  viber: unknown;
  sourceKind: unknown;
  productInterest: unknown;
  projectType: unknown;
  scale: unknown;
  location: unknown;
  timeline: unknown;
  priority: unknown;
  note: unknown;
}) {
  const cleanName = cleanString(name, 160);
  const cleanCompany = cleanString(company, 180);
  const cleanClientType = cleanString(clientType, 80) ?? "unknown";
  const cleanPhone = cleanString(phone, 220);
  const cleanEmail = cleanString(email, 220);
  const cleanTelegram = cleanString(telegram, 220);
  const cleanViber = cleanString(viber, 220);
  const cleanPriority = cleanString(priority, 40) ?? "warm";
  const cleanProductInterest = cleanString(productInterest, 220);
  const cleanSourceKind = cleanString(sourceKind, 80) ?? "other";

  if (!allowedClientTypes.has(cleanClientType)) {
    throw new Error("Invalid client type");
  }

  if (!allowedPriorities.has(cleanPriority)) {
    throw new Error("Invalid lead priority");
  }

  if (!cleanProductInterest) {
    throw new Error("Product interest is required");
  }

  const normalizedPhone = cleanPhone ? normalizeContactValue("phone", cleanPhone) : null;
  const normalizedEmail = cleanEmail ? normalizeContactValue("email", cleanEmail) : null;

  if (!normalizedPhone && !normalizedEmail && !cleanTelegram && !cleanViber) {
    throw new Error("At least one contact is required");
  }

  const existingClient =
    (normalizedPhone ? await findClientByContact("phone", normalizedPhone) : null) ??
    (normalizedEmail ? await findClientByContact("email", normalizedEmail) : null);
  const client =
    existingClient ??
    (await createAdminClient({
      name: cleanName,
      company: cleanCompany,
      clientType: cleanClientType,
    }));

  const contactLabelBase = cleanName ?? cleanCompany ?? "Ручна заявка";
  const contactsToInsert = [
    normalizedPhone
      ? {
          contactType: "phone",
          contactValue: normalizedPhone,
          label: `Телефон: ${contactLabelBase}`,
          isPrimary: true,
        }
      : null,
    normalizedEmail
      ? {
          contactType: "email",
          contactValue: normalizedEmail,
          label: `Email: ${contactLabelBase}`,
          isPrimary: !normalizedPhone,
        }
      : null,
    cleanTelegram
      ? {
          contactType: "telegram",
          contactValue: cleanTelegram,
          label: `Telegram: ${contactLabelBase}`,
          isPrimary: !normalizedPhone && !normalizedEmail,
        }
      : null,
    cleanViber
      ? {
          contactType: "viber",
          contactValue: normalizeContactValue("viber", cleanViber),
          label: `Viber: ${contactLabelBase}`,
          isPrimary: !normalizedPhone && !normalizedEmail && !cleanTelegram,
        }
      : null,
  ].filter(Boolean) as Array<{
    contactType: string;
    contactValue: string;
    label: string;
    isPrimary: boolean;
  }>;

  for (const contact of contactsToInsert) {
    await insertClientContactSafely({
      clientId: client.id,
      contactType: contact.contactType,
      contactValue: contact.contactValue,
      label: contact.label,
      isPrimary: contact.isPrimary,
    });
  }

  const leadRows = await insertRows("leads", {
    public_id: await createLeadPublicId(),
    client_id: client.id,
    source_page: "manual",
    source_cta: "manual_create",
    initial_channel: "admin",
    product_interest: cleanProductInterest,
    project_type: cleanString(projectType, 220),
    scale: cleanString(scale, 220),
    location: cleanString(location, 220),
    timeline: cleanString(timeline, 220),
    status: "new",
    priority: cleanPriority,
  });
  const leadRow = leadRows[0];
  const leadId = asString(leadRow?.id);
  const leadPublicId = asString(leadRow?.public_id);

  if (!leadId || !leadPublicId) {
    throw new Error("Created lead id is missing");
  }

  await insertRows("lead_events", {
    client_id: client.id,
    lead_id: leadId,
    event_type: "manual_lead_created",
    channel: "admin",
    source_page: "manual",
    source_cta: "manual_create",
    metadata: {
      source_kind: cleanSourceKind,
      note: cleanString(note, 2400),
      created_by: "admin",
      client_was_created: !existingClient,
      contacts_added: contactsToInsert.map((contact) => contact.contactType),
    },
  });

  return {
    leadPublicId,
    clientWasCreated: !existingClient,
  };
}

export async function uploadAdminLeadFile({
  publicId,
  file,
  fileCategory,
  actorName,
}: {
  publicId: string;
  file: File;
  fileCategory: unknown;
  actorName?: unknown;
}) {
  const lead = await getAdminLeadDetails(publicId);
  const category = cleanString(fileCategory, 80) ?? "other";
  const actor = cleanActorName(actorName);

  if (!lead) {
    throw new Error("Lead not found");
  }

  if (!file.name || file.size <= 0) {
    throw new Error("File is required");
  }

  const allowedFileCategories = new Set([
    "drawing",
    "layout",
    "photo",
    "technical_task",
    "proposal",
    "contract",
    "invoice",
    "internal_calculation",
    "other",
  ]);

  if (!allowedFileCategories.has(category)) {
    throw new Error("Invalid file category");
  }

  const bucket = await ensureLeadFilesBucket();
  const safeFileName = sanitizeFileName(file.name);
  const storagePath = `${lead.publicId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeFileName}`;
  const body = await file.arrayBuffer();
  const uploadResponse = await storageRequest(
    `/object/${encodeURIComponent(bucket)}/${encodeStoragePath(storagePath)}`,
    {
      method: "POST",
      headers: {
        "content-type": file.type || "application/octet-stream",
        "x-upsert": "false",
      },
      body,
    },
  );
  const uploadText = await uploadResponse.text();

  if (!uploadResponse.ok) {
    throw new Error(`Supabase storage upload failed: ${uploadResponse.status} ${uploadText}`);
  }

  await insertRows("lead_files", {
    client_id: lead.client.id,
    lead_id: lead.id,
    file_name: file.name,
    file_type: file.type || null,
    file_size: file.size,
    storage_bucket: bucket,
    storage_path: storagePath,
    file_category: category,
    source: "admin",
    uploaded_by: actor,
  });

  await insertAdminEvent({
    lead,
    eventType: "file_uploaded",
    metadata: {
      file_name: file.name,
      file_type: file.type || null,
      file_size: file.size,
      file_category: category,
      storage_bucket: bucket,
      storage_path: storagePath,
      actor,
    },
  });
}

export async function deleteAdminLeadFile({
  publicId,
  fileId,
  actorName,
}: {
  publicId: string;
  fileId: unknown;
  actorName?: unknown;
}) {
  const lead = await getAdminLeadDetails(publicId);
  const cleanFileId = cleanString(fileId, 120);
  const actor = cleanActorName(actorName);

  if (!lead) {
    throw new Error("Lead not found");
  }

  if (!cleanFileId) {
    throw new Error("File id is required");
  }

  const file = lead.files.find((item) => item.id === cleanFileId);

  if (!file) {
    throw new Error("File not found");
  }

  const deleteStorageResponse = await storageRequest(
    `/object/${encodeURIComponent(file.storageBucket)}/${encodeStoragePath(file.storagePath)}`,
    {
      method: "DELETE",
    },
  );
  const deleteStorageText = await deleteStorageResponse.text();

  if (!deleteStorageResponse.ok && deleteStorageResponse.status !== 404) {
    throw new Error(`Supabase storage delete failed: ${deleteStorageResponse.status} ${deleteStorageText}`);
  }

  await deleteRows("lead_files", {
    id: file.id,
  });

  await insertAdminEvent({
    lead,
    eventType: "file_deleted",
    metadata: {
      file_name: file.fileName,
      file_type: file.fileType,
      file_size: file.fileSize,
      file_category: file.fileCategory,
      storage_bucket: file.storageBucket,
      storage_path: file.storagePath,
      actor,
    },
  });

  return { deleted: true };
}
