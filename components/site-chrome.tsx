import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Продукти", href: "/#products" },
  { label: "Рішення", href: "/#solutions" },
  { label: "Кейси", href: "/cases/" },
  { label: "Виробництво", href: "/technologies/" },
  { label: "Контакти", href: "/contacts/" },
];
const productMenuItems = [
  { label: "Модульні будинки", href: "/modulni-budynky/" },
  { label: "Клеєні конструкції", href: "/kleyeni-konstruktsii/" },
  { label: "Ферми МЗП", href: "/derevyani-fermy-mzp/" },
  { label: "Каркасно-панельні будинки", href: "/karkasno-panelni-budynky/" },
  { label: "Санітарні модулі", href: "/sanitarni-moduli/" },
  { label: "Фахверкові будинки", href: "/fakhverkovi-budynky/" },
];
const solutionMenuItems = [
  { label: "Для девелоперів", href: "/modulni-budynky/dlya-developeriv/" },
  { label: "Для забудовників", href: "/modulni-budynky/dlya-zhk/" },
  { label: "Для генпідрядників", href: "/kleyeni-konstruktsii/dlya-genpidriadnykiv/" },
  { label: "Для громад (B2G)", href: "/modulni-budynky/dlya-gromad/" },
];

const footerProductPages = [
  { label: "Модульні будинки", href: "/modulni-budynky/" },
  { label: "Клеєні конструкції", href: "/kleyeni-konstruktsii/" },
  { label: "Ферми МЗП", href: "/derevyani-fermy-mzp/" },
  { label: "Каркасно-панельні будинки", href: "/karkasno-panelni-budynky/" },
  { label: "Санітарні модулі", href: "/sanitarni-moduli/" },
  { label: "Фахверкові будинки", href: "/fakhverkovi-budynky/" },
];
const footerSolutionPages = [
  { label: "Для девелоперів", href: "/modulni-budynky/dlya-developeriv/" },
  { label: "Для забудовників", href: "/modulni-budynky/dlya-zhk/" },
  { label: "Для генпідрядників", href: "/kleyeni-konstruktsii/dlya-genpidriadnykiv/" },
  { label: "Для громад (B2G)", href: "/modulni-budynky/dlya-gromad/" },
];

const footerServicePages = [
  { label: "Кейси", href: "/cases/" },
  { label: "Виробництво", href: "/technologies/" },
  { label: "Про компанію", href: "/about/" },
  { label: "Контакти", href: "/contacts/" },
];

