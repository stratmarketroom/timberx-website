import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { isAdminAuthenticated, isDirectorAuthenticated, isDirectorConfigured } from "@/lib/admin/auth";
import {
  getAdminDashboardMetrics,
  type DashboardGroupMetric,
  type DashboardMoneyTotals,
} from "@/lib/admin/dashboard";
import { loginAdmin, logoutAdmin } from "../leads/actions";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Dashboard | TimberX Admin",
  alternates: {
    canonical: "/admin/dashboard",
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
  new: "Нові",
  in_progress: "В роботі",
  qualified: "Кваліфіковані",
  proposal_sent: "КП",
  won: "Виграні",
  lost: "Втрачені",
  no_response: "Без відповіді",
  spam: "Спам",
};

const rangeOptions = [
  ["7", "7 днів"],
  ["30", "30 днів"],
  ["90", "90 днів"],
  ["all", "Весь час"],
];

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function formatPercent(value: number) {
  return `${value}%`;
}

function formatHours(value: number | null) {
  if (value === null) {
    return "Немає даних";
  }

  if (value < 1) {
    return `${Math.round(value * 60)} хв`;
  }

  return `${value.toFixed(value < 10 ? 1 : 0)} год`;
}

function formatMoneyValue(value: number) {
  return new Intl.NumberFormat("uk-UA", {
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function LoginPanel({ reason }: { reason?: string }) {
  const message =
    reason === "missing"
      ? "Додайте TIMBERX_DIRECTOR_PASSWORD у env."
      : reason === "invalid"
        ? "Пароль не підійшов. Спробуйте ще раз."
        : reason === "director"
          ? "Для Dashboard потрібен директорський пароль."
          : null;

  return (
    <main className="min-h-screen bg-[#F6F1EA] px-4 py-10 text-[#25201A]">
      <section className="mx-auto mt-16 w-full max-w-[28rem] rounded-[12px] border border-[#E1D7C8] bg-[#FEFDFB] p-6 shadow-[0_20px_70px_rgba(80,62,43,0.12)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F2994A]">
          TimberX Admin
        </p>
        <h1 className="mt-3 text-2xl font-bold">Вхід до дашборда</h1>
        <form action={loginAdmin} className="mt-6 space-y-4">
          <input type="hidden" name="returnTo" value="/admin/dashboard" />
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
              className="mt-2 h-12 w-full rounded-[9px] border border-[#D8CFC2] bg-[#FBFAF7] px-4 text-base font-semibold text-[#25201A] outline-none transition focus:border-[#F2994A]/70"
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
      <section className="mx-auto mt-16 w-full max-w-[34rem] rounded-[12px] border border-[#F2994A]/30 bg-[#FEFDFB] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F2994A]">
          Потрібне налаштування
        </p>
        <h1 className="mt-3 text-2xl font-bold">Адмін-пароль не заданий</h1>
        <p className="mt-4 text-sm leading-7 text-[#6F675E]">
          Додайте `TIMBERX_DIRECTOR_PASSWORD` у `.env.local` та у Vercel env.
        </p>
      </section>
    </main>
  );
}

function Section({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[12px] border border-[#4B3828]/80 bg-[#1F1A15] shadow-[0_20px_60px_rgba(0,0,0,0.24)] ${className}`}
    >
      <div className="border-b border-[#3A2D22] px-5 py-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#B6A89A]">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function MetricCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-[14px] border border-[#4B3828]/80 bg-[#211B16] px-5 py-5 shadow-[0_18px_55px_rgba(0,0,0,0.28)]">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#B6A89A]">{label}</p>
      <p className="mt-3 text-5xl font-bold tracking-normal text-[#F8EFE4]">{value}</p>
      {hint ? <p className="mt-3 text-base leading-7 text-[#BEB2A6]">{hint}</p> : null}
    </div>
  );
}

function MoneyMetricCard({ label, totals }: { label: string; totals: DashboardMoneyTotals }) {
  return (
    <div className="rounded-[14px] border border-[#4B3828]/80 bg-[#211B16] px-5 py-5 shadow-[0_18px_55px_rgba(0,0,0,0.28)]">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#B6A89A]">{label}</p>
      <div className="mt-4 space-y-2.5">
        {[
          ["UAH", "UA"],
          ["EUR", "€"],
          ["USD", "$"],
        ].map(([currency, currencyLabel]) => (
          <div key={currency} className="grid grid-cols-[2.4rem_minmax(0,1fr)] items-baseline gap-3">
            <span className="text-base font-bold tracking-normal text-[#B6A89A]">{currencyLabel}</span>
            <span className="min-w-0 text-right text-[1.35rem] font-bold leading-7 tracking-normal text-[#F8EFE4] tabular-nums [overflow-wrap:anywhere]">
              {formatMoneyValue(totals[currency as keyof DashboardMoneyTotals])}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarList({ items }: { items: DashboardGroupMetric[] }) {
  if (!items.length) {
    return <p className="text-base leading-7 text-[#BEB2A6]">Даних поки немає.</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.key}>
          <div className="flex items-center justify-between gap-4 text-base font-semibold text-[#F8EFE4]">
            <span>{item.label}</span>
            <span className="tabular-nums">{item.count}</span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#33281F]">
            <div
              className="h-full rounded-full bg-[#F2994A]"
              style={{ width: `${Math.max(item.percent, item.count ? 6 : 0)}%` }}
            />
          </div>
          <p className="mt-1 text-sm font-semibold text-[#B6A89A]">{formatPercent(item.percent)}</p>
        </div>
      ))}
    </div>
  );
}

function CompactDirectionList({ items }: { items: DashboardGroupMetric[] }) {
  if (!items.length) {
    return <p className="text-base leading-7 text-[#BEB2A6]">Даних поки немає.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item) => (
        <div key={item.key} className="rounded-[9px] border border-[#3A2D22] bg-[#17130F] p-3">
          <p className="min-h-10 text-sm font-bold leading-5 text-[#F8EFE4]">{item.label}</p>
          <div className="mt-3 flex items-end justify-between gap-2">
            <p className="text-2xl font-bold tabular-nums text-[#F8EFE4]">{item.count}</p>
            <p className="text-xs font-bold text-[#B6A89A]">{formatPercent(item.percent)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function StatusFlow({
  items,
}: {
  items: {
    status: string;
    label: string;
    count: number;
    percent: number;
  }[];
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <div key={item.status} className="rounded-[10px] border border-[#3A2D22] bg-[#17130F] p-4">
          <div className="flex items-start justify-between gap-4">
            <p className="text-base font-bold text-[#F8EFE4]">{item.label}</p>
            <p className="text-2xl font-bold tabular-nums text-[#F8EFE4]">{item.count}</p>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#33281F]">
            <div className="h-full rounded-full bg-[#F2994A]" style={{ width: `${item.percent}%` }} />
          </div>
          <p className="mt-2 text-sm font-semibold text-[#B6A89A]">{formatPercent(item.percent)} від заявок</p>
        </div>
      ))}
    </div>
  );
}

export default async function AdminDashboardPage({ searchParams }: PageProps) {
  const rawSearchParams = (await searchParams) ?? {};
  const authReason = firstValue(rawSearchParams.auth);
  const range = firstValue(rawSearchParams.range);

  if (!isDirectorConfigured()) {
    return <AdminSetupPanel />;
  }

  const hasAnyAdminSession = await isAdminAuthenticated();

  if (!(await isDirectorAuthenticated())) {
    return <LoginPanel reason={authReason ?? (hasAnyAdminSession ? "director" : undefined)} />;
  }

  const metrics = await getAdminDashboardMetrics({ range });
  const won = metrics.statusMetrics.find((item) => item.status === "won")?.count ?? 0;
  const lost = metrics.statusMetrics.find((item) => item.status === "lost")?.count ?? 0;
  const proposals = metrics.statusMetrics.find((item) => item.status === "proposal_sent")?.count ?? 0;
  const qualityPercent = metrics.totalLeads
    ? Math.round(
        ((metrics.statusMetrics
          .filter((item) => ["proposal_sent", "won"].includes(item.status))
          .reduce((sum, item) => sum + item.count, 0) /
          metrics.totalLeads) *
          100),
      )
    : 0;

  return (
    <main className="min-h-screen bg-[#14100D] px-4 py-6 text-[#F8EFE4] md:px-6 lg:px-8">
      <div className="mx-auto max-w-[96rem]">
        <header className="flex flex-col gap-4 border-b border-[#3A2D22] pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F2994A]">
              TimberX Admin
            </p>
            <h1 className="mt-2 text-5xl font-bold tracking-normal text-[#F8EFE4]">Dashboard</h1>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-[#C8BBAE]">
              Продажі, якість заявок і базовий маркетинговий зріз без зайвих технічних деталей.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/leads"
              className="inline-flex h-12 items-center justify-center rounded-[9px] border border-[#4B3828] bg-[#1F1A15] px-5 text-lg font-semibold text-[#F8EFE4] transition hover:border-[#F2994A]/70 hover:text-[#F2994A]"
            >
              Заявки
            </Link>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="h-12 rounded-[9px] border border-[#4B3828] bg-[#1F1A15] px-5 text-lg font-semibold text-[#F8EFE4] transition hover:border-[#F2994A]/70 hover:text-[#F2994A]"
              >
                Вийти
              </button>
            </form>
          </div>
        </header>

        <nav className="mt-5 flex flex-wrap gap-2">
          {rangeOptions.map(([value, label]) => {
            const active = metrics.range === value;

            return (
              <Link
                key={value}
                href={`/admin/dashboard?range=${value}`}
                className={`inline-flex h-11 items-center rounded-[9px] border px-4 text-base font-bold transition ${
                  active
                    ? "border-[#F2994A] bg-[#F2994A] text-[#25170B]"
                    : "border-[#4B3828] bg-[#1F1A15] text-[#D8CCBF] hover:border-[#F2994A]/70 hover:text-[#F2994A]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-7">
          <MetricCard label={`Заявки, ${metrics.rangeLabel}`} value={metrics.totalLeads} />
          <MetricCard label="КП" value={proposals} hint="Заявки, що дійшли до комерційної пропозиції." />
          <MoneyMetricCard label="Сума по КП" totals={metrics.finance.proposalTotals} />
          <MetricCard label="Виграні" value={won} />
          <MoneyMetricCard label="Сума виграних" totals={metrics.finance.wonTotals} />
          <MetricCard label="Втрачені" value={lost} />
          <MetricCard label="Якість" value={`${qualityPercent}%`} hint="Дійшли до КП або продажу." />
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.65fr)]">
          <div className="space-y-5">
            <Section title="Статуси та конверсія">
              <StatusFlow items={metrics.statusMetrics} />
            </Section>

            <Section title="Канали">
              <BarList items={metrics.channels} />
            </Section>
          </div>

          <aside className="space-y-5">
            <Section title="Перша дія">
              <p className="text-5xl font-bold tracking-normal text-[#F8EFE4]">
                {formatHours(metrics.averageFirstActionHours)}
              </p>
              <p className="mt-3 text-base leading-7 text-[#BEB2A6]">
                Середній час від створення заявки до першої дії менеджера.
              </p>
            </Section>

            <Section title="Завислі заявки">
              {metrics.staleLeads.length ? (
                <div className="space-y-3">
                  {metrics.staleLeads.map((lead) => (
                    <Link
                      key={lead.publicId}
                      href={`/admin/leads/${lead.publicId}`}
                      className="block rounded-[9px] border border-[#3A2D22] bg-[#17130F] p-3 transition hover:border-[#F2994A]/70"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-base font-bold text-[#F2994A]">{lead.publicId}</p>
                        <span className="rounded-[7px] border border-[#4B3828] px-2 py-1 text-xs font-bold text-[#C8BBAE]">
                          {statusLabels[lead.status] ?? lead.status}
                        </span>
                      </div>
                      <p className="mt-2 text-base font-semibold text-[#F8EFE4]">{lead.clientName}</p>
                      <p className="mt-1 text-sm font-semibold text-[#B6A89A]">
                        Остання дія: {formatDate(lead.lastActivityAt)}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-base leading-7 text-[#BEB2A6]">Завислих заявок немає.</p>
              )}
            </Section>

            <Section title="Заявки по напрямах">
              <CompactDirectionList items={metrics.directions} />
            </Section>
          </aside>
        </div>
      </div>
    </main>
  );
}
