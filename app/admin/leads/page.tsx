import type { Metadata } from "next";
import Link from "next/link";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin/auth";
import { getAdminLeads, type AdminContact, type AdminLead } from "@/lib/admin/leads";
import { loginAdmin, logoutAdmin, updateLeadStatusFromList } from "./actions";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Заявки | TimberX Admin",
  alternates: {
    canonical: "/admin/leads",
  },
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const statusLabels: Record<string, string> = {
  new: "Нова",
  in_progress: "В роботі",
  qualified: "Кваліфікована",
  proposal_sent: "КП відправлено",
  won: "Виграна",
  lost: "Втрачена",
  no_response: "Без відповіді",
  spam: "Спам",
};

const priorityLabels: Record<string, string> = {
  hot: "Гаряча",
  warm: "Тепла",
  cold: "Холодна",
};

const channelLabels: Record<string, string> = {
  site: "Сайт",
  telegram: "Telegram",
  viber: "Viber",
  phone: "Телефон",
  email: "Email",
  whatsapp: "WhatsApp",
  admin: "Вручну",
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function labelFromMap(map: Record<string, string>, value: string | null | undefined) {
  if (!value) {
    return "Не вказано";
  }

  return map[value] ?? value;
}

function getContactHref(contact: AdminContact) {
  if (contact.type === "telegram") {
    const username =
      contact.value.startsWith("@") ? contact.value.slice(1) : contact.label?.match(/@([A-Za-z0-9_]+)/)?.[1];

    return username ? `https://t.me/${username}` : null;
  }

  if (contact.type === "phone" || contact.type === "viber" || contact.type === "whatsapp") {
    return `tel:${contact.value}`;
  }

  if (contact.type === "email") {
    return `mailto:${contact.value}`;
  }

  return null;
}

function getPrimaryContact(contacts: AdminContact[]) {
  return contacts.find((contact) => contact.isPrimary) ?? contacts[0] ?? null;
}

function createReturnTo({
  status,
  priority,
  channel,
  q,
}: {
  status?: string;
  priority?: string;
  channel?: string;
  q?: string;
}) {
  const params = new URLSearchParams();

  if (status) {
    params.set("status", status);
  }

  if (priority) {
    params.set("priority", priority);
  }

  if (channel) {
    params.set("channel", channel);
  }

  if (q) {
    params.set("q", q);
  }

  const query = params.toString();

  return query ? `/admin/leads?${query}` : "/admin/leads";
}

function PriorityBadge({ priority }: { priority: string }) {
  const tone =
    priority === "hot"
      ? "bg-[#F2994A] text-[#25170B]"
      : priority === "cold"
        ? "border border-[#DDD3C5] bg-white text-[#817970]"
        : "border border-[#F2994A]/35 bg-[#FFF0DF] text-[#A95815]";

  return (
    <span className={`inline-flex min-h-9 items-center rounded-[8px] px-3 text-sm font-bold ${tone}`}>
      {labelFromMap(priorityLabels, priority)}
    </span>
  );
}

function ContactList({ contacts }: { contacts: AdminContact[] }) {
  if (!contacts.length) {
    return <span className="text-[#8A8176]">Контактів немає</span>;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {contacts.slice(0, 4).map((contact) => {
        const href = getContactHref(contact);
        const content = `${contact.type}: ${contact.value}`;

        return href ? (
          <a
            key={contact.id}
            href={href}
        className="rounded-[7px] border border-[#E3DBD0] bg-[#FBFAF7] px-2.5 py-1.5 text-sm font-semibold text-[#4F4A45] transition hover:border-[#F2994A]/55 hover:text-[#A95815]"
          >
            {content}
          </a>
        ) : (
          <span
            key={contact.id}
          className="rounded-[7px] border border-[#E3DBD0] bg-[#FBFAF7] px-2.5 py-1.5 text-sm font-semibold text-[#4F4A45]"
          >
            {content}
          </span>
        );
      })}
    </div>
  );
}

function StatusControl({ lead, returnTo }: { lead: AdminLead; returnTo: string }) {
  return (
    <form key={`${lead.publicId}-${lead.status}`} action={updateLeadStatusFromList} className="grid gap-2">
      <input type="hidden" name="publicId" value={lead.publicId} />
      <input type="hidden" name="returnTo" value={returnTo} />
      <select
        name="status"
        defaultValue={lead.status}
        className="h-12 w-full rounded-[9px] border border-[#D8CFC2] bg-[#FBFAF7] px-3 text-base font-semibold text-[#25201A] outline-none transition focus:border-[#F2994A]/70"
      >
        {Object.entries(statusLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="h-10 rounded-[8px] border border-[#F2994A]/45 bg-[#FFF0DF] px-3 text-sm font-bold text-[#A95815] transition hover:bg-[#F2994A] hover:text-[#25170B]"
      >
        Зберегти
      </button>
    </form>
  );
}

function LoginPanel({ reason }: { reason?: string }) {
  const message =
    reason === "missing"
      ? "Додайте TIMBERX_ADMIN_PASSWORD або ADMIN_PASSWORD в env."
      : reason === "invalid"
        ? "Пароль не підійшов. Спробуйте ще раз."
        : null;

  return (
    <main className="min-h-screen bg-[#F6F1EA] px-4 py-10 text-[#25201A]">
      <section className="mx-auto mt-16 w-full max-w-[28rem] rounded-[12px] border border-[#E1D7C8] bg-white p-6 shadow-[0_20px_70px_rgba(80,62,43,0.12)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F2994A]">
          TimberX Admin
        </p>
        <h1 className="mt-3 text-2xl font-bold">Вхід до заявок</h1>
        <form action={loginAdmin} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A8176]">
              Імʼя менеджера
            </span>
            <input
              name="actorName"
              required
              autoComplete="name"
              placeholder="Наприклад: Ольга"
              className="mt-2 h-12 w-full rounded-[9px] border border-[#D8CFC2] bg-[#FBFAF7] px-4 text-base font-semibold text-[#25201A] outline-none transition placeholder:text-[#9A9288] focus:border-[#F2994A]/70"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A8176]">
              Пароль
            </span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 h-12 w-full rounded-[9px] border border-[#D8CFC2] bg-[#FBFAF7] px-4 text-base font-semibold text-[#25201A] outline-none transition placeholder:text-[#9A9288] focus:border-[#F2994A]/70"
            />
          </label>
          {message ? (
            <p className="rounded-[9px] border border-[#F2994A]/25 bg-[#FFF0DF] px-3 py-2 text-sm leading-6 text-[#8B4B13]">
              {message}
            </p>
          ) : null}
          <button
            type="submit"
            className="h-12 w-full rounded-[9px] bg-[#F2994A] px-4 text-base font-bold text-[#25170B] transition hover:bg-[#de8232]"
          >
            Увійти
          </button>
        </form>
      </section>
    </main>
  );
}

function AdminSetupPanel() {
  return (
    <main className="min-h-screen bg-[#F6F1EA] px-4 py-10 text-[#25201A]">
      <section className="mx-auto mt-16 w-full max-w-[34rem] rounded-[12px] border border-[#F2994A]/30 bg-white p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F2994A]">
          Потрібне налаштування
        </p>
        <h1 className="mt-3 text-2xl font-bold">Адмін-пароль не заданий</h1>
        <p className="mt-4 text-sm leading-7 text-[#6F675E]">
          Додайте `TIMBERX_ADMIN_PASSWORD` або `ADMIN_PASSWORD` у `.env.local` та у Vercel env.
          Після цього `/admin/leads` відкриється через пароль.
        </p>
      </section>
    </main>
  );
}

function SummaryBar({ leads }: { leads: AdminLead[] }) {
  const newCount = leads.filter((lead) => lead.status === "new").length;
  const inProgressCount = leads.filter((lead) => lead.status === "in_progress").length;
  const hotCount = leads.filter((lead) => lead.priority === "hot").length;

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {[
        ["Всього", leads.length],
        ["Нові", newCount],
        ["В роботі", inProgressCount],
        ["Гарячі", hotCount],
      ].map(([label, value]) => (
        <div key={label} className="rounded-[10px] border border-[#E1D7C8] bg-white px-5 py-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8A8176]">{label}</p>
          <p className="mt-2 text-3xl font-bold text-[#25201A]">{value}</p>
        </div>
      ))}
    </div>
  );
}

function Filters({
  status,
  priority,
  channel,
  q,
}: {
  status?: string;
  priority?: string;
  channel?: string;
  q?: string;
}) {
  return (
    <form className="grid gap-3 rounded-[10px] border border-[#E1D7C8] bg-white p-4 lg:grid-cols-[1fr_190px_190px_190px_auto]">
      <input
        name="q"
        defaultValue={q ?? ""}
        placeholder="Пошук: TX, телефон, email, клієнт"
        className="h-14 rounded-[9px] border border-[#D8CFC2] bg-[#FBFAF7] px-4 text-lg font-semibold text-[#25201A] outline-none placeholder:text-[#9A9288] focus:border-[#F2994A]/70"
      />
      <select
        name="status"
        defaultValue={status ?? ""}
        className="h-14 rounded-[9px] border border-[#D8CFC2] bg-[#FBFAF7] px-4 text-lg font-semibold text-[#25201A] outline-none focus:border-[#F2994A]/70"
      >
        <option value="">Усі статуси</option>
        {Object.entries(statusLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <select
        name="priority"
        defaultValue={priority ?? ""}
        className="h-14 rounded-[9px] border border-[#D8CFC2] bg-[#FBFAF7] px-4 text-lg font-semibold text-[#25201A] outline-none focus:border-[#F2994A]/70"
      >
        <option value="">Усі пріоритети</option>
        {Object.entries(priorityLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <select
        name="channel"
        defaultValue={channel ?? ""}
        className="h-14 rounded-[9px] border border-[#D8CFC2] bg-[#FBFAF7] px-4 text-lg font-semibold text-[#25201A] outline-none focus:border-[#F2994A]/70"
      >
        <option value="">Усі канали</option>
        {Object.entries(channelLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="h-14 rounded-[9px] bg-[#F2994A] px-6 text-lg font-bold text-[#25170B] transition hover:bg-[#de8232]"
      >
        Знайти
      </button>
    </form>
  );
}

function LeadRow({ lead, returnTo }: { lead: AdminLead; returnTo: string }) {
  const primaryContact = getPrimaryContact(lead.contacts);
  const clientName = lead.client.company ?? lead.client.name ?? "Клієнт без імені";
  const project = lead.projectType ?? lead.quiz?.projectTitle ?? "Не уточнено";

  return (
    <article className="grid gap-5 border-t border-[#E8DED1] px-5 py-6 transition hover:bg-[#FFF8EF] xl:grid-cols-[170px_minmax(150px,0.55fr)_minmax(230px,0.9fr)_minmax(280px,1.1fr)_minmax(230px,0.9fr)_minmax(210px,0.7fr)]">
      <div>
        <Link href={`/admin/leads/${lead.publicId}`} className="break-words text-lg font-bold text-[#A95815] hover:text-[#F2994A]">
          {lead.publicId}
        </Link>
        <p className="mt-1 text-base font-semibold text-[#8A8176]">{formatDate(lead.createdAt)}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <PriorityBadge priority={lead.priority} />
        </div>
      </div>

      <div>
        <StatusControl lead={lead} returnTo={returnTo} />
      </div>

      <div>
        <p className="text-lg font-bold text-[#25201A]">{clientName}</p>
        <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-[#8A8176]">
          {labelFromMap(channelLabels, lead.initialChannel)}
        </p>
        {primaryContact ? (
          <p className="mt-2 text-lg text-[#5F5A54]">{primaryContact.value}</p>
        ) : null}
      </div>

      <div>
        <p className="text-lg font-semibold text-[#25201A]">{lead.productInterest ?? "Напрям не вказано"}</p>
        <p className="mt-1 text-lg leading-7 text-[#6F675E]">{project}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-base font-semibold text-[#8A8176]">
          {lead.scale ? <span>{lead.scale}</span> : null}
          {lead.location ? <span>{lead.location}</span> : null}
          {lead.timeline ? <span>{lead.timeline}</span> : null}
        </div>
      </div>

      <div>
        <ContactList contacts={lead.contacts} />
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8A8176]">
          {lead.sourceCta ?? "Без CTA"}
        </p>
        <p className="mt-2 break-words text-base leading-6 text-[#6F675E]">{lead.sourcePage ?? "manual / direct"}</p>
        {lead.latestEvent ? (
          <p className="mt-3 text-sm leading-5 text-[#8A8176]">
            Активність: {formatDate(lead.latestEvent.createdAt)}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function LeadsTable({ leads, returnTo }: { leads: AdminLead[]; returnTo: string }) {
  if (!leads.length) {
    return (
      <div className="rounded-[10px] border border-[#E1D7C8] bg-white px-5 py-10 text-center text-[#25201A]">
        <p className="text-lg font-bold">Заявок не знайдено</p>
        <p className="mt-2 text-sm text-[#6F675E]">Змініть фільтри або перевірте нові звернення пізніше.</p>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-[10px] border border-[#E1D7C8] bg-white">
      <div className="hidden grid-cols-[170px_minmax(150px,0.55fr)_minmax(230px,0.9fr)_minmax(280px,1.1fr)_minmax(230px,0.9fr)_minmax(210px,0.7fr)] gap-5 bg-[#F4EFE8] px-5 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#8A8176] xl:grid">
        <span>Заявка</span>
        <span>Статус</span>
        <span>Клієнт</span>
        <span>Запит</span>
        <span>Контакти</span>
        <span>Джерело</span>
      </div>
      {leads.map((lead) => (
        <LeadRow key={lead.id} lead={lead} returnTo={returnTo} />
      ))}
    </section>
  );
}

export default async function AdminLeadsPage({ searchParams }: PageProps) {
  const rawSearchParams = (await searchParams) ?? {};
  const authReason = firstValue(rawSearchParams.auth);

  if (!isAdminConfigured()) {
    return <AdminSetupPanel />;
  }

  if (!(await isAdminAuthenticated())) {
    return <LoginPanel reason={authReason} />;
  }

  const status = firstValue(rawSearchParams.status);
  const priority = firstValue(rawSearchParams.priority);
  const channel = firstValue(rawSearchParams.channel);
  const q = firstValue(rawSearchParams.q);
  const returnTo = createReturnTo({ status, priority, channel, q });
  let leads: AdminLead[] = [];
  let errorMessage: string | null = null;

  try {
    leads = await getAdminLeads({ status, priority, channel, q });
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Не вдалося отримати заявки.";
  }

  return (
    <main className="min-h-screen bg-[#F6F1EA] px-4 py-6 text-[#25201A] md:px-6 lg:px-8">
      <div className="mx-auto max-w-[96rem]">
        <header className="flex flex-col gap-4 border-b border-[#E1D7C8] pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F2994A]">
              TimberX Admin
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-normal">Заявки</h1>
            <p className="mt-2 max-w-3xl text-lg leading-8 text-[#6F675E]">
              Робочий список для менеджерів: хто звернувся, що потрібно, як звʼязатися і який наступний крок.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/leads/new"
              className="inline-flex h-12 items-center justify-center rounded-[9px] bg-[#F2994A] px-5 text-lg font-bold text-[#25170B] transition hover:bg-[#de8232]"
            >
              Нова заявка
            </Link>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="h-12 rounded-[9px] border border-[#D8CFC2] bg-white px-5 text-lg font-semibold text-[#5F5A54] transition hover:border-[#F2994A]/60 hover:text-[#A95815]"
              >
                Вийти
              </button>
            </form>
          </div>
        </header>

        <div className="mt-5 space-y-4">
          <SummaryBar leads={leads} />
          <Filters status={status} priority={priority} channel={channel} q={q} />
          {errorMessage ? (
            <section className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
              {errorMessage}
            </section>
          ) : (
            <LeadsTable leads={leads} returnTo={returnTo} />
          )}
        </div>
      </div>
    </main>
  );
}
