export type TypicalProjectCategory = "modular" | "frame" | "fachwerk";

export type TypicalProject = {
  slug: string;
  category: TypicalProjectCategory;
  productLabel: string;
  title: string;
  shortTitle: string;
  area: string;
  summary: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  gallery: Array<{
    src: string;
    alt: string;
    label: string;
  }>;
  plan: {
    title: string;
    description: string;
    imageSrc?: string;
    zones: string[];
  };
  specs: Array<{
    label: string;
    value: string;
  }>;
  areaSpecs?: Array<{
    label: string;
    value: string;
  }>;
  rooms?: Array<{
    number: string;
    name: string;
    area: string;
    note?: string;
  }>;
  technicalSpecs?: Array<{
    label: string;
    value: string;
  }>;
  adaptationOptions?: string[];
  scenarios: string[];
  formats: string[];
  ctaLabel: string;
};

export const typicalProjects: TypicalProject[] = [
  {
    slug: "modulnyi-budynok-25m",
    category: "modular",
    productLabel: "Типовий проєкт",
    title: "Skaut 25",
    shortTitle: "25\u00a0м²",
    area: "30,41\u00a0м²",
    summary:
      "Компактний будинок із критою терасою для дачі, бази відпочинку або серійного заміського формату.",
    description:
      "«Skaut 25» — компактний модульний будинок із відкритою кухнею-вітальнею, санвузлом, передпокоєм і двома терасовими зонами. Формат підходить для заміського відпочинку, баз відпочинку, глемпінгу або серійного розміщення компактних будинків.",
    heroImage: "/images/projects/scout-dacha-25/forest-exterior-01.jpg",
    heroImageAlt: "Проєкт Skaut 25: компактний модульний будинок з критою терасою у лісі",
    gallery: [
      {
        src: "/images/projects/scout-dacha-25/forest-exterior-01.jpg",
        alt: "Skaut 25: фасад з критою терасою",
        label: "Фасад",
      },
      {
        src: "/images/projects/scout-dacha-25/forest-exterior-02.jpg",
        alt: "Skaut 25: фасад з вечірнім підсвічуванням",
        label: "Тераса",
      },
      {
        src: "/images/projects/scout-dacha-25/forest-exterior-03.jpg",
        alt: "Skaut 25: бічний фасад і вхідна зона",
        label: "Вхід",
      },
      {
        src: "/images/projects/scout-dacha-25/forest-exterior-04.jpg",
        alt: "Skaut 25: світлий варіант фасаду",
        label: "Фасад",
      },
      {
        src: "/images/projects/scout-dacha-25/render-exterior-01.jpg",
        alt: "Skaut 25: архітектурний ракурс 1",
        label: "Модель",
      },
      {
        src: "/images/projects/scout-dacha-25/render-exterior-02.jpg",
        alt: "Skaut 25: архітектурний ракурс 2",
        label: "Модель",
      },
      {
        src: "/images/projects/scout-dacha-25/render-exterior-03.jpg",
        alt: "Skaut 25: архітектурний ракурс 3",
        label: "Модель",
      },
      {
        src: "/images/projects/scout-dacha-25/render-exterior-04.jpg",
        alt: "Skaut 25: архітектурний ракурс 4",
        label: "Модель",
      },
    ],
    plan: {
      title: "Раціональне планування з двома терасовими зонами",
      description:
        "Вхід організований через передпокій, далі простір відкривається у кухню-вітальню з виходом на криту терасу. Санвузол розміщений окремо і передбачає місце для базової сантехніки та пральної машини.",
      imageSrc: "/images/projects/scout-dacha-25/plan-floor-01.png",
      zones: ["Передпокій", "Кухня-вітальня", "Санвузол", "Тераса 1", "Тераса 2"],
    },
    specs: [
      { label: "Загальна площа", value: "30,41\u00a0м²" },
      { label: "Житлова площа", value: "16,64\u00a0м²" },
      { label: "Габарити", value: "9,5 × 5,0\u00a0м" },
      { label: "Тераси", value: "15,78\u00a0м²" },
    ],
    areaSpecs: [
      { label: "Загальна площа поверху", value: "30,41\u00a0м²" },
      { label: "Житлова площа", value: "16,64\u00a0м²" },
      { label: "Площа забудови", value: "48,60\u00a0м²" },
      { label: "Літні приміщення", value: "15,78\u00a0м²" },
      { label: "Габаритні розміри по осях", value: "9,5 × 5,0\u00a0м" },
      { label: "Висота фасаду до парапету", value: "2,9\u00a0м" },
    ],
    rooms: [
      { number: "101", name: "Передпокій", area: "4,55\u00a0м²" },
      { number: "102", name: "Кухня-вітальня", area: "16,64\u00a0м²" },
      { number: "103", name: "Санвузол", area: "4,49\u00a0м²" },
      { number: "104", name: "Тераса 1", area: "1,75\u00a0м²", note: "з коеф. 0,3" },
      { number: "105", name: "Тераса 2", area: "2,98\u00a0м²", note: "з коеф. 0,3" },
    ],
    technicalSpecs: [
      { label: "Тип конструкції", value: "Модульна технологія" },
      { label: "Скління", value: "Великі віконні блоки для огляду та інсоляції" },
      { label: "Зовнішнє оздоблення", value: "Вертикальне дерев'яне облицювання стін" },
      { label: "Покрівля", value: "Плоска покрівля з організованим водовідведенням" },
    ],
    adaptationOptions: [
      "Коробка / під ключ",
      "Фасадне оздоблення",
      "Інженерія під сценарій експлуатації",
      "Внутрішнє оздоблення",
    ],
    scenarios: ["дача", "база відпочинку", "глемпінг", "орендний бізнес"],
    formats: ["коробка", "під ключ", "серійна партія"],
    ctaLabel: "Прорахувати Skaut 25",
  },
  {
    slug: "modulnyi-budynok-35m",
    category: "modular",
    productLabel: "Модульний будинок",
    title: "Модульний будинок 35\u00a0м²",
    shortTitle: "35\u00a0м²",
    area: "35\u00a0м²",
    summary:
      "Універсальний житловий модуль для орендного бізнесу, дачі, компактного проживання або соціальних програм.",
    description:
      "Проєкт 35\u00a0м² дає більше комфорту без втрати швидкості виробництва. Підходить для серійного розміщення на базах відпочинку, у котеджних містечках або для громадських програм.",
    heroImage: "/images/projects/modular-homes-community/modular-home-terrace.jpg",
    heroImageAlt: "Модульний будинок TimberX 35\u00a0м² з терасою",
    gallery: [
      {
        src: "/images/projects/modular-homes-community/modular-home-terrace.jpg",
        alt: "Модульний будинок 35\u00a0м²: тераса",
        label: "Фасад",
      },
      {
        src: "/images/projects/modular-homes-community/modular-home-interior-dining.jpg",
        alt: "Модульний будинок 35\u00a0м²: кухня та їдальня",
        label: "Інтер'єр",
      },
      {
        src: "/images/projects/modular-homes-community/modular-home-wood-facade.jpg",
        alt: "Модульний будинок 35\u00a0м²: дерев'яний фасад",
        label: "Фасад",
      },
      {
        src: "/images/projects/modular-homes-community/modular-home-facade-closeup.jpg",
        alt: "Модульний будинок 35\u00a0м²: деталь фасаду",
        label: "Деталь",
      },
    ],
    plan: {
      title: "Планування для компактного постійного проживання",
      description:
        "Базова логіка: спальня або відокремлена зона, кухня-вітальня, санвузол, місце зберігання і тераса за потреби.",
      zones: ["Спальня / ніша", "Кухня-вітальня", "Санвузол", "Зберігання", "Тераса"],
    },
    specs: [
      { label: "Площа", value: "35\u00a0м²" },
      { label: "Формат", value: "1-2 модулі" },
      { label: "Готовність", value: "коробка / під ключ" },
      { label: "Сценарій", value: "оренда / проживання" },
    ],
    scenarios: ["база відпочинку", "дача", "ВПО", "котеджне містечко"],
    formats: ["коробка", "під ключ", "готовий модуль"],
    ctaLabel: "Прорахувати 35\u00a0м²",
  },
  {
    slug: "modulnyi-budynok-70m-plus",
    category: "modular",
    productLabel: "Модульний будинок",
    title: "Модульний будинок 70+\u00a0м²",
    shortTitle: "70+\u00a0м²",
    area: "70+\u00a0м²",
    summary:
      "Повноцінний житловий формат для девелоперського продажу, сімейного проживання або котеджного містечка.",
    description:
      "Формат 70+\u00a0м² дозволяє створити будинок із кількома спальнями, просторою кухнею-вітальнею і варіантами фасаду. Його зручно масштабувати партіями для девелоперських проєктів.",
    heroImage: "/images/projects/modular-homes-community/modular-home-wood-facade.jpg",
    heroImageAlt: "Модульний будинок TimberX 70+\u00a0м² з дерев'яним фасадом",
    gallery: [
      {
        src: "/images/projects/modular-homes-community/modular-home-wood-facade.jpg",
        alt: "Модульний будинок 70+\u00a0м²: фасад",
        label: "Фасад",
      },
      {
        src: "/images/projects/modular-homes-community/modular-home-interior-living.jpg",
        alt: "Модульний будинок 70+\u00a0м²: вітальня",
        label: "Інтер'єр",
      },
      {
        src: "/images/projects/modular-homes-community/modular-home-interior-dining.jpg",
        alt: "Модульний будинок 70+\u00a0м²: кухня",
        label: "Інтер'єр",
      },
      {
        src: "/images/projects/modular-homes-community/modular-home-side-facade.jpg",
        alt: "Модульний будинок 70+\u00a0м²: бічний фасад",
        label: "Об'єкт",
      },
    ],
    plan: {
      title: "Сімейне планування з кількома функціональними зонами",
      description:
        "План може адаптуватися під 2-3 спальні, кухню-вітальню, санвузли, технічну зону і терасу. Це базовий формат для продажу або довгострокової оренди.",
      zones: ["2-3 спальні", "Кухня-вітальня", "Санвузол", "Технічна зона", "Тераса"],
    },
    specs: [
      { label: "Площа", value: "70+\u00a0м²" },
      { label: "Формат", value: "2+ модулі" },
      { label: "Готовність", value: "коробка / під ключ" },
      { label: "Партія", value: "10+ будинків" },
    ],
    scenarios: ["котеджне містечко", "девелопмент", "громада", "довгострокова оренда"],
    formats: ["коробка", "під ключ", "серійна партія"],
    ctaLabel: "Прорахувати 70+\u00a0м²",
  },
  {
    slug: "hotelnyi-modul",
    category: "modular",
    productLabel: "Готельний модуль",
    title: "Готельний модуль",
    shortTitle: "Готель",
    area: "номерний фонд",
    summary:
      "Типове рішення для баз відпочинку, глемпінгів, апарт-готелів і сезонного орендного бізнесу.",
    description:
      "Готельний модуль допомагає швидко збільшити номерний фонд і вийти в сезон без довгого циклу традиційного будівництва. Формат масштабується партіями.",
    heroImage: "/images/cases/sosnovel-case.jpg",
    heroImageAlt: "Модульні будинки TimberX для заміського комплексу",
    gallery: [
      {
        src: "/images/cases/sosnovel-case.jpg",
        alt: "Готельний модуль TimberX: кейс заміського комплексу",
        label: "Кейс",
      },
      {
        src: "/images/projects/modular-homes-community/modular-home-terrace.jpg",
        alt: "Готельний модуль TimberX: тераса",
        label: "Фасад",
      },
      {
        src: "/images/projects/modular-homes-community/modular-home-interior-living.jpg",
        alt: "Готельний модуль TimberX: інтер'єр",
        label: "Інтер'єр",
      },
      {
        src: "/images/projects/modular-homes-community/modular-home-transport.jpg",
        alt: "Готельний модуль TimberX: транспортування",
        label: "Логістика",
      },
    ],
    plan: {
      title: "Планування під номер або апартамент",
      description:
        "Може включати спальну зону, санвузол, невелику кухонну зону, місце зберігання та терасу. Конфігурація залежить від класу об'єкта.",
      zones: ["Спальна зона", "Санвузол", "Кухонна зона", "Зберігання", "Тераса"],
    },
    specs: [
      { label: "Призначення", value: "номер / апартамент" },
      { label: "Формат", value: "серійні модулі" },
      { label: "Готовність", value: "під ключ" },
      { label: "Запуск", value: "партіями" },
    ],
    scenarios: ["база відпочинку", "готель", "глемпінг", "орендний бізнес"],
    formats: ["під ключ", "серійна партія", "готовий модуль"],
    ctaLabel: "Прорахувати готельний модуль",
  },
  {
    slug: "blok-ohorony",
    category: "modular",
    productLabel: "Сервісний модуль",
    title: "Блок охорони",
    shortTitle: "Блок охорони",
    area: "сервісний модуль",
    summary:
      "Швидкий сервісний модуль для ЖК, котеджних містечок, виробництв, складів і громадських об'єктів.",
    description:
      "Блок охорони закриває потребу в готовому контрольному пункті без довгого будівництва на майданчику. Рішення можна адаптувати під пропускний режим, очікування або адміністративну функцію.",
    heroImage: "/images/projects/modular-wall.png",
    heroImageAlt: "Сервісний модуль TimberX на виробництві",
    gallery: [
      {
        src: "/images/projects/modular-wall.png",
        alt: "Блок охорони TimberX: виробництво",
        label: "Виробництво",
      },
      {
        src: "/images/projects/modular-homes-community/modular-home-facade-closeup.jpg",
        alt: "Блок охорони TimberX: фасадне рішення",
        label: "Фасад",
      },
      {
        src: "/images/projects/modular-homes-community/modular-home-transport.jpg",
        alt: "Блок охорони TimberX: логістика",
        label: "Логістика",
      },
      {
        src: "/images/projects/modular-homes-community/modular-home-side-facade.jpg",
        alt: "Блок охорони TimberX: об'єкт",
        label: "Об'єкт",
      },
    ],
    plan: {
      title: "Сервісне планування під контроль доступу",
      description:
        "Базова схема може включати робоче місце, зону очікування, санвузол або технічну нішу. Параметри адаптуються під об'єкт.",
      zones: ["Робоче місце", "Зона очікування", "Санвузол опційно", "Технічна ніша"],
    },
    specs: [
      { label: "Призначення", value: "контроль доступу" },
      { label: "Формат", value: "готовий модуль" },
      { label: "Готовність", value: "коробка / під ключ" },
      { label: "Об'єкти", value: "ЖК / виробництво / громада" },
    ],
    scenarios: ["ЖК", "котеджне містечко", "виробництво", "громада"],
    formats: ["готовий модуль", "коробка", "під ключ"],
    ctaLabel: "Прорахувати блок охорони",
  },
];

export const modularTypicalProjects = typicalProjects.filter(
  (project) => project.category === "modular",
);

export function findTypicalProject(slug: string) {
  return typicalProjects.find((project) => project.slug === slug);
}
