import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Сторінку не знайдено | TimberX",
  robots: {
    index: false,
    follow: false,
  },
};

const productLinks = [
  { label: "Модульні будинки", href: "/modulni-budynky/" },
  { label: "Клеєні конструкції", href: "/kleyeni-konstruktsii/" },
  { label: "Ферми з МЗП", href: "/derevyani-fermy-mzp/" },
  { label: "Каркасно-модульні будинки", href: "/karkasno-panelni-budynky/" },
  { label: "Санітарно-технічні модулі", href: "/sanitarni-moduli/" },
  { label: "Фахверкові будинки", href: "/fakhverkovi-budynky/" },
];

const quickLinks = [
  { label: "На головну", href: "/" },
  { label: "Проєкти", href: "/proekty/" },
  { label: "Кейси", href: "/cases/" },
  { label: "Контакти", href: "/contacts/" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#151719] text-white">
      <div className="relative min-h-screen overflow-hidden">
        <Image
          src="/images/hero/hero-factory.jpg"
          alt="Виробництво TimberX"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-28"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,23,25,0.62)_0%,rgba(21,23,25,0.86)_44%,#151719_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(242,153,74,0.24),transparent_28%)]" />

        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader />

          <main className="mx-auto flex w-full max-w-[88rem] flex-1 items-center px-4 py-12 md:px-6 lg:px-6">
            <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:items-end">
              <section className="max-w-4xl">
                <p className="font-['Inter',_Arial,_sans-serif] text-xs font-semibold uppercase tracking-[0.28em] text-[#F2994A]">
                  Помилка 404
                </p>
                <h1 className="mt-5 font-['Montserrat',_Arial,_sans-serif] text-[4.8rem] font-bold leading-[0.9] tracking-normal text-white sm:text-[7rem] lg:text-[9rem]">
                  404
                </h1>
                <p className="mt-6 max-w-3xl font-['Montserrat',_Arial,_sans-serif] text-4xl font-bold leading-[1.04] text-white sm:text-5xl lg:text-6xl">
                  Сторінку не знайдено
                </p>
                <p className="mt-6 max-w-2xl font-['Inter',_Arial,_sans-serif] text-lg leading-8 text-white/78">
                  Можливо, адреса змінилась або сторінку ще не створено. Оберіть потрібний розділ, і ми
                  повернемо вас до робочого маршруту.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  {quickLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`inline-flex min-h-12 items-center justify-center rounded-[14px] px-5 font-['Inter',_Arial,_sans-serif] text-base font-bold transition ${
                        index === 0
                          ? "bg-[#F2994A] text-[#1A120B] hover:bg-[#ffad63]"
                          : "border border-white/14 bg-white/8 text-white hover:border-[#F2994A]/60 hover:text-[#F2994A]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>

              <aside className="rounded-[24px] border border-white/12 bg-[rgba(24,27,29,0.88)] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-6">
                <p className="font-['Inter',_Arial,_sans-serif] text-xs font-semibold uppercase tracking-[0.24em] text-white/54">
                  Швидкий перехід
                </p>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {productLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="min-h-16 rounded-[14px] border border-white/10 bg-white/6 px-4 py-3 font-['Inter',_Arial,_sans-serif] text-sm font-semibold leading-5 text-white/86 transition hover:border-[#F2994A]/55 hover:bg-[#F2994A]/10 hover:text-[#F2994A]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[88rem] px-4 md:px-6 lg:px-6">
        <SiteFooter />
      </div>
    </div>
  );
}
