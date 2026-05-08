import type { Metadata } from "next";
import Link from "next/link";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin/auth";
import { getAdminLeads, type AdminContact, type AdminLead } from "@/lib/admin/leads";
import { loginAdmin, logoutAdmin } from "./actions";

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

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "new"
      ? "border-[#F2994A]/45 bg-[#F2994A]/12 text-[#ffd4ad]"
      : status === "won"
        ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100"
        : status === "lost" || status === "spam"
          ? "border-red-300/24 bg-red-300/10 text-red-100"
          : "border-white/12 bg-white/[0.055] text-white/76";

  return (
    <span className={`inline-flex min-h-8 items-center rounded-[8px] border px-2.5 text-xs font-semibold ${tone}`}>
      {labelFromMap(statusLabels, status)}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const tone =
    priority === "hot"
      ? "bg-[#F2994A] text-[#1B1D1F]"
      : priority === "cold"
        ? "border border-white/12 bg-white/[0.035] text-white/58"
        : "border border-[#F2994A]/22 bg-[#F2994A]/8 text-[#ffd4ad]";

  return (
    <span className={`inline-flex min-h-7 items-center rounded-[8px] px-2.5 text-xs font-bold ${tone}`}>
      {labelFromMap(priorityLabels, priority)}
    </span>
  );
}

function ContactList({ contacts }: { contacts: AdminContact[] }) {
  if (!contacts.length) {
    return <span className="text-white/42">Контактів немає</span>;
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
            className="rounded-[7px] border border-white/10 bg-white/[0.04] px-2 py-1 text-[12px] font-semibold text-white/74 transition hover:border-[#F2994A]/36 hover:text-[#F2994A]"
          >
            {content}
          </a>
        ) : (
          <span
            key={contact.id}
            className="rounded-[7px] border border-white/10 bg-white/[0.04] px-2 py-1 text-[12px] font-semibold text-white/74"
          >
            {content}
          </span>
        );
      })}
    </div>
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
    <main className="min-h-screen bg-[#17191b] px-4 py-10 text-white">
      <section className="mx-auto mt-16 w-full max-w-[28rem] rounded-[14px] border border-white/10 bg-[#202326] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.28)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F2994A]">
          TimberX Admin
        </p>
        <h1 className="mt-3 text-2xl font-bold">Вхід до заявок</h1>
        <form action={loginAdmin} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/54">
              Пароль
            </span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 h-12 w-full rounded-[10px] border border-white/12 bg-white/[0.055] px-4 text-sm font-semibold text-white outline-none transition placeholder:text-white/34 focus:border-[#F2994A]/58"
            />
          </label>
          {message ? (
            <p className="rounded-[10px] border border-[#F2994A]/20 bg-[#F2994A]/10 px-3 py-2 text-sm leading-6 text-[#ffd4ad]">
              {message}
            </p>
          ) : null}
          <button
            type="submit"
            className="h-12 w-full rounded-[10px] bg-[#F2994A] px-4 text-sm font-bold text-[#1B1D1F] transition hover:bg-[#de8232]"
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
    <main className="min-h-screen bg-[#17191b] px-4 py-10 text-white">
      <section className="mx-auto mt-16 w-full max-w-[34rem] rounded-[14px] border border-[#F2994A]/24 bg-[#202326] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F2994A]">
          Потрібне налаштування
        </p>
        <h1 className="mt-3 text-2xl font-bold">Адмін-пароль не заданий</h1>
        <p className="mt-4 text-sm leading-7 text-white/68">
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
        <div key={label} className="rounded-[12px] border border-white/10 bg-[#202326] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/48">{label}</p>
          <p className="mt-2 text-2xl font-bold text-white">{value}</p>
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
    <form className="grid gap-3 rounded-[12px] border border-white/10 bg-[#202326] p-4 lg:grid-cols-[1fr_180px_180px_180px_auto]">
      <input
        name="q"
        defaultValue={q}
        placeholder="Пошук: TX, телефон, email, клієнт"
        className="h-11 rounded-[9px] border border-white/10 bg-white/[0.045] px-3 text-sm font-semibold text-white outline-none placeholder:text-white/34 focus:border-[#F2994A]/50"
      />
      <select
        name="status"
        defaultValue={status ?? ""}
        className="h-11 rounded-[9px] border border-white/10 bg-[#24282b] px-3 text-sm font-semibold text-white outline-none focus:border-[#F2994A]/50"
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
        className="h-11 rounded-[9px] border border-white/10 bg-[#24282b] px-3 text-sm font-semibold text-white outline-none focus:border-[#F2994A]/50"
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
        className="h-11 rounded-[9px] border border-white/10 bg-[#24282b] px-3 text-sm font-semibold text-white outline-none focus:border-[#F2994A]/50"
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
        className="h-11 rounded-[9px] bg-[#F2994A] px-5 text-sm font-bold text-[#1B1D1F] transition hover:bg-[#de8232]"
      >
        Знайти
      </button>
    </form>
  );
}

