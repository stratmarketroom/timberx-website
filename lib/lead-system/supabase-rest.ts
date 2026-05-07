type SupabaseInsertOptions = {
  table: string;
  payload: Record<string, unknown>;
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

export async function insertSupabaseRow({ table, payload }: SupabaseInsertOptions) {
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
    throw new Error(`Supabase insert failed: ${response.status} ${responseText}`);
  }

  return JSON.parse(responseText) as Array<Record<string, unknown>>;
}

