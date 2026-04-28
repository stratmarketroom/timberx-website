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
  detailHeroImage?: string;
  detailHeroImageAlt?: string;
  gallery: Array<{
    src: string;
    alt: string;
    label: string;
  }>;
  visualGallery?: Array<{
    src: string;
    alt: string;
    label: string;
  }>;
  modelGallery?: Array<{
    src: string;
    alt: string;
    label: string;
  }>;
  realizationGallery?: Array<{
    src: string;
    alt: string;
    label: string;
  }>;
  realizationVideos?: Array<{
    src: string;
    title: string;
    poster?: string;
  }>;
  realizationTitle?: string;
  realizationText?: string;
  plan: {
    title: string;
    description: string;
    imageSrc?: string;
    additionalImages?: Array<{
      src: string;
      alt: string;
    }>;
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
    detailHeroImage: "/images/projects/scout-dacha-25/forest-exterior-02.jpg",
    detailHeroImageAlt: "Skaut 25: модульний будинок з критою терасою",
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
    visualGallery: [
      {
        src: "/images/projects/scout-dacha-25/visual-entry.jpg",
        alt: "Skaut 25: вхідна зона",
        label: "Вхід",
      },
      {
        src: "/images/projects/scout-dacha-25/visual-grey-facade.jpg",
        alt: "Skaut 25: сірий фасад",
        label: "Фасад",
      },
      {
        src: "/images/projects/scout-dacha-25/visual-terrace.jpg",
        alt: "Skaut 25: тераса",
        label: "Тераса",
      },
    ],
    modelGallery: [
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
    slug: "skaut-50",
    category: "modular",
    productLabel: "Типовий проєкт",
    title: "Skaut 50",
    shortTitle: "53\u00a0м²",
    area: "53\u00a0м²",
    summary:
      "Розширений будинок лінійки Skaut із трьома спальнями, кухнею-вітальнею і двома терасами.",
    description:
      "«Skaut 50» — модульний заміський будинок із чітким поділом на денну та спальну зони. Планування включає кухню-вітальню, три окремі спальні, передпокій, душову кімнату і дві тераси для різних сценаріїв відпочинку.",
    heroImage: "/images/projects/skaut-50/forest-exterior-02.jpg",
    heroImageAlt: "Проєкт Skaut 50: модульний будинок з широкою критою терасою у лісі",
    detailHeroImage: "/images/projects/skaut-50/forest-exterior-03.jpg",
    detailHeroImageAlt: "Skaut 50: фасад модульного будинку з терасою",
    gallery: [
      {
        src: "/images/projects/skaut-50/forest-exterior-02.jpg",
        alt: "Skaut 50: прямий фасад з терасою",
        label: "Фасад",
      },
      {
        src: "/images/projects/skaut-50/forest-exterior-03.jpg",
        alt: "Skaut 50: вхід і криті терасові зони",
        label: "Вхід",
      },
      {
        src: "/images/projects/skaut-50/forest-exterior-04.jpg",
        alt: "Skaut 50: тераса з низького ракурсу",
        label: "Тераса",
      },
      {
        src: "/images/projects/skaut-50/forest-exterior-01.jpg",
        alt: "Skaut 50: бічний ракурс модульного будинку",
        label: "Фасад",
      },
      {
        src: "/images/projects/skaut-50/dark-exterior-01.jpg",
        alt: "Skaut 50: темний варіант фасаду з терасою",
        label: "Фасад",
      },
      {
        src: "/images/projects/skaut-50/dark-exterior-02.jpg",
        alt: "Skaut 50: темний фасад з дерев'яною терасою",
        label: "Тераса",
      },
      {
        src: "/images/projects/skaut-50/dark-exterior-03.jpg",
        alt: "Skaut 50: деталь тераси і фасадного оздоблення",
        label: "Деталь",
      },
    ],
    visualGallery: [
      {
        src: "/images/projects/skaut-50/forest-exterior-04.jpg",
        alt: "Skaut 50: тераса з низького ракурсу",
        label: "Тераса",
      },
      {
        src: "/images/projects/skaut-50/forest-exterior-01.jpg",
        alt: "Skaut 50: бічний фасад у світлому оздобленні",
        label: "Бічний фасад",
      },
      {
        src: "/images/projects/skaut-50/dark-exterior-01.jpg",
        alt: "Skaut 50: темний фасад з широкою терасою",
        label: "Темний фасад",
      },
      {
        src: "/images/projects/skaut-50/dark-exterior-02.jpg",
        alt: "Skaut 50: темний фасад з дерев'яною терасою",
        label: "Тераса",
      },
      {
        src: "/images/projects/skaut-50/dark-exterior-03.jpg",
        alt: "Skaut 50: крупний ракурс тераси і фасаду",
        label: "Деталь",
      },
    ],
    modelGallery: [
      {
        src: "/images/projects/skaut-50/model-01.jpg",
        alt: "Skaut 50: архітектурний ракурс моделі 1",
        label: "Модель",
      },
      {
        src: "/images/projects/skaut-50/model-02.jpg",
        alt: "Skaut 50: архітектурний ракурс моделі 2",
        label: "Модель",
      },
      {
        src: "/images/projects/skaut-50/model-03.jpg",
        alt: "Skaut 50: архітектурний ракурс моделі 3",
        label: "Модель",
      },
      {
        src: "/images/projects/skaut-50/model-04.jpg",
        alt: "Skaut 50: архітектурний ракурс моделі 4",
        label: "Модель",
      },
      {
        src: "/images/projects/skaut-50/model-05.jpg",
        alt: "Skaut 50: архітектурний ракурс моделі 5",
        label: "Модель",
      },
    ],
    plan: {
      title: "Сімейне планування з трьома спальнями і двома терасами",
      description:
        "Центральна частина будинку відведена під кухню-вітальню, спальну групу рознесено по периметру, а дві тераси дають окремі зовнішні зони для входу, відпочинку та сезонного використання.",
      imageSrc: "/images/projects/skaut-50/plan-floor-01.jpg",
      zones: ["Кухня-вітальня", "3 спальні", "Передпокій", "Душова кімната", "2 тераси"],
    },
    specs: [
      { label: "Загальна площа", value: "53\u00a0м²" },
      { label: "Тераси", value: "25\u00a0м²" },
      { label: "Габарити", value: "10,0 × 8,3\u00a0м" },
      { label: "Спальні", value: "3" },
    ],
    areaSpecs: [
      { label: "Загальна площа приміщень", value: "53\u00a0м²" },
      { label: "Площа терас", value: "25\u00a0м²" },
      { label: "Площа забудови по осях", value: "83\u00a0м²" },
      { label: "Габаритні розміри по осях", value: "10,0 × 8,3\u00a0м" },
      { label: "Тераса 1", value: "15,00\u00a0м²" },
      { label: "Тераса 2", value: "10,00\u00a0м²" },
    ],
    rooms: [
      { number: "01", name: "Вітальня", area: "19,13\u00a0м²" },
      { number: "02", name: "Кухня", area: "5,87\u00a0м²" },
      { number: "03", name: "Спальня 1", area: "6,75\u00a0м²" },
      { number: "04", name: "Спальня 2", area: "5,58\u00a0м²" },
      { number: "05", name: "Спальня 3", area: "3,86\u00a0м²" },
      { number: "06", name: "Передпокій", area: "3,11\u00a0м²" },
      { number: "07", name: "Душова кімната", area: "2,67\u00a0м²" },
      { number: "08", name: "Тераса", area: "15,00\u00a0м²" },
      { number: "09", name: "Тераса", area: "10,00\u00a0м²" },
    ],
    technicalSpecs: [
      { label: "Тип конструкції", value: "Модульна технологія" },
      { label: "Скління", value: "Панорамні та горизонтальні віконні блоки для інсоляції" },
      { label: "Зовнішнє оздоблення", value: "Дерев'яне облицювання або сучасні фасадні матеріали" },
      { label: "Покрівля", value: "Плоска покрівля з організованим водовідведенням" },
    ],
    adaptationOptions: [
      "Коробка / під ключ",
      "Фасадне оздоблення",
      "Інженерія під сценарій експлуатації",
      "Внутрішнє оздоблення",
    ],
    scenarios: ["дача", "база відпочинку", "орендний бізнес", "котеджне містечко"],
    formats: ["коробка", "під ключ", "серійна партія"],
    ctaLabel: "Прорахувати Skaut 50",
  },
  {
    slug: "modulnyi-budynok-35m",
    category: "modular",
    productLabel: "Типовий проєкт",
    title: "Skaut 35",
    shortTitle: "35\u00a0м²",
    area: "41,78\u00a0м²",
    summary:
      "Компактний модульний будинок із трьома спальнями, кухнею-вітальнею, санвузлом і двома терасами.",
    description:
      "«Skaut 35» — компактний модульний будинок для заміського життя, сімейного відпочинку або орендного формату. На невеликій площі розміщено вітальню, кухню, три окремі спальні, передпокій, санвузол і дві криті терасові зони.",
    heroImage: "/images/projects/skaut-35/forest-exterior-07.jpg",
    heroImageAlt: "Проєкт Skaut 35: модульний будинок з терасою у лісі",
    detailHeroImage: "/images/projects/skaut-35/forest-exterior-04.jpg",
    detailHeroImageAlt: "Skaut 35: вечірній фасад модульного будинку з критою терасою",
    gallery: [
      {
        src: "/images/projects/skaut-35/forest-exterior-07.jpg",
        alt: "Skaut 35: прямий фасад з критою терасою",
        label: "Фасад",
      },
      {
        src: "/images/projects/skaut-35/forest-exterior-04.jpg",
        alt: "Skaut 35: вечірній фасад з терасою",
        label: "Фасад",
      },
      {
        src: "/images/projects/skaut-35/forest-exterior-02.jpg",
        alt: "Skaut 35: бічний фасад і тераса",
        label: "Бічний фасад",
      },
      {
        src: "/images/projects/skaut-35/forest-exterior-03.jpg",
        alt: "Skaut 35: верхній ракурс будинку",
        label: "Ракурс",
      },
      {
        src: "/images/projects/skaut-35/forest-exterior-01.jpg",
        alt: "Skaut 35: тераса з вечірнім освітленням",
        label: "Тераса",
      },
      {
        src: "/images/projects/skaut-35/forest-exterior-05.jpg",
        alt: "Skaut 35: фронтальний фасад",
        label: "Фасад",
      },
      {
        src: "/images/projects/skaut-35/forest-exterior-06.jpg",
        alt: "Skaut 35: верхній фасадний ракурс",
        label: "Ракурс",
      },
    ],
    visualGallery: [
      {
        src: "/images/projects/skaut-35/forest-exterior-01.jpg",
        alt: "Skaut 35: тераса з вечірнім світлом",
        label: "Тераса",
      },
      {
        src: "/images/projects/skaut-35/forest-exterior-02.jpg",
        alt: "Skaut 35: бічний фасад",
        label: "Бічний фасад",
      },
      {
        src: "/images/projects/skaut-35/forest-exterior-03.jpg",
        alt: "Skaut 35: верхній ракурс будинку",
        label: "Ракурс",
      },
      {
        src: "/images/projects/skaut-35/forest-exterior-05.jpg",
        alt: "Skaut 35: фасад з терасою",
        label: "Фасад",
      },
      {
        src: "/images/projects/skaut-35/forest-exterior-06.jpg",
        alt: "Skaut 35: тераса з верхнього ракурсу",
        label: "Тераса",
      },
    ],
    modelGallery: [
      {
        src: "/images/projects/skaut-35/model-01.jpg",
        alt: "Skaut 35: архітектурний ракурс моделі 1",
        label: "Модель",
      },
      {
        src: "/images/projects/skaut-35/model-02.jpg",
        alt: "Skaut 35: архітектурний ракурс моделі 2",
        label: "Модель",
      },
      {
        src: "/images/projects/skaut-35/model-03.jpg",
        alt: "Skaut 35: архітектурний ракурс моделі 3",
        label: "Модель",
      },
      {
        src: "/images/projects/skaut-35/model-04.jpg",
        alt: "Skaut 35: архітектурний ракурс моделі 4",
        label: "Модель",
      },
    ],
    plan: {
      title: "Компактне сімейне планування з трьома спальнями",
      description:
        "Планування об'єднує центральну денну зону з вітальнею і кухнею, три ізольовані спальні, санвузол, передпокій і дві тераси, які розширюють сценарії відпочинку.",
      imageSrc: "/images/projects/skaut-35/plan-floor-clean.jpg",
      zones: ["Вітальня", "Кухня", "3 спальні", "Санвузол", "2 тераси"],
    },
    specs: [
      { label: "Загальна площа", value: "41,78\u00a0м²" },
      { label: "Опалювана площа", value: "35\u00a0м²" },
      { label: "Габарити", value: "8,3 × 7,5\u00a0м" },
      { label: "Спальні", value: "3" },
    ],
    areaSpecs: [
      { label: "Загальна площа поверху", value: "41,78\u00a0м²" },
      { label: "Опалювана площа", value: "35\u00a0м²" },
      { label: "Житлова площа будинку", value: "26,17\u00a0м²" },
      { label: "Площа забудови", value: "64,10\u00a0м²" },
      { label: "Габаритні розміри", value: "8,3 × 7,5\u00a0м" },
      { label: "Тераси та веранди", value: "20\u00a0м²" },
    ],
    rooms: [
      { number: "101", name: "Передпокій", area: "3,11\u00a0м²" },
      { number: "102", name: "Вітальня", area: "9,98\u00a0м²" },
      { number: "103", name: "Спальня 1", area: "6,75\u00a0м²" },
      { number: "104", name: "Спальня 2", area: "5,58\u00a0м²" },
      { number: "105", name: "Спальня 3", area: "3,86\u00a0м²" },
      { number: "106", name: "Кухня", area: "5,33\u00a0м²" },
      { number: "107", name: "Санвузол", area: "2,67\u00a0м²" },
      { number: "108", name: "Тераса", area: "1,50\u00a0м²", note: "з коеф. 0,3" },
      { number: "109", name: "Тераса", area: "3,00\u00a0м²", note: "з коеф. 0,3" },
    ],
    technicalSpecs: [
      { label: "Тип конструкції", value: "Модульна технологія" },
      { label: "Висота стель", value: "2,4\u00a0м" },
      { label: "Утеплення", value: "150\u00a0мм для стін та підлоги" },
      { label: "Скління", value: "Енергоефективні віконні блоки різних конфігурацій" },
    ],
    adaptationOptions: [
      "Коробка / під ключ",
      "Фасадне оздоблення",
      "Інженерія під сценарій експлуатації",
      "Внутрішнє оздоблення",
    ],
    scenarios: ["дача", "база відпочинку", "орендний бізнес", "котеджне містечко"],
    formats: ["коробка", "під ключ", "серійна партія"],
    ctaLabel: "Прорахувати Skaut 35",
  },
  {
    slug: "modulnyi-budynok-70m-plus",
    category: "modular",
    productLabel: "Модульний будинок",
    title: "Scandi 80",
    shortTitle: "82,5\u00a0м²",
    area: "82,5\u00a0м²",
    summary:
      "Повноцінний модульний будинок із двома спальнями, кухнею-вітальнею, ванною кімнатою і широкою терасою.",
    description:
      "Scandi 80 — модульний будинок 82,5\u00a0м² для 2-4 людей. Планування поєднує дві спальні, кухню, простору вітальню, ванну кімнату і терасу; панорамні вікна дають більше природного світла, а широка тераса розширює сценарії відпочинку.",
    heroImage: "/images/projects/scandi-4/hero-scandi.jpg",
    heroImageAlt: "Scandi 80: модульний будинок із дерев'яною терасою",
    detailHeroImage: "/images/projects/scandi-4/hero-scandi.jpg",
    detailHeroImageAlt: "Scandi 80: реалізований модульний будинок з терасою",
    gallery: [
      {
        src: "/images/projects/scandi-4/hero-scandi.jpg",
        alt: "Scandi 80: фасад і тераса реалізованого будинку",
        label: "Реалізація",
      },
    ],
    visualGallery: [
      {
        src: "/images/projects/scandi-4/hero-scandi.jpg",
        alt: "Scandi 80: реалізований будинок із широкою терасою",
        label: "Тераса",
      },
      {
        src: "/images/projects/scandi-4/interior-living-01.jpg",
        alt: "Scandi 80: кухня-вітальня з панорамним виходом на терасу",
        label: "Інтер'єр",
      },
      {
        src: "/images/projects/scandi-4/exterior-terrace-02.jpg",
        alt: "Scandi 80: дерев'яна тераса та темний фасад",
        label: "Тераса",
      },
      {
        src: "/images/projects/scandi-4/interior-living-02.jpg",
        alt: "Scandi 80: світле дерев'яне оздоблення вітальні",
        label: "Вітальня",
      },
      {
        src: "/images/projects/scandi-4/exterior-facade-01.jpg",
        alt: "Scandi 80: фасад із великим панорамним вікном",
        label: "Фасад",
      },
      {
        src: "/images/projects/scandi-4/exterior-side-01.jpg",
        alt: "Scandi 80: бічний фасад із темним оздобленням",
        label: "Фасад",
      },
    ],
    realizationTitle: "Від дизайн-проєкту до реалізованого будинку",
    realizationText:
      "Показуємо реалізований Scandi 80: контрастний темний фасад із дерев'яними акцентами, криту терасу, панорамне скління, світле внутрішнє оздоблення та деталі, які формують відчуття заміського будинку.",
    realizationGallery: [
      {
        src: "/images/projects/scandi-4/exterior-terrace-01.jpg",
        alt: "Scandi 80: реалізований фасад з критою терасою",
        label: "Тераса",
      },
      {
        src: "/images/projects/scandi-4/exterior-terrace-02.jpg",
        alt: "Scandi 80: фасад, тераса і панорамне скління",
        label: "Фасад",
      },
      {
        src: "/images/projects/scandi-4/exterior-side-01.jpg",
        alt: "Scandi 80: бічний фасад із темним оздобленням",
        label: "Фасад",
      },
      {
        src: "/images/projects/scandi-4/exterior-facade-01.jpg",
        alt: "Scandi 80: фасад з дерев'яними акцентами",
        label: "Об'єкт",
      },
      {
        src: "/images/projects/scandi-4/interior-living-01.jpg",
        alt: "Scandi 80: кухня-вітальня з панорамними дверима",
        label: "Інтер'єр",
      },
      {
        src: "/images/projects/scandi-4/interior-living-02.jpg",
        alt: "Scandi 80: вітальня зі світлим дерев'яним оздобленням",
        label: "Вітальня",
      },
    ],
    plan: {
      title: "Сімейне планування з двома спальнями та широкою терасою",
      description:
        "Планування Scandi 80 поєднує дві ізольовані спальні, кухню, простору вітальню, ванну кімнату і терасу. Формат підходить для сімейного проживання, дачі, бази відпочинку або серійної забудови.",
      imageSrc: "/images/projects/scandi-4/plan-floor-01.png",
      zones: ["Дві спальні", "Кухня", "Вітальня", "Ванна кімната", "Тераса"],
    },
    specs: [
      { label: "Площа", value: "82,5\u00a0м²" },
      { label: "Людей", value: "2-4" },
      { label: "Спальні", value: "2" },
      { label: "Виробництво", value: "35 днів" },
    ],
    areaSpecs: [
      { label: "Загальна площа з терасою", value: "82,5\u00a0м²" },
      { label: "Чиста площа", value: "69,19\u00a0м²" },
      { label: "Габаритні розміри", value: "7,64 × 11,44\u00a0м" },
      { label: "Тераса", value: "14\u00a0м²" },
      { label: "Кількість поверхів", value: "1" },
      { label: "Вага будинку", value: "14\u00a0т" },
    ],
    rooms: [
      { number: "101", name: "Вітальня", area: "25,82\u00a0м²" },
      { number: "102", name: "Кухня", area: "7,59\u00a0м²" },
      { number: "103", name: "Спальня", area: "8,75\u00a0м²" },
      { number: "104", name: "Дитяча", area: "8,75\u00a0м²" },
      { number: "105", name: "Ванна кімната", area: "4,07\u00a0м²" },
      { number: "106", name: "Тераса", area: "14\u00a0м²" },
    ],
    technicalSpecs: [
      { label: "Тип конструкції", value: "Модульна технологія" },
      {
        label: "Дах",
        value: 'Односхилий, з невеликим ухилом, прихованим парапетом (стиль "фальц" або плоска покрівля)',
      },
      {
        label: "Скління",
        value: "Енергоефективні панорамні вітражі з ламінацією профілю для природного освітлення",
      },
      {
        label: "Опалення",
        value:
          "Комбіноване: тепла підлога та тепловий насос, додатково - дров'яна піч-камін (основний акцент вітальні)",
      },
    ],
    adaptationOptions: [
      "Комплектація: коробка / під ключ",
      "Фасадне оздоблення",
      "Інженерія під сценарій проживання",
      "Внутрішнє оздоблення",
    ],
    scenarios: ["дача", "сімейне проживання", "котеджне містечко", "орендний бізнес"],
    formats: ["коробка", "під ключ", "серійна партія"],
    ctaLabel: "Прорахувати Scandi 80",
  },
  {
    slug: "hotelnyi-modul",
    category: "modular",
    productLabel: "Готельний модуль",
    title: "Мініготель",
    shortTitle: "Готель",
    area: "34,29\u00a0м²",
    summary:
      "Модульний мініготель на 4 автономні номери для придорожнього сервісу, баз відпочинку та серійного номерного фонду.",
    description:
      "Мініготель — витягнутий модульний блок із чотирма автономними житловими номерами, окремими санвузлами та технічним приміщенням. Формат підходить для швидкого запуску номерного фонду вздовж автомагістралей, на базах відпочинку або в сезонному орендному бізнесі.",
    heroImage: "/images/projects/mini-hotel/exterior-night.png",
    heroImageAlt: "Мініготель: модульний готельний блок із вечірнім підсвічуванням",
    detailHeroImage: "/images/projects/mini-hotel/exterior-day.png",
    detailHeroImageAlt: "Мініготель: денний фасад модульного готелю",
    gallery: [
      {
        src: "/images/projects/mini-hotel/exterior-night.png",
        alt: "Мініготель: вечірній фасад",
        label: "Вечір",
      },
      {
        src: "/images/projects/mini-hotel/exterior-day.png",
        alt: "Мініготель: денний фасад",
        label: "День",
      },
      {
        src: "/images/projects/mini-hotel/exterior-side.png",
        alt: "Мініготель: бічний фасад",
        label: "Фасад",
      },
      {
        src: "/images/projects/mini-hotel/render-angle.png",
        alt: "Мініготель: перспективний фасад із відкритим майданчиком",
        label: "Ракурс",
      },
      {
        src: "/images/projects/mini-hotel/render-day.png",
        alt: "Мініготель: денна візуалізація фасаду",
        label: "Фасад",
      },
      {
        src: "/images/projects/mini-hotel/render-evening.png",
        alt: "Мініготель: вечірня візуалізація фасаду",
        label: "Підсвітка",
      },
      {
        src: "/images/projects/mini-hotel/model-exterior-01.png",
        alt: "Мініготель: архітектурна модель фасаду",
        label: "Модель",
      },
      {
        src: "/images/projects/mini-hotel/model-exterior-02.png",
        alt: "Мініготель: архітектурна модель з протилежного ракурсу",
        label: "Модель",
      },
      {
        src: "/images/projects/mini-hotel/model-frame.png",
        alt: "Мініготель: металевий каркас модуля",
        label: "Каркас",
      },
      {
        src: "/images/projects/mini-hotel/model-plan.png",
        alt: "Мініготель: розріз моделі з номерами",
        label: "Планування",
      },
    ],
    visualGallery: [
      {
        src: "/images/projects/mini-hotel/exterior-night.png",
        alt: "Мініготель: вечірній фасад із декоративною підсвіткою",
        label: "Вечір",
      },
      {
        src: "/images/projects/mini-hotel/exterior-day.png",
        alt: "Мініготель: денний фасад модульного готелю",
        label: "День",
      },
      {
        src: "/images/projects/mini-hotel/exterior-side.png",
        alt: "Мініготель: бічний фасад із декоративною підсвіткою",
        label: "Фасад",
      },
      {
        src: "/images/projects/mini-hotel/model-exterior-01.png",
        alt: "Мініготель: архітектурна візуалізація фасаду",
        label: "Візуалізація",
      },
    ],
    modelGallery: [
      {
        src: "/images/projects/mini-hotel/render-evening.png",
        alt: "Мініготель: вечірній рендер фасаду",
        label: "Модель",
      },
      {
        src: "/images/projects/mini-hotel/render-day.png",
        alt: "Мініготель: денний рендер фасаду",
        label: "Модель",
      },
      {
        src: "/images/projects/mini-hotel/render-angle.png",
        alt: "Мініготель: перспективний рендер фасаду",
        label: "Модель",
      },
      {
        src: "/images/projects/mini-hotel/model-exterior-02.png",
        alt: "Мініготель: архітектурна модель з іншого ракурсу",
        label: "Модель",
      },
      {
        src: "/images/projects/mini-hotel/model-frame.png",
        alt: "Мініготель: металевий каркас",
        label: "Каркас",
      },
    ],
    realizationGallery: [
      {
        src: "/images/projects/mini-hotel/realization/facade-01.jpg",
        alt: "Мініготель: реалізований фасад у виробничому цеху",
        label: "Фасад",
      },
      {
        src: "/images/projects/mini-hotel/realization/facade-02.jpg",
        alt: "Мініготель: фасадний модуль після виготовлення",
        label: "Фасад",
      },
      {
        src: "/images/projects/mini-hotel/realization/engineering-01.jpg",
        alt: "Мініготель: технічний блок з інженерними підключеннями",
        label: "Інженерія",
      },
      {
        src: "/images/projects/mini-hotel/realization/interior-01.jpg",
        alt: "Мініготель: номерний блок з вікном і електроопаленням",
        label: "Номер",
      },
      {
        src: "/images/projects/mini-hotel/realization/interior-02.jpg",
        alt: "Мініготель: санвузол реалізованого номера",
        label: "Санвузол",
      },
      {
        src: "/images/projects/mini-hotel/realization/interior-03.jpg",
        alt: "Мініготель: душова зона в санвузлі",
        label: "Душова",
      },
      {
        src: "/images/projects/mini-hotel/realization/interior-04.jpg",
        alt: "Мініготель: душова система в реалізованому санвузлі",
        label: "Сантехніка",
      },
      {
        src: "/images/projects/mini-hotel/realization/interior-05.jpg",
        alt: "Мініготель: шафа, дзеркало і зона умивальника",
        label: "Оздоблення",
      },
    ],
    realizationVideos: [
      {
        src: "/images/projects/mini-hotel/realization/realization-video-01.mp4",
        title: "Відео реалізованого мініготелю",
        poster: "/images/projects/mini-hotel/realization/facade-01.jpg",
      },
    ],
    plan: {
      title: "Чотири автономні номери в одному модульному блоці",
      description:
        "Внутрішній простір поділений на чотири окремі гостьові номери з індивідуальними санвузлами та входами з фасаду. Окреме технічне приміщення дозволяє зручно обслуговувати інженерні системи модуля.",
      imageSrc: "/images/projects/mini-hotel/model-plan.png",
      additionalImages: [
        {
          src: "/images/projects/mini-hotel/plan-floor-01.png",
          alt: "Мініготель: план-схема з чотирма номерами та санвузлами",
        },
      ],
      zones: ["Номер 1", "Номер 2", "Номер 3", "Номер 4", "Санвузли", "Технічне приміщення"],
    },
    specs: [
      { label: "Площа", value: "34,29\u00a0м²" },
      { label: "Номери", value: "4" },
      { label: "Габарити", value: "13,746 × 2,500\u00a0м" },
      { label: "Готовність", value: "під ключ" },
    ],
    areaSpecs: [
      { label: "Загальна площа об'єкта", value: "34,29\u00a0м²" },
      { label: "Внутрішні приміщення", value: "26,80\u00a0м²" },
      { label: "Площа покрівлі", value: "30,77\u00a0м²" },
      { label: "Габаритна довжина", value: "13,746\u00a0м" },
      { label: "Габаритна ширина", value: "2,500\u00a0м" },
      { label: "Висота конструкції", value: "2,895\u00a0м" },
    ],
    rooms: [
      { number: "101", name: "Технічне приміщення", area: "0,88\u00a0м²" },
      { number: "102", name: "Номер 1", area: "4,39\u00a0м²" },
      { number: "103", name: "Санвузол 1", area: "2,10\u00a0м²" },
      { number: "104", name: "Санвузол 2", area: "2,10\u00a0м²" },
      { number: "105", name: "Номер 2", area: "4,37\u00a0м²" },
      { number: "106", name: "Номер 3", area: "4,37\u00a0м²" },
      { number: "107", name: "Санвузол 3", area: "2,10\u00a0м²" },
      { number: "108", name: "Санвузол 4", area: "2,10\u00a0м²" },
      { number: "109", name: "Номер 4", area: "4,39\u00a0м²" },
    ],
    technicalSpecs: [
      { label: "Каркас", value: "Металевий каркас з інтегрованим дерев'яним каркасом" },
      { label: "Стіни та ізоляція", value: "PIR-панелі 50\u00a0мм, базальтова вата 120\u00a0мм, паробар'єрні плівки" },
      { label: "Покрівля", value: "ПВХ-мембрана, базальтова вата 150\u00a0мм, XPS 50\u00a0мм" },
      { label: "Інженерія", value: "32 розетки, LED-підсвітка 24\u00a0м.п. та індивідуальні контролери кондиціонерів" },
    ],
    adaptationOptions: [
      "Кількість номерів у партії",
      "Фасадні HPL-панелі та декоративна підсвітка",
      "Інженерія під сценарій експлуатації",
      "Внутрішнє оздоблення номерів",
    ],
    scenarios: ["мініготель", "придорожній сервіс", "база відпочинку", "орендний бізнес"],
    formats: ["під ключ", "серійна партія", "готовий модуль"],
    ctaLabel: "Прорахувати мініготель",
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