function LeadRow({ lead }: { lead: AdminLead }) {
  const primaryContact = getPrimaryContact(lead.contacts);
  const clientName = lead.client.company ?? lead.client.name ?? "Клієнт без імені";
  const project = lead.projectType ?? lead.quiz?.projectTitle ?? "Не уточнено";

  return (
    <article className="grid gap-4 border-t border-white/8 px-4 py-4 transition hover:bg-white/[0.025] xl:grid-cols-[138px_minmax(190px,0.9fr)_minmax(220px,1.1fr)_minmax(190px,0.9fr)_minmax(180px,0.7fr)]">
      <div>
        <Link href={`/admin/leads/${lead.publicId}`} className="text-base font-bold text-[#F2994A] hover:text-[#ffc28a]">
          {lead.publicId}
        </Link>
        <p className="mt-1 text-xs font-semibold text-white/44">{formatDate(lead.createdAt)}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <StatusBadge status={lead.status} />
          <PriorityBadge priority={lead.priority} />
        </div>
      </div>

      <div>
        <p className="text-sm font-bold text-white">{clientName}</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/38">
          {labelFromMap(channelLabels, lead.initialChannel)}
        </p>
        {primaryContact ? (
          <p className="mt-2 text-sm text-white/66">{primaryContact.value}</p>
        ) : null}
      </div>

      <div>
        <p className="text-sm font-semibold text-white/86">{lead.productInterest ?? "Напрям не вказано"}</p>
        <p className="mt-1 text-sm leading-6 text-white/58">{project}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-white/46">
          {lead.scale ? <span>{lead.scale}</span> : null}
          {lead.location ? <span>{lead.location}</span> : null}
          {lead.timeline ? <span>{lead.timeline}</span> : null}
        </div>
      </div>

      <div>
        <ContactList contacts={lead.contacts} />
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/38">
          {lead.sourceCta ?? "Без CTA"}
        </p>
        <p className="mt-2 break-words text-xs leading-5 text-white/54">{lead.sourcePage ?? "manual / direct"}</p>
        {lead.latestEvent ? (
          <p className="mt-3 text-xs leading-5 text-white/46">
            Остання дія: {lead.latestEvent.type}, {formatDate(lead.latestEvent.createdAt)}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function LeadsTable({ leads }: { leads: AdminLead[] }) {
  if (!leads.length) {
    return (
      <div className="rounded-[12px] border border-white/10 bg-[#202326] px-5 py-10 text-center">
        <p className="text-lg font-bold">Заявок не знайдено</p>
        <p className="mt-2 text-sm text-white/56">Змініть фільтри або перевірте нові звернення пізніше.</p>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-[12px] border border-white/10 bg-[#202326]">
      <div className="hidden grid-cols-[138px_minmax(190px,0.9fr)_minmax(220px,1.1fr)_minmax(190px,0.9fr)_minmax(180px,0.7fr)] gap-4 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white/38 xl:grid">
        <span>Заявка</span>
        <span>Клієнт</span>
        <span>Запит</span>
        <span>Контакти</span>
        <span>Джерело</span>
      </div>
      {leads.map((lead) => (
        <LeadRow key={lead.id} lead={lead} />
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
  let leads: AdminLead[] = [];
  let errorMessage: string | null = null;

  try {
    leads = await getAdminLeads({ status, priority, channel, q });
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Не вдалося отримати заявки.";
  }

  return (
    <main className="min-h-screen bg-[#17191b] px-4 py-6 text-white md:px-6 lg:px-8">
      <div className="mx-auto max-w-[96rem]">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F2994A]">
              TimberX Admin
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal">Заявки</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">
              Спільна дошка для менеджерів: нові ліди, контакти, джерела, квізи та перші робочі статуси.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/leads/new"
              className="inline-flex h-10 items-center justify-center rounded-[9px] bg-[#F2994A] px-4 text-sm font-bold text-[#1B1D1F] transition hover:bg-[#de8232]"
            >
              Нова заявка
            </Link>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="h-10 rounded-[9px] border border-white/12 px-4 text-sm font-semibold text-white/70 transition hover:border-[#F2994A]/40 hover:text-[#F2994A]"
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
            <section className="rounded-[12px] border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm leading-6 text-red-100">
              {errorMessage}
            </section>
          ) : (
            <LeadsTable leads={leads} />
          )}
        </div>
      </div>
    </main>
  );
}
