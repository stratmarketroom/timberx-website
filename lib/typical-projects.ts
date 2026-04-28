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
