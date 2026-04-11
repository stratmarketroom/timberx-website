import Image from "next/image";
import Link from "next/link";

type StandardQuizCtaProps = {
  id?: string;
  className?: string;
};

export function StandardQuizCta({ id = "cta", className = "" }: StandardQuizCtaProps) {
  return (
    <section id={id} className={className}>
      <div className="relative overflow-hidden rounded-[30px] border border-[#F2994A]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(28,30,33,0.97))] p-8 shadow-[0_34px_90px_rgba(0,0,0,0.24)] md:p-10 lg:p-12">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-75"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(242,153,74,0.14), transparent 30%), linear-gradient(180deg, rgba(242,153,74,0.05) 0%, transparent 18%, rgba(255,255,255,0.025) 100%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0.0),rgba(242,153,74,0.42),rgba(242,153,74,0.0))]" />

        <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#F2994A]">
              Розрахунок вартості проєкту
            </p>
            <h2 className="font-['Montserrat',_Arial,_sans-serif] text-3xl leading-tight text-white md:text-4xl">
              Отримайте попередній прорахунок вашого проєкту
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
              Дайте відповіді на 6 коротких питань і ми підготуємо релевантне
              рішення, строки реалізації та попередній прорахунок для вашого
              проєкту.
            </p>

            <ul className="mt-8 space-y-4 text-lg leading-8 text-white/82">
              <li className="flex gap-3">
                <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                <span>6 коротких питань без зайвих дзвінків на старті</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                <span>релевантне рішення під тип вашого проєкту</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#F2994A]" />
                <span>попередній прорахунок і розуміння строків реалізації</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href="#"
                className="inline-flex w-full items-center justify-center rounded bg-[#F2994A] px-6 py-4 text-base font-semibold text-[#1B1D1F] transition hover:bg-[#de8232] sm:w-auto"
              >
                Почати прорахунок
              </Link>
              <Link
                href="#"
                className="inline-flex w-full items-center justify-center rounded border border-white/20 px-6 py-4 text-center text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/5 sm:w-auto"
              >
                <span>
                  Завантажити каталог Timber
                  <span className="text-[#F2994A]">X</span>
                  {" "}виробництва
                </span>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[34rem] lg:justify-self-end">
            <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle,rgba(242,153,74,0.14)_0%,rgba(242,153,74,0.06)_28%,transparent_68%)] blur-[24px]" />
            <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-3 shadow-[0_32px_80px_rgba(0,0,0,0.28)]">
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(242,153,74,0),rgba(242,153,74,0.46),rgba(242,153,74,0))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,153,74,0.1),transparent_28%)]" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[#ECE6DA]">
                <Image
                  src="/images/cta/timberx-estimate-preview.png"
                  alt="Приклад попереднього прорахунку TimberX для девелоперського або модульного проєкту"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 420px, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
