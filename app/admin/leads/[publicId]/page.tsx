import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin/auth";
import {
  getAdminLeadDetails,
  type AdminContact,
  type AdminLeadDetails,
  type AdminLeadEvent,
  type AdminLeadFile,
} from "@/lib/admin/leads";
import { loginAdmin, logoutAdmin } from "../actions";
import {
  addContactAction,
  addNoteAction,
  updateClientAction,
  updateLeadAction,
  uploadFileAction,
} from "./actions";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PageProps = {
  params: Promise<{ publicId: string }>;
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

const fileCategoryLabels: Record<string, string> = {
  drawing: "Креслення",
  layout: "Планування",
  photo: "Фото",
  technical_task: "ТЗ",
  proposal: "КП",
  contract: "Договір",
  invoice: "Рахунок",
  internal_calculation: "Внутрішній прорахунок",
  other: "Інше",
};

const clientTypeLabels: Record<string, string> = {
  developer: "Девелопер",
  builder: "Забудовник",
  general_contractor: "Генпідрядник",
  community: "Громада",
  architect: "Архітектор",
  private_client: "Приватний клієнт",
  business: "Бізнес",
  other: "Інше",
  unknown: "Не визначено",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { publicId } = await params;

  return {
    title: `${publicId} | TimberX Admin`,
    alternates: {
      canonical: `/admin/leads/${publicId}`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

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

function formatFileSize(value: number | null) {
  if (!value) {
    return "Розмір не вказано";
  }

  if (value < 1024 * 1024) {
    return `${Math.round(value / 1024)} KB`;
  }

  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

function labelFromMap(map: Record<string, string>, value: string | null | undefined) {
  if (!value) {
    return "Не вказано";
  }

  return map[value] ?? value;
}

function valueOrEmpty(value: string | null | undefined) {
  return value || "Не вказано";
}

function savedMessage(value: string | undefined) {
  switch (value) {
    case "lead":
      return "Заявку оновлено.";
    case "client":
      return "Дані клієнта оновлено.";
    case "note":
      return "Нотатку додано.";
    case "contact":
      return "Контакт додано.";
    case "file":
      return "Файл додано.";
    default:
      return null;
  }
}

function getContactHref(contact: AdminContact) {
  if (contact.type === "telegram") {
    const username =
      contact.value.startsWith("@") ? contact.value.slice(1) : contact.label?.match(/@([A-Za-z0-9_]+)/)?.[1];

    return username ? `https://t.me/${username}` : null;
  }

  if (contact.type === "phone") {
    return `tel:${contact.value}`;
  }

  if (contact.type === "viber") {
    return `viber://chat?number=${encodeURIComponent(contact.value)}`;
  }

  if (contact.type === "whatsapp") {
    return `https://wa.me/${contact.value.replace(/\D/g, "")}`;
  }

  if (contact.type === "email") {
    return `mailto:${contact.value}`;
  }

  return null;
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
    <span className={`inline-flex min-h-8 items-center rounded-[8px] px-2.5 text-xs font-bold ${tone}`}>
      {labelFromMap(priorityLabels, priority)}
    </span>
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
        <h1 className="mt-3 text-2xl font-bold">Вхід до заявки</h1>
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

function Panel({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-[12px] border border-white/10 bg-[#202326]">
      <div className="flex min-h-12 items-center justify-between gap-3 border-b border-white/8 px-4 py-3">
        <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white/58">{title}</h2>
        {action}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/38">{label}</p>
      <div className="mt-1 text-sm font-semibold leading-6 text-white/82">{value}</div>
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/38">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-[9px] border border-white/10 bg-white/[0.045] px-3 text-sm font-semibold text-white outline-none placeholder:text-white/34 transition focus:border-[#F2994A]/50";
const textareaClass =
  "min-h-24 w-full rounded-[9px] border border-white/10 bg-white/[0.045] px-3 py-3 text-sm font-semibold leading-6 text-white outline-none placeholder:text-white/34 transition focus:border-[#F2994A]/50";
const selectClass =
  "h-11 w-full rounded-[9px] border border-white/10 bg-[#24282b] px-3 text-sm font-semibold text-white outline-none transition focus:border-[#F2994A]/50";
const submitClass =
  "h-11 rounded-[9px] bg-[#F2994A] px-5 text-sm font-bold text-[#1B1D1F] transition hover:bg-[#de8232]";

function ContactPanel({ contacts }: { contacts: AdminContact[] }) {
  if (!contacts.length) {
    return <p className="text-sm text-white/54">Контактів поки немає.</p>;
  }

  return (
    <div className="space-y-3">
      {contacts.map((contact) => {
        const href = getContactHref(contact);
        const content = (
          <>
            <span>{contact.type}</span>
            <span className="text-white/82">{contact.value}</span>
            {contact.isPrimary ? <span className="text-[#F2994A]">основний</span> : null}
          </>
        );

        return href ? (
          <a
            key={contact.id}
            href={href}
            className="grid gap-1 rounded-[9px] border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white/54 transition hover:border-[#F2994A]/36 hover:text-[#F2994A]"
          >
            {content}
          </a>
        ) : (
          <div
            key={contact.id}
            className="grid gap-1 rounded-[9px] border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white/54"
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}

function LeadEditForm({ lead }: { lead: AdminLeadDetails }) {
  return (
    <form action={updateLeadAction} className="grid gap-4">
      <input type="hidden" name="publicId" value={lead.publicId} />
      <div className="grid gap-3 md:grid-cols-2">
        <FormField label="Статус">
          <select name="status" defaultValue={lead.status} className={selectClass}>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Пріоритет">
          <select name="priority" defaultValue={lead.priority} className={selectClass}>
            {Object.entries(priorityLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Напрям">
          <input name="productInterest" defaultValue={lead.productInterest ?? ""} className={inputClass} />
        </FormField>
        <FormField label="Тип / назва проєкту">
          <input name="projectType" defaultValue={lead.projectType ?? lead.quiz?.projectTitle ?? ""} className={inputClass} />
        </FormField>
        <FormField label="Масштаб / кількість">
          <input name="scale" defaultValue={lead.scale ?? ""} className={inputClass} />
        </FormField>
        <FormField label="Локація">
          <input name="location" defaultValue={lead.location ?? ""} className={inputClass} />
        </FormField>
        <FormField label="Строки">
          <input name="timeline" defaultValue={lead.timeline ?? ""} className={inputClass} />
        </FormField>
      </div>
      <FormField label="Коментар до зміни">
        <textarea
          name="note"
          placeholder="Наприклад: уточнено після дзвінка, клієнт просить КП до понеділка"
          className={textareaClass}
        />
      </FormField>
      <div className="flex justify-end">
        <button type="submit" className={submitClass}>
          Зберегти заявку
        </button>
      </div>
    </form>
  );
}

function ClientEditForm({ lead }: { lead: AdminLeadDetails }) {
  return (
    <form action={updateClientAction} className="grid gap-4">
      <input type="hidden" name="publicId" value={lead.publicId} />
      <FormField label="Ім'я">
        <input name="name" defaultValue={lead.client.name ?? ""} className={inputClass} />
      </FormField>
      <FormField label="Компанія">
        <input name="company" defaultValue={lead.client.company ?? ""} className={inputClass} />
      </FormField>
      <FormField label="Тип клієнта">
        <select name="clientType" defaultValue={lead.client.clientType ?? "unknown"} className={selectClass}>
          {Object.entries(clientTypeLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="Коментар до зміни">
        <textarea name="note" placeholder="Що уточнили про клієнта" className={textareaClass} />
      </FormField>
      <div className="flex justify-end">
        <button type="submit" className={submitClass}>
          Зберегти клієнта
        </button>
      </div>
    </form>
  );
}

function AddContactForm({ publicId }: { publicId: string }) {
  return (
    <form action={addContactAction} className="mt-4 grid gap-3 border-t border-white/8 pt-4">
      <input type="hidden" name="publicId" value={publicId} />
      <div className="grid gap-3 sm:grid-cols-[130px_1fr]">
        <select name="contactType" defaultValue="phone" className={selectClass}>
          <option value="phone">Телефон</option>
          <option value="email">Email</option>
          <option value="telegram">Telegram</option>
          <option value="viber">Viber</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
        <input
          name="contactValue"
          required
          placeholder="+380..., email або @username"
          className={inputClass}
        />
      </div>
      <input name="label" placeholder="Підпис контакту" className={inputClass} />
      <label className="flex items-center gap-2 text-sm font-semibold text-white/62">
        <input name="isPrimary" type="checkbox" className="h-4 w-4 accent-[#F2994A]" />
        Основний контакт
      </label>
      <div className="flex justify-end">
        <button type="submit" className={submitClass}>
          Додати контакт
        </button>
      </div>
    </form>
  );
}

function AddNoteForm({ publicId }: { publicId: string }) {
  return (
    <form action={addNoteAction} className="grid gap-3">
      <input type="hidden" name="publicId" value={publicId} />
      <textarea
        name="text"
        required
        placeholder="Дзвінок, домовленості, що чекаємо від клієнта, наступний крок"
        className={textareaClass}
      />
      <div className="flex justify-end">
        <button type="submit" className={submitClass}>
          Додати нотатку
        </button>
      </div>
    </form>
  );
}

function QuizPanel({ lead }: { lead: AdminLeadDetails }) {
  const quizRows = [
    ["Напрям", lead.productInterest],
    ["Проєкт / тип", lead.projectType ?? lead.quiz?.projectTitle],
    ["Slug проєкту", lead.quiz?.projectSlug],
    ["Категорія", lead.quiz?.projectCategory],
    ["Аудиторія", lead.quiz?.audienceType],
    ["Масштаб / кількість", lead.scale],
    ["Локація", lead.location],
    ["Строки", lead.timeline],
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {quizRows.map(([label, value]) => (
        <Field key={label} label={label ?? ""} value={valueOrEmpty(value)} />
      ))}
    </div>
  );
}

function UploadFileForm({ publicId }: { publicId: string }) {
  return (
    <form action={uploadFileAction} className="mt-4 grid gap-3 border-t border-white/8 pt-4">
      <input type="hidden" name="publicId" value={publicId} />
      <FormField label="Категорія файлу">
        <select name="fileCategory" defaultValue="other" className={selectClass}>
          {Object.entries(fileCategoryLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="Файл">
        <input
          name="file"
          type="file"
          required
          className="block w-full rounded-[9px] border border-white/10 bg-white/[0.045] px-3 py-2 text-sm font-semibold text-white file:mr-3 file:rounded-[7px] file:border-0 file:bg-[#F2994A] file:px-3 file:py-2 file:text-sm file:font-bold file:text-[#1B1D1F]"
        />
      </FormField>
      <div className="flex justify-end">
        <button type="submit" className={submitClass}>
          Додати файл
        </button>
      </div>
    </form>
  );
}

function FilesPanel({ files, publicId }: { files: AdminLeadFile[]; publicId: string }) {
  if (!files.length) {
    return (
      <>
        <p className="text-sm text-white/54">Файлів поки немає.</p>
        <UploadFileForm publicId={publicId} />
      </>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {files.map((file) => (
          <div key={file.id} className="rounded-[9px] border border-white/10 bg-white/[0.035] px-3 py-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-white">{file.fileName}</p>
                <p className="mt-1 text-xs leading-5 text-white/50">
                  {labelFromMap(fileCategoryLabels, file.fileCategory)} · {formatFileSize(file.fileSize)}
                </p>
              </div>
              <span className="rounded-[7px] border border-white/10 px-2 py-1 text-xs font-semibold text-white/54">
                {file.uploadedBy}
              </span>
            </div>
            <p className="mt-3 break-words text-xs leading-5 text-white/42">
              {file.storageBucket}/{file.storagePath}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-white/38">{formatDate(file.createdAt)}</p>
              {file.signedUrl ? (
                <a
                  href={file.signedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center justify-center rounded-[8px] border border-[#F2994A]/30 px-3 text-xs font-bold text-[#F2994A] transition hover:bg-[#F2994A] hover:text-[#1B1D1F]"
                >
                  Відкрити
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <UploadFileForm publicId={publicId} />
    </>
  );
}

function EventMetadata({ metadata }: { metadata: Record<string, unknown> }) {
  const entries = Object.entries(metadata).filter(([, value]) => value !== null && value !== "");

  if (!entries.length) {
    return null;
  }

  return (
    <dl className="mt-3 grid gap-2 sm:grid-cols-2">
      {entries.slice(0, 10).map(([key, value]) => (
        <div key={key} className="rounded-[8px] bg-white/[0.035] px-2.5 py-2">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/34">{key}</dt>
          <dd className="mt-1 break-words text-xs leading-5 text-white/66">
            {typeof value === "object" ? JSON.stringify(value) : String(value)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function EventsPanel({ events }: { events: AdminLeadEvent[] }) {
  if (!events.length) {
    return <p className="text-sm text-white/54">Подій поки немає.</p>;
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <article key={event.id} className="rounded-[9px] border border-white/10 bg-white/[0.035] px-3 py-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-white">{event.type}</p>
              <p className="mt-1 text-xs text-white/44">
                {labelFromMap(channelLabels, event.channel)} · {formatDate(event.createdAt)}
              </p>
            </div>
            {event.sourceCta ? (
              <span className="rounded-[7px] border border-white/10 px-2 py-1 text-xs font-semibold text-white/54">
                {event.sourceCta}
              </span>
            ) : null}
          </div>
          {event.sourcePage ? (
            <p className="mt-2 break-words text-xs leading-5 text-white/44">{event.sourcePage}</p>
          ) : null}
          <EventMetadata metadata={event.metadata} />
        </article>
      ))}
    </div>
  );
}

function LeadHeader({ lead }: { lead: AdminLeadDetails }) {
  const clientName = lead.client.company ?? lead.client.name ?? "Клієнт без імені";

  return (
    <header className="border-b border-white/10 pb-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link href="/admin/leads" className="text-sm font-semibold text-white/54 transition hover:text-[#F2994A]">
            ← До списку заявок
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-normal text-white">{lead.publicId}</h1>
            <StatusBadge status={lead.status} />
            <PriorityBadge priority={lead.priority} />
          </div>
          <p className="mt-2 text-sm leading-6 text-white/58">
            {clientName} · створено {formatDate(lead.createdAt)} · оновлено {formatDate(lead.updatedAt)}
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
      </div>
    </header>
  );
}

function LeadDetail({ lead, saved }: { lead: AdminLeadDetails; saved?: string }) {
  const message = savedMessage(saved);

  return (
    <main className="min-h-screen bg-[#17191b] px-4 py-6 text-white md:px-6 lg:px-8">
      <div className="mx-auto max-w-[96rem]">
        <LeadHeader lead={lead} />

        <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.42fr)]">
          <div className="space-y-4">
            {message ? (
              <section className="rounded-[12px] border border-emerald-300/24 bg-emerald-300/10 px-4 py-3 text-sm font-semibold text-emerald-100">
                {message}
              </section>
            ) : null}

            <Panel title="Параметри заявки">
              <QuizPanel lead={lead} />
            </Panel>

            <Panel title="Редагування заявки">
              <LeadEditForm lead={lead} />
            </Panel>

            <Panel title="Нотатка менеджера">
              <AddNoteForm publicId={lead.publicId} />
            </Panel>

            <Panel title="Історія подій">
              <EventsPanel events={lead.events} />
            </Panel>
          </div>

          <aside className="space-y-4">
            <Panel title="Клієнт">
              <div className="grid gap-4">
                <Field label="Ім'я" value={valueOrEmpty(lead.client.name)} />
                <Field label="Компанія" value={valueOrEmpty(lead.client.company)} />
                <Field label="Тип клієнта" value={valueOrEmpty(lead.client.clientType)} />
                <Field label="ID клієнта" value={valueOrEmpty(lead.client.publicId)} />
              </div>
            </Panel>

            <Panel title="Редагування клієнта">
              <ClientEditForm lead={lead} />
            </Panel>

            <Panel title="Контакти">
              <ContactPanel contacts={lead.contacts} />
              <AddContactForm publicId={lead.publicId} />
            </Panel>

            <Panel title="Джерело">
              <div className="grid gap-4">
                <Field label="Канал" value={labelFromMap(channelLabels, lead.initialChannel)} />
                <Field label="CTA" value={valueOrEmpty(lead.sourceCta)} />
                <Field label="Сторінка" value={valueOrEmpty(lead.sourcePage)} />
              </div>
            </Panel>

            <Panel title="Файли">
              <FilesPanel files={lead.files} publicId={lead.publicId} />
            </Panel>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default async function AdminLeadDetailsPage({ params, searchParams }: PageProps) {
  const [{ publicId }, rawSearchParams] = await Promise.all([params, searchParams]);
  const authReason = firstValue(rawSearchParams?.auth);
  const saved = firstValue(rawSearchParams?.saved);

  if (!isAdminConfigured()) {
    return <AdminSetupPanel />;
  }

  if (!(await isAdminAuthenticated())) {
    return <LoginPanel reason={authReason} />;
  }

  const lead = await getAdminLeadDetails(publicId);

  if (!lead) {
    notFound();
  }

  return <LeadDetail lead={lead} saved={saved} />;
}
