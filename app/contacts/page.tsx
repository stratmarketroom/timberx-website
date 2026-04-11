import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const headingClass = "font-['Montserrat',_Arial,_sans-serif] font-bold";
const bodyClass = "font-['Inter',_Arial,_sans-serif]";

const directContacts = [
  {
    label: "Телефон",
    value: "+38 (067) 412 13 10",
    href: "tel:+380674121310",
  },
  {
    label: "Email",
    value: "eko-roof@ukr.net",
    href: "mailto:eko-roof@ukr.net",
  },
] as const;

const locations = [
  {
    title: "Центральний офіс",
    description:
      "Тут ми працюємо над розрахунками в MiTek Pamir, укладаємо договори та готуємо технічну документацію.",
    address: "10001, м. Житомир, проспект Незалежності, 184, офіс 210",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=10001%2C%20%D0%BC.%20%D0%96%D0%B8%D1%82%D0%BE%D0%BC%D0%B8%D1%80%2C%20%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%20%D0%9D%D0%B5%D0%B7%D0%B0%D0%BB%D0%B5%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D1%96%2C%20184%2C%20%D0%BE%D1%84%D1%96%D1%81%20210",
  },
  {
    title: "Виробнича база",
    description:
      "Сучасна лінія автоматизованої нарізки та пресування МЗП-пластин. Можливий візит на виробництво за попередньою домовленістю.",
    address: "09100, Київська область, м. Біла Церква, вул. Павлюченка, 31",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=09100%2C%20%D0%9A%D0%B8%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%B0%20%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%2C%20%D0%BC.%20%D0%91%D1%96%D0%BB%D0%B0%20%D0%A6%D0%B5%D1%80%D0%BA%D0%B2%D0%B0%2C%20%D0%B2%D1%83%D0%BB.%20%D0%9F%D0%B0%D0%B2%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%BA%D0%B0%2C%2031",
  },
] as const;

const workSchedule = [
  { label: "Понеділок — П'ятниця", value: "09:00 – 18:00" },
  { label: "Субота", value: "за попередньою домовленістю (для візитів на виробництво)" },
  { label: "Неділя", value: "вихідний" },
] as const;

