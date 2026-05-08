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
  deleteFileAction,
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

const acceptedFileExtensions = [
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
  ".heif",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".csv",
  ".dwg",
  ".dxf",
  ".zip",
  ".rar",
  ".txt",
  ".rtf",
].join(",");

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

const currencyLabels: Record<string, string> = {
  UAH: "UA",
  EUR: "€",
  USD: "$",
};

const currencyOptionLabels: Record<string, string> = {
  UAH: "UA - грн",
  EUR: "€ - євро",
  USD: "$ - долар",
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

function formatMoney(amount: number | null, currency: string | null) {
  if (amount === null) {
    return "Не вказано";
  }

  return new Intl.NumberFormat("uk-UA", {
    maximumFractionDigits: 2,
  }).format(amount) + ` ${currencyLabels[currency ?? "UAH"] ?? "UA"}`;
}

function formatAdminActor(value: string | null | undefined) {
  if (!value || value === "manager" || value === "admin") {
    return "Менеджер";
  }

  return value;
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

function uploadErrorMessage(value: string | undefined) {
  switch (value) {
    case "too_large":
      return "Файл завеликий. Зараз можна завантажувати файли до 4 МБ.";
    case "format":
      return "Формат файла не підтримується. Дозволені PDF, зображення, Word, Excel, DWG/DXF, архіви та TXT.";
    case "required":
      return "Оберіть файл для завантаження.";
    case "storage":
      return "Не вдалося зберегти файл у сховище. Перевіримо налаштування Supabase Storage.";
    case "database":
      return "Файл завантажився у сховище, але не вдалося записати його в базу. Перевіримо таблицю lead_files.";
    case "network":
      return "Не вдалося з’єднатися зі сховищем. Спробуйте ще раз за хвилину.";
    case "lead_not_found":
      return "Не знайшла заявку для прикріплення файла. Оновіть сторінку і спробуйте ще раз.";
    case "unknown":
      return "Не вдалося завантажити файл. Спробуйте ще раз або оберіть інший файл.";
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

function contactActionLabel(contact: AdminContact) {
  switch (contact.type) {
    case "phone":
      return "Подзвонити";
    case "telegram":
      return "Telegram";
    case "email":
      return "Email";
    case "viber":
      return "Viber";
    case "whatsapp":
      return "WhatsApp";
    default:
      return contact.type;
  }
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "new"
      ? "border-[#F2994A]/45 bg-[#FFF0DF] text-[#A95815]"
      : status === "won"
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : status === "lost" || status === "spam"
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-[#DDD3C5] bg-white text-[#5F5A54]";

  return (
    <span className={`inline-flex min-h-8 items-center rounded-[8px] border px-2.5 text-xs font-semibold ${tone}`}>
      {labelFromMap(statusLabels, status)}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const tone =
    priority === "hot"
      ? "bg-[#F2994A] text-[#25170B]"
      : priority === "cold"
        ? "border border-[#DDD3C5] bg-white text-[#817970]"
        : "border border-[#F2994A]/35 bg-[#FFF0DF] text-[#A95815]";

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
    <main className="min-h-screen bg-[#F6F1EA] px-4 py-10 text-[#25201A]">
      <section className="mx-auto mt-16 w-full max-w-[28rem] rounded-[12px] border border-[#E1D7C8] bg-white p-6 shadow-[0_20px_70px_rgba(80,62,43,0.12)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F2994A]">
          TimberX Admin
        </p>
        <h1 className="mt-3 text-2xl font-bold">Вхід до заявки</h1>
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
    <section className="rounded-[10px] border border-[#E1D7C8] bg-white">
      <div className="flex min-h-14 items-center justify-between gap-3 border-b border-[#EEE6DC] px-5 py-4">
        <h2 className="text-base font-bold uppercase tracking-[0.14em] text-[#8A8176]">{title}</h2>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8A8176]">{label}</p>
      <div className="mt-1 text-lg font-semibold leading-7 text-[#25201A]">{value}</div>
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
      <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8A8176]">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass =
  "h-14 w-full rounded-[9px] border border-[#D8CFC2] bg-[#FBFAF7] px-4 text-lg font-semibold text-[#25201A] outline-none placeholder:text-[#9A9288] transition focus:border-[#F2994A]/70";
const textareaClass =
  "min-h-32 w-full rounded-[9px] border border-[#D8CFC2] bg-[#FBFAF7] px-4 py-3 text-lg font-semibold leading-7 text-[#25201A] outline-none placeholder:text-[#9A9288] transition focus:border-[#F2994A]/70";
const selectClass =
  "h-14 w-full rounded-[9px] border border-[#D8CFC2] bg-[#FBFAF7] px-4 text-lg font-semibold text-[#25201A] outline-none transition focus:border-[#F2994A]/70";
const submitClass =
  "h-14 rounded-[9px] bg-[#F2994A] px-6 text-lg font-bold text-[#25170B] transition hover:bg-[#de8232]";

function ContactPanel({ contacts }: { contacts: AdminContact[] }) {
  if (!contacts.length) {
    return <p className="text-lg text-[#6F675E]">Контактів поки немає.</p>;
  }

  return (
    <div className="space-y-3">
      {contacts.map((contact) => {
        const href = getContactHref(contact);
        const label = contactActionLabel(contact);
        const content = (
          <>
            <span>{contact.type}</span>
            <span className="text-[#25201A]">{contact.value}</span>
            {contact.isPrimary ? <span className="text-[#A95815]">основний</span> : null}
          </>
        );

        return href ? (
          <a
            key={contact.id}
            href={href}
            className="grid gap-1 rounded-[9px] border border-[#E3DBD0] bg-[#FBFAF7] px-4 py-3 text-lg font-semibold text-[#6F675E] transition hover:border-[#F2994A]/55 hover:text-[#A95815]"
          >
            {content}
            <span className="mt-1 inline-flex w-fit rounded-[8px] border border-[#F2994A]/35 bg-white px-3 py-1 text-sm font-bold text-[#A95815]">
              {label}
            </span>
          </a>
        ) : (
          <div
            key={contact.id}
            className="grid gap-1 rounded-[9px] border border-[#E3DBD0] bg-[#FBFAF7] px-4 py-3 text-lg font-semibold text-[#6F675E]"
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
      <div className="rounded-[10px] border border-[#E3DBD0] bg-[#FBFAF7] p-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#8A8176]">Фінанси</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <FormField label="Сума КП">
            <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_150px]">
              <input
                name="proposalAmount"
                type="number"
                min="0"
                step="0.01"
                defaultValue={lead.proposalAmount ?? ""}
                placeholder="0.00"
                className={inputClass}
              />
              <select name="proposalCurrency" defaultValue={lead.proposalCurrency ?? "UAH"} className={selectClass}>
                {Object.entries(currencyOptionLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </FormField>
          <FormField label="Сума виграної угоди">
            <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_150px]">
              <input
                name="wonAmount"
                type="number"
                min="0"
                step="0.01"
                defaultValue={lead.wonAmount ?? ""}
                placeholder="0.00"
                className={inputClass}
              />
              <select name="wonCurrency" defaultValue={lead.wonCurrency ?? "UAH"} className={selectClass}>
                {Object.entries(currencyOptionLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </FormField>
        </div>
        <div className="mt-4 grid gap-3 text-base font-semibold text-[#6F675E] md:grid-cols-2">
          <p>КП: {formatMoney(lead.proposalAmount, lead.proposalCurrency)}</p>
          <p>Виграна угода: {formatMoney(lead.wonAmount, lead.wonCurrency)}</p>
        </div>
      </div>
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
    <form action={addContactAction} className="mt-4 grid gap-3 border-t border-[#EEE6DC] pt-4">
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
      <label className="flex items-center gap-2 text-lg font-semibold text-[#5F5A54]">
        <input name="isPrimary" type="checkbox" className="h-5 w-5 accent-[#F2994A]" />
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
    <form action={uploadFileAction} className="mt-4 grid gap-3 border-t border-[#EEE6DC] pt-4">
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
          accept={acceptedFileExtensions}
          required
          className="block w-full rounded-[9px] border border-[#D8CFC2] bg-[#FBFAF7] px-3 py-2 text-sm font-semibold text-[#25201A] file:mr-3 file:rounded-[7px] file:border-0 file:bg-[#F2994A] file:px-3 file:py-2 file:text-sm file:font-bold file:text-[#25170B]"
        />
        <p className="mt-2 text-sm font-semibold leading-5 text-[#8A8176]">
          До 4 МБ: PDF, зображення, Word, Excel, DWG/DXF, архіви, TXT.
        </p>
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
        <p className="text-lg text-[#6F675E]">Файлів поки немає.</p>
        <UploadFileForm publicId={publicId} />
      </>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {files.map((file) => (
          <div key={file.id} className="rounded-[9px] border border-[#E3DBD0] bg-[#FBFAF7] px-4 py-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-lg font-bold text-[#25201A]">{file.fileName}</p>
                <p className="mt-1 text-base leading-6 text-[#6F675E]">
                  {labelFromMap(fileCategoryLabels, file.fileCategory)} · {formatFileSize(file.fileSize)}
                </p>
              </div>
              <span className="rounded-[7px] border border-[#E3DBD0] bg-white px-2 py-1 text-sm font-semibold text-[#6F675E]">
                {formatAdminActor(file.uploadedBy)}
              </span>
            </div>
            <p className="mt-3 break-words text-xs leading-5 text-[#8A8176]">
              {file.storageBucket}/{file.storagePath}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[#8A8176]">{formatDate(file.createdAt)}</p>
              <div className="flex flex-wrap gap-2">
                {file.signedUrl ? (
                  <a
                    href={file.signedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center justify-center rounded-[8px] border border-[#F2994A]/40 bg-white px-4 text-sm font-bold text-[#A95815] transition hover:bg-[#F2994A] hover:text-[#25170B]"
                  >
                    Відкрити
                  </a>
                ) : null}
                <form action={deleteFileAction}>
                  <input type="hidden" name="publicId" value={publicId} />
                  <input type="hidden" name="fileId" value={file.id} />
                  <button
                    type="submit"
                    className="h-10 rounded-[8px] border border-red-200 bg-red-50 px-4 text-sm font-bold text-red-700 transition hover:bg-red-100"
                  >
                    Видалити
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
      <UploadFileForm publicId={publicId} />
    </>
  );
}

function getEventTitle(event: AdminLeadEvent) {
  switch (event.type) {
    case "manual_lead_created":
      return "Заявку створено вручну";
    case "quiz_submitted":
      return "Клієнт заповнив квіз";
    case "messenger_opened":
      return "Клієнт відкрив Telegram";
    case "lead_updated":
      return "Оновлено заявку";
    case "client_updated":
      return "Оновлено клієнта";
    case "contact_added":
      return "Додано контакт";
    case "file_uploaded":
      return "Додано файл";
    case "manager_note":
      return "Додано нотатку";
    default:
      return "Активність по заявці";
  }
}

function getManagerNotes(events: AdminLeadEvent[]) {
  return events
    .filter((event) => event.type === "manager_note")
    .map((event) => ({
      id: event.id,
      createdAt: event.createdAt,
      text: typeof event.metadata.text === "string" ? event.metadata.text : "",
      actor: typeof event.metadata.actor === "string" ? event.metadata.actor : null,
    }))
    .filter((note) => note.text);
}

function ManagerNotesPanel({ events, publicId }: { events: AdminLeadEvent[]; publicId: string }) {
  const notes = getManagerNotes(events);

  return (
    <div className="grid gap-4">
      <AddNoteForm publicId={publicId} />
      {notes.length ? (
        <div className="space-y-3 border-t border-[#EEE6DC] pt-4">
          {notes.map((note) => (
            <article key={note.id} className="rounded-[9px] border border-[#E3DBD0] bg-[#FBFAF7] px-4 py-4">
              <p className="whitespace-pre-wrap text-lg font-semibold leading-8 text-[#25201A]">{note.text}</p>
              <p className="mt-2 text-base font-semibold text-[#8A8176]">
                {formatAdminActor(note.actor)} · {formatDate(note.createdAt)}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="border-t border-[#EEE6DC] pt-4 text-lg text-[#6F675E]">
          Нотаток поки немає. Тут варто фіксувати домовленості, наступний крок і важливий контекст.
        </p>
      )}
    </div>
  );
}

function SourcePanel({ lead }: { lead: AdminLeadDetails }) {
  return (
    <details className="group">
      <summary className="cursor-pointer list-none text-lg font-bold text-[#A95815] transition hover:text-[#F2994A]">
        Показати джерело
      </summary>
      <div className="mt-4 grid gap-4">
        <Field label="Канал" value={labelFromMap(channelLabels, lead.initialChannel)} />
        <Field label="CTA" value={valueOrEmpty(lead.sourceCta)} />
        <Field label="Сторінка" value={valueOrEmpty(lead.sourcePage)} />
      </div>
    </details>
  );
}

function EventsPanel({ events }: { events: AdminLeadEvent[] }) {
  if (!events.length) {
    return <p className="text-lg text-[#6F675E]">Активності поки немає.</p>;
  }

  return (
    <details className="group">
      <summary className="cursor-pointer list-none text-lg font-bold text-[#A95815] transition hover:text-[#F2994A]">
        Показати активність ({events.length})
      </summary>
      <div className="mt-4 space-y-2">
        {events.map((event) => (
          <article key={event.id} className="rounded-[9px] border border-[#E3DBD0] bg-[#FBFAF7] px-4 py-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-lg font-bold text-[#25201A]">{getEventTitle(event)}</p>
                <p className="mt-1 text-base text-[#8A8176]">
                  {labelFromMap(channelLabels, event.channel)} · {formatDate(event.createdAt)}
                </p>
                {typeof event.metadata.actor === "string" ? (
                  <p className="mt-1 text-sm font-semibold text-[#8A8176]">
                    {formatAdminActor(event.metadata.actor)}
                  </p>
                ) : null}
              </div>
              {event.sourceCta ? (
                <span className="rounded-[7px] border border-[#E3DBD0] bg-white px-2 py-1 text-sm font-semibold text-[#6F675E]">
                  {event.sourceCta}
                </span>
              ) : null}
            </div>
            {event.sourcePage ? (
              <p className="mt-2 break-words text-base leading-6 text-[#6F675E]">{event.sourcePage}</p>
            ) : null}
          </article>
        ))}
      </div>
    </details>
  );
}

function LeadHeader({ lead }: { lead: AdminLeadDetails }) {
  const clientName = lead.client.company ?? lead.client.name ?? "Клієнт без імені";

  return (
    <header className="border-b border-[#E1D7C8] pb-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link href="/admin/leads" className="text-base font-semibold text-[#6F675E] transition hover:text-[#A95815]">
            ← До списку заявок
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold tracking-normal text-[#25201A]">{lead.publicId}</h1>
            <StatusBadge status={lead.status} />
            <PriorityBadge priority={lead.priority} />
          </div>
          <p className="mt-2 text-lg leading-8 text-[#6F675E]">
            {clientName} · створено {formatDate(lead.createdAt)} · оновлено {formatDate(lead.updatedAt)}
          </p>
        </div>
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
  );
}

function LeadDetail({ lead, saved, uploadError }: { lead: AdminLeadDetails; saved?: string; uploadError?: string }) {
  const message = savedMessage(saved);
  const errorMessage = uploadErrorMessage(uploadError);

  return (
    <main className="min-h-screen bg-[#F6F1EA] px-4 py-6 text-[#25201A] md:px-6 lg:px-8">
      <div className="mx-auto max-w-[96rem]">
        <LeadHeader lead={lead} />

        <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(380px,0.38fr)]">
          <div className="space-y-4">
            {message ? (
              <section className="rounded-[10px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-base font-semibold text-emerald-700">
                {message}
              </section>
            ) : null}
            {errorMessage ? (
              <section className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-base font-semibold text-red-700">
                {errorMessage}
              </section>
            ) : null}

            <Panel title="Заявка">
              <LeadEditForm lead={lead} />
            </Panel>

            <Panel title="Дані з квізу">
              <QuizPanel lead={lead} />
            </Panel>

            <Panel title="Нотатки менеджера">
              <ManagerNotesPanel events={lead.events} publicId={lead.publicId} />
            </Panel>

            <Panel title="Файли">
              <FilesPanel files={lead.files} publicId={lead.publicId} />
            </Panel>
          </div>

          <aside className="space-y-4">
            <Panel title="Клієнт">
              <ClientEditForm lead={lead} />
            </Panel>

            <Panel title="Контакти">
              <ContactPanel contacts={lead.contacts} />
              <AddContactForm publicId={lead.publicId} />
            </Panel>

            <Panel title="Джерело">
              <SourcePanel lead={lead} />
            </Panel>

            <Panel title="Активність">
              <EventsPanel events={lead.events} />
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
  const uploadError = firstValue(rawSearchParams?.uploadError);

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

  return <LeadDetail lead={lead} saved={saved} uploadError={uploadError} />;
}
