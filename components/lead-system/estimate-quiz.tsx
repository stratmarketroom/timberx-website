"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";

const productOptions = [
  "Модульні будинки",
  "Клеєні конструкції",
  "Ферми МЗП",
  "Каркасно-панельні будинки",
  "Санітарні модулі",
  "Ще не визначено",
];

const projectTypeOptions = [
  "Девелоперський проєкт",
  "ЖК або котеджне містечко",
  "Громада / B2G",
  "Комерційний об'єкт",
  "Приватний будинок",
  "Інше",
];

const scaleOptions = [
  "1 об'єкт",
  "2-5 об'єктів",
  "Серія / партія",
  "Потрібна консультація",
];

const timelineOptions = [
  "Терміново",
  "1-3 місяці",
  "3-6 місяців",
  "Плануємо заздалегідь",
];

type LeadResponse = {
  ok: boolean;
  error?: string;
  leadPublicId?: string;
};

function OptionGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/56">
        {label}
      </legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = option === value;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`min-h-11 rounded-[10px] border px-3 py-2 text-left text-sm font-semibold leading-5 transition ${
                isSelected
                  ? "border-[#F2994A] bg-[#F2994A] text-[#1B1D1F]"
                  : "border-white/12 bg-white/[0.045] text-white/78 hover:border-[#F2994A]/48 hover:bg-white/[0.075] hover:text-white"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function EstimateQuiz() {
  const [productInterest, setProductInterest] = useState(productOptions[0]);
  const [projectType, setProjectType] = useState(projectTypeOptions[0]);
  const [scale, setScale] = useState(scaleOptions[0]);
  const [timeline, setTimeline] = useState(timelineOptions[1]);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [contactType, setContactType] = useState("phone");
  const [contactValue, setContactValue] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [leadPublicId, setLeadPublicId] = useState("");

  const telegramHref = useMemo(() => {
    const payload = leadPublicId || "estimate_quiz";
    return `https://t.me/TimberXAssistantBot?start=${encodeURIComponent(payload)}`;
  }, [leadPublicId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          contactType,
          contactValue,
          productInterest,
          projectType,
          scale,
          location,
          timeline,
          sourcePage: window.location.pathname,
          sourceCta: "estimate_quiz",
        }),
      });

      const result = (await response.json()) as LeadResponse;

      if (!response.ok || !result.ok || !result.leadPublicId) {
        throw new Error(result.error || "Не вдалося створити заявку");
      }

      setLeadPublicId(result.leadPublicId);
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Не вдалося створити заявку. Спробуйте ще раз.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[22px] border border-[#F2994A]/28 bg-[#F2994A]/10 p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F2994A]">
          Заявка створена
        </p>
        <h3 className="mt-4 font-['Montserrat',_Arial,_sans-serif] text-2xl font-bold leading-tight text-white">
          Код заявки: {leadPublicId}
        </h3>
        <p className="mt-4 text-sm leading-7 text-white/76">
          Перейдіть у Telegram, бот одразу передасть менеджеру код заявки та
          прив&apos;яже чат до клієнта в базі.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href={telegramHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-[#F2994A] px-5 py-3 text-sm font-bold text-[#1B1D1F] transition hover:bg-[#de8232]"
          >
            Продовжити в Telegram
          </a>
          <a
            href="viber://chat?number=%2B380674121310"
            className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-white/18 px-5 py-3 text-sm font-bold text-white transition hover:border-[#F2994A]/48 hover:bg-white/[0.06]"
          >
            Написати у Viber
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <OptionGroup
        label="Що потрібно"
        value={productInterest}
        options={productOptions}
        onChange={setProductInterest}
      />
      <OptionGroup
        label="Тип проєкту"
        value={projectType}
        options={projectTypeOptions}
        onChange={setProjectType}
      />
      <OptionGroup
        label="Масштаб"
        value={scale}
        options={scaleOptions}
        onChange={setScale}
      />
      <OptionGroup
        label="Строк"
        value={timeline}
        options={timelineOptions}
        onChange={setTimeline}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/56">
            Локація
          </span>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Місто або область"
            className="mt-3 h-12 w-full rounded-[10px] border border-white/12 bg-white/[0.055] px-4 text-sm font-semibold text-white outline-none transition placeholder:text-white/34 focus:border-[#F2994A]/58"
          />
        </label>
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/56">
            Ім&apos;я
          </span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Як до вас звертатися"
            className="mt-3 h-12 w-full rounded-[10px] border border-white/12 bg-white/[0.055] px-4 text-sm font-semibold text-white outline-none transition placeholder:text-white/34 focus:border-[#F2994A]/58"
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-[0.72fr_1.28fr]">
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/56">
            Контакт
          </span>
          <select
            value={contactType}
            onChange={(event) => setContactType(event.target.value)}
            className="mt-3 h-12 w-full rounded-[10px] border border-white/12 bg-[#26292b] px-4 text-sm font-semibold text-white outline-none transition focus:border-[#F2994A]/58"
          >
            <option value="phone">Телефон</option>
            <option value="email">Email</option>
            <option value="viber">Viber</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </label>
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/56">
            Значення контакту
          </span>
          <input
            value={contactValue}
            onChange={(event) => setContactValue(event.target.value)}
            required
            placeholder="+380..."
            className="mt-3 h-12 w-full rounded-[10px] border border-white/12 bg-white/[0.055] px-4 text-sm font-semibold text-white outline-none transition placeholder:text-white/34 focus:border-[#F2994A]/58"
          />
        </label>
      </div>

      {status === "error" ? (
        <p className="rounded-[10px] border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm leading-6 text-red-100">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-[10px] bg-[#F2994A] px-6 py-4 text-base font-bold text-[#1B1D1F] transition hover:bg-[#de8232] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Створюємо заявку..." : "Створити заявку і перейти в месенджер"}
      </button>
    </form>
  );
}