export const metadata: Metadata = {
  title: "Контакти TimberX | Виробництво дерев'яних ферм Житомир, Біла Церква",
  description:
    "Контактна інформація компанії TimberX. Офіс у Житомирі, виробництво кроквяних систем у Білій Церкві. Телефонуйте +380674121310 для прорахунку вашого проєкту.",
  keywords: [
    "дерев'яні ферми контакти",
    "кроквяні системи виробництво",
    "TimberX адреса",
    "замовити розрахунок даху ЖК",
    "Біла Церква деревообробка",
  ],
  alternates: {
    canonical: "/contacts/",
  },
};

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(242,153,74,0.14),transparent_34%),linear-gradient(180deg,#1b1d1f_0%,#151719_100%)] text-white">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[88rem] px-4 pb-12 pt-8 md:px-6 md:pb-16 md:pt-10 lg:px-6 lg:pb-20 lg:pt-12">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(28,30,33,0.97))] p-7 shadow-[0_34px_90px_rgba(0,0,0,0.22)] sm:p-9 lg:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.42),rgba(242,153,74,0))]" />
          <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#f2994a]/12 blur-3xl" />

          <div className="relative max-w-4xl">
            <nav className={`${bodyClass} mb-6 flex items-center gap-2 text-sm text-white/58`}>
              <Link href="/" className="transition hover:text-white">
                Головна
              </Link>
              <span>/</span>
              <span className="text-white">Контакти</span>
            </nav>

            <p className="mb-5 inline-flex max-w-full items-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/78 shadow-[0_16px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:text-[11px] sm:tracking-[0.28em]">
              Контакти
            </p>

            <h1 className={`${headingClass} text-[2.1rem] leading-[1.02] text-white sm:text-[2.7rem] md:text-[3.35rem]`}>
              <span>Timber</span>
              <span className="font-bold text-[#F2994A]">X</span>: офіс та виробництво
            </h1>
            <p className={`${bodyClass} mt-5 max-w-3xl text-base leading-8 text-white/78 md:text-lg`}>
              TimberX забезпечує повний цикл реалізації кроквяних систем: від ліцензійного розрахунку
              до доставки готових конструкцій на об&apos;єкт. Зв&apos;яжіться з нами для отримання
              попереднього прорахунку або консультації інженера.
            </p>
          </div>

          <div className="relative mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#202326]/88 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2994a]">
                Прямий зв&apos;язок
              </p>

              <div className="mt-5 space-y-4">
                {directContacts.map((contact) =>
                  contact.label === "Телефон" ? (
                    <div
                      key={contact.label}
                      className={`${bodyClass} flex flex-wrap items-center gap-x-3 gap-y-2 text-base leading-7 text-[#d0d0d0]`}
                    >
                      <span>
                        <span className="font-semibold text-white">{contact.label}:</span>{" "}
                        <a
                          href={contact.href}
                          className="font-medium text-[#f4dfcf] transition hover:text-[#f2994a]"
                        >
                          {contact.value}
                        </a>
                      </span>
                      <div className="flex items-center gap-2">
                        <a
                          href="https://t.me/+380674121310"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Telegram"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#F2994A]/34 bg-[rgba(242,153,74,0.12)] text-[#f4dfcf] transition hover:border-[#F2994A]/58 hover:bg-[#F2994A] hover:text-white"
                        >
                          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
                            <path d="M21.4 4.4a1 1 0 0 0-1-.1L3.3 11.2a1 1 0 0 0 .1 1.9l4.3 1.4 1.6 4.8a1 1 0 0 0 1.8.3l2.4-3.1 4.2 3.1a1 1 0 0 0 1.6-.6l2.4-13.6a1 1 0 0 0-.3-1zM9.6 14.1l7.8-6.1-6.5 7.4-.3 1.9-1-3.2z" />
                          </svg>
                        </a>
                        <a
                          href="viber://chat?number=%2B380674121310"
                          aria-label="Viber"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#F2994A]/34 bg-[rgba(242,153,74,0.12)] text-[#f4dfcf] transition hover:border-[#F2994A]/58 hover:bg-[#F2994A] hover:text-white"
                        >
                          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
                            <path d="M12 2C6.5 2 4 4.1 4 8.8v4.5c0 2.2 1.3 3.8 3.6 4.3v2.6a1 1 0 0 0 1.6.8l3.2-2.4H12c5.5 0 8-2.1 8-6.8V8.8C20 4.1 17.5 2 12 2zm4.4 9.7a.8.8 0 0 1-1.1.3l-1.1-.6c-.4-.2-.9-.2-1.2.2l-.5.5c-.4.4-1.1.5-1.6.2-1-.6-2-1.6-2.6-2.7-.3-.5-.2-1.2.2-1.6l.5-.5c.3-.3.4-.8.2-1.2l-.6-1.1a.8.8 0 0 1 .3-1.1l.5-.3c.4-.2.8-.2 1.1.1l.7.7c.3.3.4.8.3 1.2l-.1.5c0 .2 0 .3.1.5.4.7 1 1.3 1.7 1.7.1.1.3.1.5.1l.5-.1c.4-.1.9 0 1.2.3l.7.7c.3.3.4.7.1 1.1l-.3.5z" />
                          </svg>
                        </a>
                        <a
                          href="https://wa.me/380674121310"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="WhatsApp"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#F2994A]/34 bg-[rgba(242,153,74,0.12)] text-[#f4dfcf] transition hover:border-[#F2994A]/58 hover:bg-[#F2994A] hover:text-white"
                        >
                          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
                            <path d="M12 3a8.9 8.9 0 0 0-7.7 13.4L3 21l4.8-1.3A9 9 0 1 0 12 3zm0 16.2c-1.3 0-2.5-.3-3.6-1l-.3-.2-2.8.8.8-2.7-.2-.3a7.2 7.2 0 1 1 6.1 3.4zm4-5.5c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.6.1l-.4.5c-.2.2-.3.3-.6.2-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.9-.1-.3 0-.4.1-.6l.3-.4c.1-.1.1-.3.2-.4.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.6 4 3.5 2.3.9 2.3.6 2.8.6.4 0 1.3-.5 1.5-1 .2-.5.2-1 .1-1.1z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <p key={contact.label} className={`${bodyClass} text-base leading-7 text-[#d0d0d0]`}>
                      <span className="font-semibold text-white">{contact.label}:</span>{" "}
                      <a
                        href={contact.href}
                        className="font-medium text-[#f4dfcf] transition hover:text-[#f2994a]"
                      >
                        {contact.value}
                      </a>
                    </p>
                  ),
                )}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:+380674121310"
                  className="inline-flex items-center justify-center rounded-[10px] bg-[#F2994A] px-5 py-3 text-center text-base font-semibold text-white shadow-[0_18px_36px_rgba(242,153,74,0.28)] transition hover:-translate-y-0.5 hover:bg-[#de8232]"
                >
                  Зателефонувати
                </a>
                <a
                  href="mailto:eko-roof@ukr.net"
                  className="inline-flex items-center justify-center rounded-[10px] border border-white/18 bg-[rgba(255,255,255,0.04)] px-5 py-3 text-center text-base font-semibold text-white transition hover:border-white/36 hover:bg-white/8"
                >
                  Написати на email
                </a>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-[#202326]/88 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2994a]">
                Графік роботи
              </p>
              <ul className={`${bodyClass} mt-5 space-y-4 text-base leading-7 text-[#d0d0d0]`}>
                {workSchedule.map((item) => (
                  <li key={item.label}>
                    <span className="font-semibold text-white">{item.label}:</span> {item.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10 space-y-10 lg:mt-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2994a]">Наші локації</p>
              <h2 className={`${headingClass} mt-3 text-3xl leading-tight text-white sm:text-4xl`}>
                Офіс та виробництво TimberX
              </h2>
            </div>
            <p className={`${bodyClass} max-w-2xl text-base leading-8 text-[#d0d0d0] lg:justify-self-end`}>
              Ми розділяємо адміністративний і виробничий процеси, щоб забезпечити швидкість
              обробки замовлень та стабільну якість на всіх етапах.
            </p>
          </div>

          <div className="grid gap-8 border-y border-[#f2994a]/18 py-8 lg:grid-cols-2 lg:gap-10 lg:py-10">
            {locations.map((location, locationIndex) => (
              <article key={location.title} className="relative">
                {locationIndex > 0 ? (
                  <div className="absolute -left-5 top-0 hidden h-full w-px bg-[linear-gradient(180deg,rgba(242,153,74,0.08),rgba(242,153,74,0.38),rgba(242,153,74,0.08))] lg:block" />
                ) : null}
                <h3 className={`${headingClass} text-[2rem] leading-tight text-white`}>{location.title}</h3>
                <p className={`${bodyClass} mt-4 text-base leading-8 text-[#d0d0d0]`}>{location.description}</p>
                <p className={`${bodyClass} mt-5 text-base leading-8 text-[#d0d0d0]`}>
                  <span className="font-semibold text-white">Адреса:</span> {location.address}
                </p>
                <a
                  href={location.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-[10px] border border-[#F2994A]/34 bg-[rgba(242,153,74,0.12)] px-5 py-3 text-base font-semibold text-[#f4dfcf] transition hover:border-[#F2994A]/58 hover:bg-[#F2994A] hover:text-white"
                >
                  Відкрити на Google Maps
                </a>
              </article>
            ))}
          </div>
        </section>

        <section
          id="cta"
          className="relative mt-10 overflow-hidden rounded-[2rem] border border-[#f2994a]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(28,30,33,0.97))] p-7 shadow-[0_34px_90px_rgba(0,0,0,0.22)] sm:p-9 lg:mt-12 lg:p-10"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.42),rgba(242,153,74,0))]" />
          <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#f2994a]/12 blur-3xl" />

          <div className="relative">
            <h2 className={`${headingClass} text-2xl text-white sm:text-3xl`}>Бажаєте відвідати виробництво?</h2>
            <p className={`${bodyClass} mt-4 max-w-3xl text-base leading-7 text-[#d0d0d0]`}>
              Зв&apos;яжіться з нами, і ми узгодимо час візиту, щоб ви могли особисто переконатися
              в якості наших конструкцій.
            </p>
            <div className="mt-6">
              <a
                href="tel:+380674121310"
                className="inline-flex items-center justify-center rounded-[10px] bg-[#F2994A] px-6 py-3.5 text-base font-semibold text-white shadow-[0_18px_36px_rgba(242,153,74,0.28)] transition hover:-translate-y-0.5 hover:bg-[#de8232]"
              >
                Зв&apos;язатися
              </a>
            </div>
          </div>
        </section>
      </main>

      <div className="mx-auto w-full max-w-[88rem] px-4 md:px-6 lg:px-6">
        <SiteFooter />
      </div>
    </div>
  );
}
