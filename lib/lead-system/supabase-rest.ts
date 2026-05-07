type SupabaseInsertOptions = {
  table: string;
  payload: Record<string, unknown>;
};

type SupabaseSelectOptions = {
  table: string;
  select?: string;
  filters?: Record<string, string | number | boolean>;
  limit?: number;
};

type SupabaseMutationOptions = {
  table: string;
  payload?: Record<string, unknown>;
  filters: Record<string, string | number | boolean>;
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

function getSupabaseHeaders() {
  const { serviceRoleKey } = getSupabaseConfig();

  return {
    apikey: serviceRoleKey,
    authorization: `Bearer ${serviceRoleKey}`,
  };
}

export async function selectSupabaseRows({
  table,
  select = "*",
  filters = {},
  limit,
}: SupabaseSelectOptions) {
  const { url } = getSupabaseConfig();
  const params = new URLSearchParams({ select });

  for (const [key, value] of Object.entries(filters)) {
    params.set(key, `eq.${String(value)}`);
  }

  if (limit) {
    params.set("limit", String(limit));
  }

  const response = await fetch(`${url}/rest/v1/${table}?${params.toString()}`, {
    method: "GET",
    headers: getSupabaseHeaders(),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Supabase select failed: ${response.status} ${responseText}`);
  }

  return JSON.parse(responseText) as Array<Record<string, unknown>>;
}

export async function insertSupabaseRow({ table, payload }: SupabaseInsertOptions) {
  const { url } = getSupabaseConfig();

  const response = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      ...getSupabaseHeaders(),
      "content-type": "application/json",
      prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Supabase insert failed: ${response.status} ${responseText}`);
  }

  return JSON.parse(responseText) as Array<Record<string, unknown>>;
}

function buildFilteredUrl({
  table,
  filters,
}: {
  table: string;
  filters: Record<string, string | number | boolean>;
}) {
  const { url } = getSupabaseConfig();
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    params.set(key, `eq.${String(value)}`);
  }

  return `${url}/rest/v1/${table}?${params.toString()}`;
}

export async function updateSupabaseRows({
  table,
  payload = {},
  filters,
}: SupabaseMutationOptions) {
  const response = await fetch(buildFilteredUrl({ table, filters }), {
    method: "PATCH",
    headers: {
      ...getSupabaseHeaders(),
      "content-type": "application/json",
      prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Supabase update failed: ${response.status} ${responseText}`);
  }

  return responseText ? (JSON.parse(responseText) as Array<Record<string, unknown>>) : [];
}

export async function deleteSupabaseRows({ table, filters }: SupabaseMutationOptions) {
  const response = await fetch(buildFilteredUrl({ table, filters }), {
    method: "DELETE",
    headers: getSupabaseHeaders(),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Supabase delete failed: ${response.status} ${responseText}`);
  }
}
