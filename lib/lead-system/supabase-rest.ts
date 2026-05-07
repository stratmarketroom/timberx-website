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