export function SiteHeader() {
  return (
    <header className="relative z-20 pt-4 md:pt-5">
      <div className="w-full px-4 md:px-6 lg:px-6">
        <div className="mx-auto max-w-[88rem]">
          <div className="flex items-center justify-between gap-4 rounded-[20px] border border-white/12 bg-[rgba(18,19,21,0.72)] px-3 py-3.5 shadow-[0_28px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:px-4 sm:py-4 lg:gap-5 lg:px-5">
            <Link href="/" className="flex min-w-0 items-center">
              <Image
                src="/images/logo/logo-manual-updated.png"
                alt="TimberX"
                priority
                width={2000}
                height={2000}
                className="h-14 w-auto shrink-0 object-contain sm:h-16 lg:h-[4.4rem]"
              />
            </Link>

            <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/6 p-2.5 text-[15px] text-white/86 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] lg:flex">
              {navItems.map((item) => (
                <div key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    className="inline-flex rounded-full border border-transparent px-5 py-2.5 font-medium transition duration-200 hover:-translate-y-0.5 hover:border-[#F2994A]/35 hover:bg-white/10 hover:text-[#F2994A]"
                  >
                    {item.label}
                  </Link>
                  {item.label === "Продукти" || item.label === "Рішення" ? (
                    <div className="pointer-events-none absolute left-0 top-[calc(100%+0.6rem)] z-30 min-w-[18rem] translate-y-1 rounded-[14px] border border-white/12 bg-[rgba(18,19,21,0.96)] p-2 opacity-0 shadow-[0_24px_64px_rgba(0,0,0,0.38)] backdrop-blur-xl transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <div className="flex flex-col gap-1">
                        {(item.label === "Продукти" ? productMenuItems : solutionMenuItems).map(
                          (subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="rounded-[10px] border border-transparent px-3 py-2 text-sm text-white/86 transition hover:border-[#F2994A]/28 hover:bg-white/6 hover:text-[#F2994A]"
                            >
                              {subItem.label}
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>

            <Link
              href="#cta"
              className="hidden items-center justify-center rounded-[12px] border border-[#F2994A]/40 bg-[#F2994A] px-6 py-3.5 text-base font-semibold text-white shadow-[0_16px_32px_rgba(242,153,74,0.28)] transition hover:-translate-y-0.5 hover:bg-[#de8232] hover:shadow-[0_20px_40px_rgba(242,153,74,0.34)] sm:inline-flex"
            >
              Отримати прорахунок
            </Link>

            <details className="relative lg:hidden">
              <summary className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-[14px] border border-white/12 bg-white/6 text-white/90 shadow-[0_18px_40px_rgba(0,0,0,0.22)] transition hover:border-[#F2994A]/32 hover:text-[#F2994A] [&::-webkit-details-marker]:hidden">
                <span className="sr-only">Відкрити меню</span>
                <span className="flex flex-col gap-1.5">
                  <span className="h-0.5 w-5 rounded-full bg-current" />
                  <span className="h-0.5 w-5 rounded-full bg-current" />
                  <span className="h-0.5 w-5 rounded-full bg-current" />
                </span>
              </summary>

              <div className="absolute right-0 top-[calc(100%+0.85rem)] z-30 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-[20px] border border-white/12 bg-[rgba(18,19,21,0.94)] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="rounded-[12px] border border-transparent px-4 py-3 text-sm font-medium text-white/88 transition hover:border-[#F2994A]/28 hover:bg-white/6 hover:text-[#F2994A]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-4 border-t border-white/10 pt-4">
                  <Link
                    href="#cta"
                    className="inline-flex w-full items-center justify-center rounded-[12px] border border-[#F2994A]/40 bg-[#F2994A] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(242,153,74,0.24)] transition hover:bg-[#de8232]"
                  >
                    Отримати прорахунок
                  </Link>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 pt-10 pb-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(220px,0.78fr)_minmax(700px,1.22fr)_minmax(420px,1.08fr)] lg:items-start">
        <div className="space-y-4 lg:-mt-4">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/images/logo/logo-manual-updated.png"
              alt="TimberX"
              width={188}
              height={188}
              className="h-24 w-auto object-contain"
              priority
            />
          </Link>
          <p className="max-w-[17.5rem] text-[1.03rem] leading-8 text-white/66">
            TimberX — інженерні дерев&apos;яні конструкції, модульні будинки та
            заводське виробництво для B2B і B2G проєктів.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-[54rem] gap-10 sm:grid-cols-3 lg:justify-self-center">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F2994A]">
              Продукти
            </p>
            <div className="flex flex-col gap-2">
              {footerProductPages.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[1.03rem] leading-8 font-medium text-white/74 transition hover:text-[#F2994A]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F2994A]">
              Рішення
            </p>
            <div className="flex flex-col gap-2">
              {footerSolutionPages.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[1.03rem] leading-8 font-medium text-white/74 transition hover:text-[#F2994A]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F2994A]">
              Меню
            </p>
            <div className="flex flex-col gap-2">
              {footerServicePages.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[1.03rem] leading-8 font-medium text-white/74 transition hover:text-[#F2994A]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:w-full lg:max-w-[30rem] lg:justify-self-end lg:border-l lg:border-white/10 lg:pl-10 lg:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F2994A]">
            Контакти
          </p>
          <div className="flex max-w-[30rem] flex-col gap-3 text-[1.03rem] leading-8 text-white/70 lg:items-start">
            <p>
              <span className="font-medium text-white/88">Телефон:</span>{" "}
              <a href="tel:+380674121310" className="font-medium transition hover:text-[#F2994A]">
                +380674121310
              </a>
            </p>
            <p>
              <span className="font-medium text-white/88">Email:</span>{" "}
              <a href="mailto:eko-roof@ukr.net" className="font-medium transition hover:text-[#F2994A]">
                eko-roof@ukr.net
              </a>
            </p>
            <p>
              <span className="font-medium text-white/88">Офіс:</span> 10001, м. Житомир, проспект
              Незалежності, 184, офіс 210
            </p>
            <p>
              <span className="font-medium text-white/88">Виробництво:</span> 09100, Київська область,
              Білоцерківський район, м. Біла Церква, вул. Павлюченка, 31
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-white/8 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 TimberX. Всі права захищені.</p>
        <div className="flex flex-col items-start gap-2 text-left sm:items-end sm:text-right">
          <p>
            Сайт розроблений{" "}
            <a
              href="https://nobel-itbs.eu"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#F2994A]"
            >
              Nobel ITBS s.r.o.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
