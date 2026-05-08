import type { Metadata } from "next";
import Link from "next/link";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin/auth";
import { loginAdmin, logoutAdmin } from "../actions";
import { createManualLeadAction } from "./actions";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "Нова заявка | TimberX Admin",
  alternates: {
    canonical: "/admin/leads/new",
  },
  robots: {
    index: false,
    follow: false,
  },
};

const clientTypeLabels: Record<string, string> = {
  unknown: "Не визначено",
  developer: "Девелопер",
  builder: "Забудовник",
  general_contractor: "Генпідрядник",
  community: "Громада",
  architect: "Архітектор",
  private_client: "Приватний клієнт",
  business: "Бізнес",
  other: "Інше",
};

const sourceKindLabels: Record<string, string> = {
  call: "Дзвінок",
  meeting: "Зустріч",
  conference: "Конференція",
  referral: "Рекомендація",
  personal: "Особистий контакт",
  old_client: "Старий клієнт",
  other: "Інше",
};

const priorityLabels: Record<string, string> = {
  warm: "Тепла",
  hot: "Гаряча",
  cold: "Холодна",
};

const productOptions = [
  "Модульні будинки",
  "Ферми МЗП",
  "Клеєні конструкції",
  "Каркасно-панельні будинки",
  "Санітарні модулі",
  "Фахверк",
  "Інше",
];

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
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
        <h1 className="mt-3 text-2xl font-bold">Вхід до адмінки</h1>
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
        </p>
      </section>
    </main>
  );
}

function FormField({
  label,
  children,
  note,
}: {
  label: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/38">
        {label}
      </span>
      <div className="mt-2">{children}</div>
      {note ? <span className="mt-1 block text-xs leading-5 text-white/38">{note}</span> : null}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-[9px] border border-white/10 bg-white/[0.045] px-3 text-sm font-semibold text-white outline-none placeholder:text-white/34 transition focus:border-[#F2994A]/50";
const textareaClass =
  "min-h-28 w-full rounded-[9px] border border-white/10 bg-white/[0.045] px-3 py-3 text-sm font-semibold leading-6 text-white outline-none placeholder:text-white/34 transition focus:border-[#F2994A]/50";
const selectClass =
  "h-11 w-full rounded-[9px] border border-white/10 bg-[#24282b] px-3 text-sm font-semibold text-white outline-none transition focus:border-[#F2994A]/50";

function ManualLeadForm() {
  return (
    <form action={createManualLeadAction} className="grid gap-4">
      <section className="rounded-[12px] border border-white/10 bg-[#202326]">
        <div className="border-b border-white/8 px-4 py-3">
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white/58">
            Клієнт і контакти
          </h2>
        </div>
        <div className="grid gap-4 p-4 md:grid-cols-2">
          <FormField label="Ім'я">
            <input name="name" className={inputClass} />
          </FormField>
          <FormField label="Компанія">
            <input name="company" className={inputClass} />
          </FormField>
          <FormField label="Тип клієнта">
            <select name="clientType" defaultValue="unknown" className={selectClass}>
              {Object.entries(clientTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Телефон" note="За телефоном шукаємо існуючого клієнта.">
            <input name="phone" placeholder="+380..." className={inputClass} />
          </FormField>
          <FormField label="Email" note="Email теж використовується для дедуплікації.">
            <input name="email" type="email" placeholder="office@example.com" className={inputClass} />
          </FormField>
          <FormField label="Telegram">
            <input name="telegram" placeholder="@username або chat id" className={inputClass} />
          </FormField>
          <FormField label="Viber">
            <input name="viber" placeholder="+380..." className={inputClass} />
          </FormField>
        </div>
      </section>

      <section className="rounded-[12px] border border-white/10 bg-[#202326]">
        <div className="border-b border-white/8 px-4 py-3">
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white/58">
            Заявка
          </h2>
        </div>
        <div className="grid gap-4 p-4 md:grid-cols-2">
          <FormField label="Джерело">
            <select name="sourceKind" defaultValue="call" className={selectClass}>
              {Object.entries(sourceKindLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Пріоритет">
            <select name="priority" defaultValue="warm" className={selectClass}>
              {Object.entries(priorityLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Напрям">
            <select name="productInterest" required defaultValue="Модульні будинки" className={selectClass}>
              {productOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Тип / назва проєкту">
            <input name="projectType" placeholder="Наприклад: модульний будинок 93 м²" className={inputClass} />
          </FormField>
          <FormField label="Масштаб / кількість">
            <input name="scale" placeholder="Наприклад: 3 модулі або 300 м²" className={inputClass} />
          </FormField>
          <FormField label="Локація">
            <input name="location" placeholder="Місто або область" className={inputClass} />
          </FormField>
          <FormField label="Строки">
            <input name="timeline" placeholder="Терміново, 1-3 місяці, пізніше" className={inputClass} />
          </FormField>
        </div>
      </section>

      <section className="rounded-[12px] border border-white/10 bg-[#202326] p-4">
        <FormField label="Перша нотатка">
          <textarea
            name="note"
            placeholder="Контекст зустрічі, домовленості, наступний крок"
            className={textareaClass}
          />
        </FormField>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/admin/leads"
          className="inline-flex h-11 items-center justify-center rounded-[9px] border border-white/12 px-5 text-sm font-semibold text-white/70 transition hover:border-[#F2994A]/40 hover:text-[#F2994A]"
        >
          Скасувати
        </Link>
        <button
          type="submit"
          className="h-11 rounded-[9px] bg-[#F2994A] px-5 text-sm font-bold text-[#1B1D1F] transition hover:bg-[#de8232]"
        >
          Створити заявку
        </button>
      </div>
    </form>
  );
}

export default async function NewAdminLeadPage({ searchParams }: PageProps) {
  const rawSearchParams = (await searchParams) ?? {};
  const authReason = firstValue(rawSearchParams.auth);

  if (!isAdminConfigured()) {
    return <AdminSetupPanel />;
  }

  if (!(await isAdminAuthenticated())) {
    return <LoginPanel reason={authReason} />;
  }

  return (
    <main className="min-h-screen bg-[#17191b] px-4 py-6 text-white md:px-6 lg:px-8">
      <div className="mx-auto max-w-[72rem]">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link href="/admin/leads" className="text-sm font-semibold text-white/54 transition hover:text-[#F2994A]">
              ← До списку заявок
            </Link>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F2994A]">
              TimberX Admin
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal">Нова заявка</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">
              Для дзвінків, зустрічей, конференцій, рекомендацій і старих клієнтів. Запис піде в ту саму Supabase-базу.
            </p>
          </div>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="h-10 rounded-[9px] border border-white/12 px-4 text-sm font-semibold text-white/70 transition hover:border-[#F2994A]/40 hover:text-[#F2994A]"
            >
              Вийти
            </button>
          </form>
        </header>

        <div className="mt-5">
          <ManualLeadForm />
        </div>
      </div>
    </main>
  );
}

