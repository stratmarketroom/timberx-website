import type { Metadata } from "next";
import { absoluteUrl } from "./seo-config";

export type SeoPageStatus = "indexable" | "noindex" | "draft/placeholder" | "deprecated";

export type SeoPageSection =
  | "home"
  | "core"
  | "segment"
  | "cases"
  | "projects"
  | "geo"
  | "faq"
  | "guide"
  | "service";

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  section: SeoPageSection;
  cluster: string;
  status: SeoPageStatus;
  priority: number;
};

const noindexFollowRobots = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
  },
} satisfies Metadata["robots"];

const noindexNofollowRobots = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
} satisfies Metadata["robots"];

export const seoPages: SeoPage[] = [
  {
    path: "/",
    title: "TimberX",
    description:
      "TimberX — виробництво модульних будинків, клеєних конструкцій і ферм з металозубчатими пластинами для B2B та B2G проєктів.",
    section: "home",
    cluster: "Головна",
    status: "indexable",
    priority: 1,
  },
  {
    path: "/modulni-budynky/",
    title: "Модульні будинки",
    description:
      "Продуктова сторінка для модульних будинків TimberX з B2B- та B2G-фокусом.",
    section: "core",
    cluster: "Модульні будинки",
    status: "indexable",
    priority: 1,
  },
  {
    path: "/derevyani-fermy-mzp/",
    title: "Ферми з металозубчатими пластинами",
    description:
      "Продуктова сторінка для дерев'яних ферм з металозубчатими пластинами TimberX з акцентом на швидкий монтаж.",
    section: "core",
    cluster: "Ферми з металозубчатими пластинами",
    status: "indexable",
    priority: 1,
  },
  {
    path: "/karkasno-panelni-budynky/",
    title: "Каркасно-модульні будинки",
    description:
      "Продуктова сторінка для каркасно-модульних будинків TimberX.",
    section: "core",
    cluster: "Каркасно-модульні будинки",
    status: "noindex",
    priority: 2,
  },
  {
    path: "/kleyeni-konstruktsii/",
    title: "Клеєні конструкції",
    description:
      "Продуктова сторінка для клеєних конструкцій TimberX і складних інженерних проєктів.",
    section: "core",
    cluster: "Клеєні конструкції",
    status: "noindex",
    priority: 2,
  },
  {
    path: "/sanitarni-moduli/",
    title: "Санітарно-технічні модулі",
    description:
      "Продуктова сторінка для санітарно-технічних модулів TimberX для житлових і соціальних об'єктів.",
    section: "core",
    cluster: "Санітарно-технічні модулі",
    status: "noindex",
    priority: 2,
  },
  {
    path: "/fakhverkovi-budynky/",
    title: "Фахверкові будинки",
    description:
      "Продуктова сторінка для фахверкових будинків TimberX.",
    section: "core",
    cluster: "Фахверкові будинки",
    status: "noindex",
    priority: 2,
  },
  {
    path: "/modulni-budynky/dlya-gromad/",
    title: "Модульні будинки для громад",
    description:
      "Сегментна сторінка для громад і B2G-проєктів на базі модульних рішень TimberX.",
    section: "segment",
    cluster: "Модульні будинки / Громади",
    status: "indexable",
    priority: 1,
  },
  {
    path: "/modulni-budynky/dlya-developeriv/",
    title: "Модульні будинки для девелоперів",
    description:
      "Сегментна сторінка для девелоперів, які шукають модульні рішення TimberX.",
    section: "segment",
    cluster: "Модульні будинки / Девелопери",
    status: "noindex",
    priority: 3,
  },
  {
    path: "/modulni-budynky/dlya-zhk/",
    title: "Модульні будинки для ЖК",
    description:
      "Сегментна сторінка для житлових комплексів і серійної забудови на базі TimberX.",
    section: "segment",
    cluster: "Модульні будинки / ЖК",
    status: "noindex",
    priority: 3,
  },
  {
    path: "/kleyeni-konstruktsii/dlya-genpidriadnykiv/",
    title: "Клеєні конструкції для генпідрядників",
    description:
      "Сегментна сторінка для генпідрядників, які працюють зі складними інженерними конструкціями.",
    section: "segment",
    cluster: "Клеєні конструкції / Генпідрядники",
    status: "noindex",
    priority: 3,
  },
  {
    path: "/kleyeni-konstruktsii/dlya-biznesu/",
    title: "Клеєні конструкції для бізнесу",
    description:
      "Сегментна сторінка для комерційних і виробничих об'єктів на основі клеєних конструкцій.",
    section: "segment",
    cluster: "Клеєні конструкції / Бізнес",
    status: "draft/placeholder",
    priority: 4,
  },
  {
    path: "/derevyani-fermy-mzp/dlya-zhk/",
    title: "Ферми з металозубчатими пластинами для ЖК",
    description:
      "Сегментна сторінка для житлових комплексів, де потрібні ферми з металозубчатими пластинами TimberX.",
    section: "segment",
    cluster: "Ферми з металозубчатими пластинами / ЖК",
    status: "draft/placeholder",
    priority: 4,
  },
  {
    path: "/sanitarni-moduli/dlya-gromad/",
    title: "Санітарно-технічні модулі для громад",
    description:
      "Сегментна сторінка для громад, які потребують швидкого запуску санітарної інфраструктури.",
    section: "segment",
    cluster: "Санітарно-технічні модулі / Громади",
    status: "draft/placeholder",
    priority: 4,
  },
  {
    path: "/cases/",
    title: "Кейси TimberX",
    description:
      "Єдина сторінка кейсів TimberX на поточному етапі SEO-архітектури.",
    section: "cases",
    cluster: "Кейси",
    status: "indexable",
    priority: 2,
  },
  {
    path: "/proekty/",
    title: "Типові проєкти TimberX",
    description:
      "Окремий SEO-кластер типових проєктів TimberX для будинків і модулів.",
    section: "projects",
    cluster: "Типові проєкти TimberX",
    status: "indexable",
    priority: 2,
  },
  {
    path: "/modulni-budynky/proekty/",
    title: "Типові проєкти модульних будинків",
    description:
      "Підкластер типових модульних проєктів TimberX.",
    section: "projects",
    cluster: "Модульні будинки / Типові проєкти",
    status: "indexable",
    priority: 2,
  },
  {
    path: "/modulni-budynky/proekty/modulnyi-budynok-25m/",
    title: "Skaut 25",
    description: "Готовий типовий модульний проєкт TimberX.",
    section: "projects",
    cluster: "Модульні будинки / Типові проєкти / Skaut 25",
    status: "indexable",
    priority: 2,
  },
  {
    path: "/modulni-budynky/proekty/skaut-50/",
    title: "Skaut 50",
    description: "Готовий типовий модульний проєкт TimberX.",
    section: "projects",
    cluster: "Модульні будинки / Типові проєкти / Skaut 50",
    status: "indexable",
    priority: 2,
  },
  {
    path: "/modulni-budynky/proekty/modulnyi-budynok-35m/",
    title: "Skaut 35",
    description: "Готовий типовий модульний проєкт TimberX.",
    section: "projects",
    cluster: "Модульні будинки / Типові проєкти / Skaut 35",
    status: "indexable",
    priority: 2,
  },
  {
    path: "/modulni-budynky/proekty/modulnyi-budynok-70m-plus/",
    title: "Scandi 80",
    description: "Готовий типовий модульний проєкт TimberX.",
    section: "projects",
    cluster: "Модульні будинки / Типові проєкти / Scandi 80",
    status: "indexable",
    priority: 2,
  },
  {
    path: "/modulni-budynky/proekty/hotelnyi-modul/",
    title: "Мініготель",
    description: "Готовий типовий модульний проєкт TimberX.",
    section: "projects",
    cluster: "Модульні будинки / Типові проєкти / Мініготель",
    status: "indexable",
    priority: 2,
  },
  {
    path: "/proekty/panelno-modulnyi-budynok-93m/",
    title: "Каркасно-панельний будинок Сімейний 93 м²",
    description:
      "Каркасно-панельний проєкт TimberX на 93 м² для швидкої відбудови, громад і серійного житла.",
    section: "projects",
    cluster: "Каркасно-панельні будинки / Типові проєкти / 93 м²",
    status: "noindex",
    priority: 4,
  },
  {
    path: "/modulni-budynky/proekty/blok-ohorony/",
    title: "Блок охорони",
    description: "Типовий модульний проєкт TimberX, який ще не готовий до SEO-індексації.",
    section: "projects",
    cluster: "Модульні будинки / Типові проєкти / Блок охорони",
    status: "noindex",
    priority: 4,
  },
  {
    path: "/modulni-budynky/faq/",
    title: "FAQ про модульні будинки",
    description: "Часті запитання про модульні будинки TimberX.",
    section: "faq",
    cluster: "Модульні будинки / FAQ",
    status: "indexable",
    priority: 3,
  },
  {
    path: "/contacts/",
    title: "Контакти TimberX",
    description:
      "Контактна сторінка TimberX для запитів на прорахунок і консультацію.",
    section: "service",
    cluster: "Службові сторінки",
    status: "indexable",
    priority: 3,
  },
  {
    path: "/modulni-budynky/kyiv/",
    title: "Модульні будинки в Києві",
    description: "GEO-сторінка для модульних будинків TimberX у Києві.",
    section: "geo",
    cluster: "Модульні будинки / Київ",
    status: "draft/placeholder",
    priority: 5,
  },
  {
    path: "/modulni-budynky/dnipro/",
    title: "Модульні будинки в Дніпрі",
    description: "GEO-сторінка для модульних будинків TimberX у Дніпрі.",
    section: "geo",
    cluster: "Модульні будинки / Дніпро",
    status: "draft/placeholder",
    priority: 5,
  },
  {
    path: "/modulni-budynky/lviv/",
    title: "Модульні будинки у Львові",
    description: "GEO-сторінка для модульних будинків TimberX у Львові.",
    section: "geo",
    cluster: "Модульні будинки / Львів",
    status: "draft/placeholder",
    priority: 5,
  },
  {
    path: "/kleyeni-konstruktsii/kyiv/",
    title: "Клеєні конструкції в Києві",
    description: "GEO-сторінка для клеєних конструкцій TimberX у Києві.",
    section: "geo",
    cluster: "Клеєні конструкції / Київ",
    status: "draft/placeholder",
    priority: 5,
  },
  {
    path: "/kleyeni-konstruktsii/dnipro/",
    title: "Клеєні конструкції в Дніпрі",
    description: "GEO-сторінка для клеєних конструкцій TimberX у Дніпрі.",
    section: "geo",
    cluster: "Клеєні конструкції / Дніпро",
    status: "draft/placeholder",
    priority: 5,
  },
  {
    path: "/kleyeni-konstruktsii/faq/",
    title: "FAQ про клеєні конструкції",
    description: "Часті запитання про клеєні конструкції TimberX.",
    section: "faq",
    cluster: "Клеєні конструкції / FAQ",
    status: "draft/placeholder",
    priority: 5,
  },
  {
    path: "/derevyani-fermy-mzp/faq/",
    title: "FAQ про ферми з металозубчатими пластинами",
    description: "Часті запитання про дерев'яні ферми з металозубчатими пластинами TimberX.",
    section: "faq",
    cluster: "Ферми з металозубчатими пластинами / FAQ",
    status: "draft/placeholder",
    priority: 5,
  },
  {
    path: "/karkasno-panelni-budynky/faq/",
    title: "FAQ про каркасно-модульні будинки",
    description: "Часті запитання про каркасно-модульні будинки TimberX.",
    section: "faq",
    cluster: "Каркасно-модульні будинки / FAQ",
    status: "draft/placeholder",
    priority: 5,
  },
  {
    path: "/sanitarni-moduli/faq/",
    title: "FAQ про санітарно-технічні модулі",
    description: "Часті запитання про санітарно-технічні модулі TimberX.",
    section: "faq",
    cluster: "Санітарно-технічні модулі / FAQ",
    status: "draft/placeholder",
    priority: 5,
  },
  {
    path: "/fakhverkovi-budynky/faq/",
    title: "FAQ про фахверкові будинки",
    description: "Часті запитання про фахверкові будинки TimberX.",
    section: "faq",
    cluster: "Фахверкові будинки / FAQ",
    status: "draft/placeholder",
    priority: 5,
  },
  {
    path: "/modulni-budynky/dlya-vpo/",
    title: "Модульні будинки для ВПО",
    description:
      "Long-tail сторінка для рішень TimberX у проєктах тимчасового та соціального розміщення.",
    section: "guide",
    cluster: "Модульні будинки / ВПО",
    status: "draft/placeholder",
    priority: 5,
  },
  {
    path: "/kleyeni-konstruktsii/dlya-skladiv/",
    title: "Клеєні конструкції для складів",
    description:
      "Long-tail сторінка для складських і логістичних об'єктів на основі клеєних конструкцій.",
    section: "guide",
    cluster: "Клеєні конструкції / Склади",
    status: "draft/placeholder",
    priority: 5,
  },
  {
    path: "/modulni-budynky/guide/",
    title: "Гайд по модульних будинках",
    description: "Контентний гайд для кластеру модульних будинків TimberX.",
    section: "guide",
    cluster: "Модульні будинки / Guide",
    status: "draft/placeholder",
    priority: 5,
  },
  {
    path: "/kleyeni-konstruktsii/guide/",
    title: "Гайд по клеєних конструкціях",
    description: "Контентний гайд для кластеру клеєних конструкцій TimberX.",
    section: "guide",
    cluster: "Клеєні конструкції / Guide",
    status: "draft/placeholder",
    priority: 5,
  },
  {
    path: "/about/",
    title: "Про компанію TimberX",
    description:
      "Сторінка про компанію TimberX, виробництво, підхід і команду.",
    section: "service",
    cluster: "Службові сторінки",
    status: "draft/placeholder",
    priority: 5,
  },
  {
    path: "/technologies/",
    title: "Виробництво та технології TimberX",
    description:
      "Сторінка про виробництво, технології й контроль якості TimberX.",
    section: "service",
    cluster: "Службові сторінки",
    status: "draft/placeholder",
    priority: 5,
  },
  {
    path: "/modulni-budynky/cases/",
    title: "Кейси модульних будинків",
    description:
      "Застарілий продуктовий case-URL. Поточна сторінка кейсів: /cases/.",
    section: "cases",
    cluster: "Deprecated / Кейси",
    status: "deprecated",
    priority: 9,
  },
  {
    path: "/modulni-budynky/cases/kyiv/",
    title: "Кейс модульних будинків у Києві",
    description:
      "Застарілий продуктовий case-URL. Поточна сторінка кейсів: /cases/.",
    section: "cases",
    cluster: "Deprecated / Кейси",
    status: "deprecated",
    priority: 9,
  },
  {
    path: "/kleyeni-konstruktsii/cases/",
    title: "Кейси клеєних конструкцій",
    description:
      "Застарілий продуктовий case-URL. Поточна сторінка кейсів: /cases/.",
    section: "cases",
    cluster: "Deprecated / Кейси",
    status: "deprecated",
    priority: 9,
  },
  {
    path: "/derevyani-fermy-mzp/cases/",
    title: "Кейси ферм з металозубчатими пластинами",
    description:
      "Застарілий продуктовий case-URL. Поточна сторінка кейсів: /cases/.",
    section: "cases",
    cluster: "Deprecated / Кейси",
    status: "deprecated",
    priority: 9,
  },
];

export function normalizeSeoPath(path: string) {
  if (path === "/") {
    return "/";
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return cleanPath.endsWith("/") ? cleanPath : `${cleanPath}/`;
}

export const seoPageMap = new Map(
  seoPages.map((page) => [normalizeSeoPath(page.path), page]),
);

export function findSeoPage(path: string) {
  return seoPageMap.get(normalizeSeoPath(path));
}

export function getSeoRobots(path: string): Metadata["robots"] | undefined {
  const page = findSeoPage(path);

  if (!page || page.status === "indexable") {
    return undefined;
  }

  if (page.status === "noindex") {
    return noindexFollowRobots;
  }

  return noindexNofollowRobots;
}

export function isSeoIndexable(path: string) {
  return findSeoPage(path)?.status === "indexable";
}

export const indexableSeoPages = seoPages.filter(
  (page) => page.status === "indexable",
);

export const placeholderSeoPages = seoPages.filter(
  (page) => page.status === "draft/placeholder",
);

export const nonIndexableSeoPages = seoPages.filter(
  (page) => page.status !== "indexable",
);

export function getSeoCanonical(path: string) {
  return absoluteUrl(normalizeSeoPath(path));
}
