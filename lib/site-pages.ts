export type SitePageSection =
  | "core"
  | "segment"
  | "cases"
  | "geo"
  | "faq"
  | "guide"
  | "service";

export type SitePage = {
  slug: string[];
  title: string;
  description: string;
  section: SitePageSection;
  cluster: string;
};

export const sitePages: SitePage[] = [
  {
    slug: ["modulni-budynky"],
    title: "Модульні будинки",
    description:
      "Продуктова сторінка для модульних будинків TimberX з B2B- та B2G-фокусом.",
    section: "core",
    cluster: "Модульні будинки",
  },
  {
    slug: ["kleyeni-konstruktsii"],
    title: "Клеєні конструкції",
    description:
      "Продуктова сторінка для клеєних конструкцій TimberX і складних інженерних проєктів.",
    section: "core",
    cluster: "Клеєні конструкції",
  },
  {
    slug: ["derevyani-fermy-mzp"],
    title: "Ферми МЗП",
    description:
      "Продуктова сторінка для дерев'яних ферм МЗП TimberX з акцентом на швидкий монтаж.",
    section: "core",
    cluster: "Ферми МЗП",
  },
  {
    slug: ["karkasno-panelni-budynky"],
    title: "Каркасно-панельні будинки",
    description:
      "Продуктова сторінка для каркасно-панельних будинків TimberX.",
    section: "core",
    cluster: "Каркасно-панельні будинки",
  },
  {
    slug: ["sanitarni-moduli"],
    title: "Санітарні модулі",
    description:
      "Продуктова сторінка для санітарних модулів TimberX для житлових і соціальних об'єктів.",
    section: "core",
    cluster: "Санітарні модулі",
  },
  {
    slug: ["fakhverkovi-budynky"],
    title: "Фахверкові будинки",
    description:
      "Продуктова сторінка для фахверкових будинків TimberX.",
    section: "core",
    cluster: "Фахверкові будинки",
  },
  {
    slug: ["modulni-budynky", "dlya-developeriv"],
    title: "Модульні будинки для девелоперів",
    description:
      "Сегментна сторінка для девелоперів, які шукають модульні рішення TimberX.",
    section: "segment",
    cluster: "Модульні будинки / Девелопери",
  },
  {
    slug: ["modulni-budynky", "dlya-gromad"],
    title: "Модульні будинки для громад",
    description:
      "Сегментна сторінка для громад і B2G-проєктів на базі модульних рішень TimberX.",
    section: "segment",
    cluster: "Модульні будинки / Громади",
  },
  {
    slug: ["modulni-budynky", "dlya-zhk"],
    title: "Модульні будинки для ЖК",
    description:
      "Сегментна сторінка для житлових комплексів і серійної забудови на базі TimberX.",
    section: "segment",
    cluster: "Модульні будинки / ЖК",
  },
  {
    slug: ["kleyeni-konstruktsii", "dlya-genpidriadnykiv"],
    title: "Клеєні конструкції для генпідрядників",
    description:
      "Сегментна сторінка для генпідрядників, які працюють зі складними інженерними конструкціями.",
    section: "segment",
    cluster: "Клеєні конструкції / Генпідрядники",
  },
  {
    slug: ["kleyeni-konstruktsii", "dlya-biznesu"],
    title: "Клеєні конструкції для бізнесу",
    description:
      "Сегментна сторінка для комерційних і виробничих об'єктів на основі клеєних конструкцій.",
    section: "segment",
    cluster: "Клеєні конструкції / Бізнес",
  },
  {
    slug: ["derevyani-fermy-mzp", "dlya-zhk"],
    title: "Ферми МЗП для ЖК",
    description:
      "Сегментна сторінка для житлових комплексів, де потрібні ферми МЗП TimberX.",
    section: "segment",
    cluster: "Ферми МЗП / ЖК",
  },
  {
    slug: ["sanitarni-moduli", "dlya-gromad"],
    title: "Санітарні модулі для громад",
    description:
      "Сегментна сторінка для громад, які потребують швидкого запуску санітарної інфраструктури.",
    section: "segment",
    cluster: "Санітарні модулі / Громади",
  },
  {
    slug: ["modulni-budynky", "cases"],
    title: "Кейси модульних будинків",
    description:
      "Добірка кейсів і реалізацій для напрямку модульних будинків TimberX.",
    section: "cases",
    cluster: "Модульні будинки / Кейси",
  },
  {
    slug: ["modulni-budynky", "cases", "kyiv"],
    title: "Кейс модульних будинків у Києві",
    description:
      "Окремий кейс модульного рішення TimberX для Києва.",
    section: "cases",
    cluster: "Модульні будинки / Кейси / Київ",
  },
  {
    slug: ["kleyeni-konstruktsii", "cases"],
    title: "Кейси клеєних конструкцій",
    description:
      "Добірка реалізованих кейсів TimberX для напрямку клеєних конструкцій.",
    section: "cases",
    cluster: "Клеєні конструкції / Кейси",
  },
  {
    slug: ["derevyani-fermy-mzp", "cases"],
    title: "Кейси ферм МЗП",
    description:
      "Приклади реалізації проєктів на базі дерев'яних ферм МЗП TimberX.",
    section: "cases",
    cluster: "Ферми МЗП / Кейси",
  },
  {
    slug: ["modulni-budynky", "kyiv"],
    title: "Модульні будинки в Києві",
    description: "GEO-сторінка для модульних будинків TimberX у Києві.",
    section: "geo",
    cluster: "Модульні будинки / Київ",
  },
  {
    slug: ["modulni-budynky", "dnipro"],
    title: "Модульні будинки в Дніпрі",
    description: "GEO-сторінка для модульних будинків TimberX у Дніпрі.",
    section: "geo",
    cluster: "Модульні будинки / Дніпро",
  },
  {
    slug: ["modulni-budynky", "lviv"],
    title: "Модульні будинки у Львові",
    description: "GEO-сторінка для модульних будинків TimberX у Львові.",
    section: "geo",
    cluster: "Модульні будинки / Львів",
  },
  {
    slug: ["kleyeni-konstruktsii", "kyiv"],
    title: "Клеєні конструкції в Києві",
    description: "GEO-сторінка для клеєних конструкцій TimberX у Києві.",
    section: "geo",
    cluster: "Клеєні конструкції / Київ",
  },
  {
    slug: ["kleyeni-konstruktsii", "dnipro"],
    title: "Клеєні конструкції в Дніпрі",
    description: "GEO-сторінка для клеєних конструкцій TimberX у Дніпрі.",
    section: "geo",
    cluster: "Клеєні конструкції / Дніпро",
  },
  {
    slug: ["modulni-budynky", "faq"],
    title: "FAQ про модульні будинки",
    description: "Часті запитання про модульні будинки TimberX.",
    section: "faq",
    cluster: "Модульні будинки / FAQ",
  },
  {
    slug: ["kleyeni-konstruktsii", "faq"],
    title: "FAQ про клеєні конструкції",
    description: "Часті запитання про клеєні конструкції TimberX.",
    section: "faq",
    cluster: "Клеєні конструкції / FAQ",
  },
  {
    slug: ["derevyani-fermy-mzp", "faq"],
    title: "FAQ про ферми МЗП",
    description: "Часті запитання про дерев'яні ферми МЗП TimberX.",
    section: "faq",
    cluster: "Ферми МЗП / FAQ",
  },
  {
    slug: ["modulni-budynky", "dlya-vpo"],
    title: "Модульні будинки для ВПО",
    description:
      "Long-tail сторінка для рішень TimberX у проєктах тимчасового та соціального розміщення.",
    section: "guide",
    cluster: "Модульні будинки / ВПО",
  },
  {
    slug: ["kleyeni-konstruktsii", "dlya-skladiv"],
    title: "Клеєні конструкції для складів",
    description:
      "Long-tail сторінка для складських і логістичних об'єктів на основі клеєних конструкцій.",
    section: "guide",
    cluster: "Клеєні конструкції / Склади",
  },
  {
    slug: ["modulni-budynky", "guide"],
    title: "Гайд по модульних будинках",
    description: "Контентний гайд для кластеру модульних будинків TimberX.",
    section: "guide",
    cluster: "Модульні будинки / Guide",
  },
  {
    slug: ["kleyeni-konstruktsii", "guide"],
    title: "Гайд по клеєних конструкціях",
    description: "Контентний гайд для кластеру клеєних конструкцій TimberX.",
    section: "guide",
    cluster: "Клеєні конструкції / Guide",
  },
  {
    slug: ["about"],
    title: "Про компанію TimberX",
    description:
      "Сторінка про компанію TimberX, виробництво, підхід і команду.",
    section: "service",
    cluster: "Службові сторінки",
  },
  {
    slug: ["contacts"],
    title: "Контакти TimberX",
    description:
      "Контактна сторінка TimberX для запитів на прорахунок і консультацію.",
    section: "service",
    cluster: "Службові сторінки",
  },
  {
    slug: ["technologies"],
    title: "Виробництво та технології TimberX",
    description:
      "Сторінка про виробництво, технології й контроль якості TimberX.",
    section: "service",
    cluster: "Службові сторінки",
  },
];

export const sitePageMap = new Map(
  sitePages.map((page) => [page.slug.join("/"), page]),
);

export function findSitePage(slug: string[]) {
  return sitePageMap.get(slug.join("/"));
}
