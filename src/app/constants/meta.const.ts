import { LanguageCode } from '../models/language-code.type';

export interface LanguageMetaConfig {
  readonly lang: string;
  readonly direction?: 'ltr' | 'rtl';
  readonly title: string;
  readonly description: string;
  readonly keywords: string;
  readonly siteName: string;
  readonly url: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly twitterCard: 'summary' | 'summary_large_image';
  readonly twitterCreator?: string;
  readonly ogType?: string;
  readonly ogLocale: string;
}

export const SOCIAL_PREVIEW_IMAGE = 'https://diegofois.github.io/portfolio/assets/projects/borgo-samarina-cover.png';
export const SITE_URL = 'https://diegofois.github.io/portfolio/';

export const LANGUAGE_META_CONFIGURATION: Record<LanguageCode, LanguageMetaConfig> = {
  it: {
    lang: 'it',
    direction: 'ltr',
    title: 'Portfolio di Diego',
    description:
      'Sviluppatore software junior con un focus su soluzioni full-stack semplici da usare, mantenere e scalare.',
    keywords:
      'Diego Fois, sviluppatore software, full-stack, portfolio, Angular, TypeScript, progetti, web app',
    siteName: 'Portfolio di Diego',
    url: SITE_URL,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: 'Anteprima del portfolio di Diego Fois con i progetti in evidenza',
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'it_IT',
  },
  en: {
    lang: 'en',
    direction: 'ltr',
    title: "Diego's Portfolio",
    description:
      'Junior software developer crafting approachable full-stack experiences that support teams and end users.',
    keywords:
      "Diego Fois, software developer, full-stack, portfolio, Angular, TypeScript, projects, web applications",
    siteName: "Diego's Portfolio",
    url: SITE_URL,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: "Preview of Diego Fois' portfolio showcasing highlighted projects",
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'en_GB',
  },
  de: {
    lang: 'de',
    direction: 'ltr',
    title: 'Diegos Portfolio',
    description:
      'Junior-Softwareentwickler mit Schwerpunkt auf benutzerfreundlichen Full-Stack-Lösungen für Teams und Kunden.',
    keywords:
      'Diego Fois, Softwareentwickler, Full-Stack, Portfolio, Angular, TypeScript, Projekte, Webanwendungen',
    siteName: 'Diegos Portfolio',
    url: SITE_URL,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: 'Vorschau auf Diego Fois’ Portfolio mit hervorgehobenen Projekten',
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'de_DE',
  },
  es: {
    lang: 'es',
    direction: 'ltr',
    title: 'Portfolio de Diego',
    description:
      'Desarrollador de software junior que crea experiencias full-stack accesibles para personas y equipos.',
    keywords:
      'Diego Fois, desarrollador de software, full-stack, portfolio, Angular, TypeScript, proyectos, aplicaciones web',
    siteName: 'Portfolio de Diego',
    url: SITE_URL,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: 'Vista previa del portfolio de Diego Fois con proyectos destacados',
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'es_ES',
  },
  no: {
    lang: 'no',
    direction: 'ltr',
    title: 'Diegos portefølje',
    description:
      'Junior programvareutvikler med fokus på fullstack-løsninger som er enkle å bruke, vedlikeholde og skalere.',
    keywords:
      'Diego Fois, programvareutvikler, fullstack, portefølje, Angular, TypeScript, prosjekter, nettapplikasjoner',
    siteName: 'Diegos portefølje',
    url: SITE_URL,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: 'Forhåndsvisning av Diego Fois sitt portefølje med fremhevede prosjekter',
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'nb_NO',
  },
  ru: {
    lang: 'ru',
    direction: 'ltr',
    title: 'Портфолио Диего',
    description:
      'Младший разработчик программного обеспечения, создающий доступные full-stack решения для команд и пользователей.',
    keywords:
      'Диего Фойс, разработчик программного обеспечения, full-stack, портфолио, Angular, TypeScript, проекты, веб-приложения',
    siteName: 'Портфолио Диего',
    url: SITE_URL,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: 'Превью портфолио Диего Фойса с избранными проектами',
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'ru_RU',
  },
};

export const PRIVACY_LANGUAGE_META_CONFIGURATION: Record<LanguageCode, LanguageMetaConfig> = {
  it: {
    lang: 'it',
    direction: 'ltr',
    title: 'Privacy · Portfolio di Diego',
    description:
      'Informativa su privacy, cookie e diritti per il portfolio di Diego Fois con i riferimenti per contattarlo.',
    keywords:
      'privacy, cookie, trattamento dati, diritti privacy, Diego Fois, portfolio, contatti',
    siteName: 'Portfolio di Diego',
    url: `${SITE_URL}privacy`,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: 'Anteprima del portfolio di Diego Fois con i progetti in evidenza',
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'it_IT',
  },
  en: {
    lang: 'en',
    direction: 'ltr',
    title: "Privacy · Diego's Portfolio",
    description:
      "Privacy notice covering data usage, cookies and contact details for Diego Fois' portfolio.",
    keywords:
      "privacy, cookies, data protection, privacy rights, Diego Fois, portfolio, contact",
    siteName: "Diego's Portfolio",
    url: `${SITE_URL}privacy`,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: "Preview of Diego Fois' portfolio showcasing highlighted projects",
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'en_GB',
  },
  de: {
    lang: 'de',
    direction: 'ltr',
    title: 'Datenschutz · Diegos Portfolio',
    description:
      'Hinweise zu Datenschutz, Cookies und Kontaktmöglichkeiten für das Portfolio von Diego Fois.',
    keywords:
      'Datenschutz, Cookies, Datenverarbeitung, Privatsphäre, Diego Fois, Portfolio, Kontakt',
    siteName: 'Diegos Portfolio',
    url: `${SITE_URL}privacy`,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: 'Vorschau auf Diego Fois’ Portfolio mit hervorgehobenen Projekten',
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'de_DE',
  },
  es: {
    lang: 'es',
    direction: 'ltr',
    title: 'Privacidad · Portfolio de Diego',
    description:
      'Aviso sobre privacidad, cookies y derechos con la información de contacto del portfolio de Diego Fois.',
    keywords:
      'privacidad, cookies, protección de datos, derechos de privacidad, Diego Fois, portfolio, contacto',
    siteName: 'Portfolio de Diego',
    url: `${SITE_URL}privacy`,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: 'Vista previa del portfolio de Diego Fois con proyectos destacados',
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'es_ES',
  },
  no: {
    lang: 'no',
    direction: 'ltr',
    title: 'Personvern · Diegos portefølje',
    description:
      'Personvernerklæring med informasjon om informasjonskapsler og kontakt for Diego Fois sitt portefølje.',
    keywords:
      'personvern, informasjonskapsler, databehandling, personvernrettigheter, Diego Fois, portefølje, kontakt',
    siteName: 'Diegos portefølje',
    url: `${SITE_URL}privacy`,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: 'Forhåndsvisning av Diego Fois sitt portefølje med fremhevede prosjekter',
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'nb_NO',
  },
  ru: {
    lang: 'ru',
    direction: 'ltr',
    title: 'Конфиденциальность · Портфолио Диего',
    description:
      'Информация о конфиденциальности, cookies и контактах для портфолио Диего Фойса.',
    keywords:
      'конфиденциальность, cookies, обработка данных, права, Диего Фойс, портфолио, контакты',
    siteName: 'Портфолио Диего',
    url: `${SITE_URL}privacy`,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: 'Превью портфолио Диего Фойса с избранными проектами',
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'ru_RU',
  },
};

export const ABOUT_LANGUAGE_META_CONFIGURATION: Record<LanguageCode, LanguageMetaConfig> = {
  it: {
    ...LANGUAGE_META_CONFIGURATION.it,
    title: 'Chi sono · Portfolio di Diego',
    description:
      'Approfondisci la storia di Diego Fois, sviluppatore full-stack junior, tra valori, metodologia di lavoro e soft skill che guidano ogni progetto.',
    keywords:
      'Diego Fois, chi sono, biografia, valori, metodo di lavoro, soft skill, sviluppatore software, portfolio',
    url: `${SITE_URL}about`,
  },
  en: {
    ...LANGUAGE_META_CONFIGURATION.en,
    title: "About · Diego's Portfolio",
    description:
      "Learn more about Diego Fois, a junior full-stack developer, including his background, values and collaborative approach to building products.",
    keywords:
      "Diego Fois, about, profile, background, values, working style, software developer, portfolio",
    url: `${SITE_URL}about`,
  },
  de: {
    ...LANGUAGE_META_CONFIGURATION.de,
    title: 'Über mich · Diegos Portfolio',
    description:
      'Lerne Diego Fois kennen – Junior Full-Stack-Entwickler mit Fokus auf Zusammenarbeit, Werte und einem strukturierten Arbeitsansatz.',
    keywords:
      'Diego Fois, Über mich, Profil, Hintergrund, Werte, Arbeitsweise, Softwareentwickler, Portfolio',
    url: `${SITE_URL}about`,
  },
  es: {
    ...LANGUAGE_META_CONFIGURATION.es,
    title: 'Sobre mí · Portfolio de Diego',
    description:
      'Conoce a Diego Fois, desarrollador full-stack junior, su trayectoria, valores y la forma en que colabora con equipos y clientes.',
    keywords:
      'Diego Fois, sobre mí, perfil, trayectoria, valores, forma de trabajo, desarrollador de software, portfolio',
    url: `${SITE_URL}about`,
  },
  no: {
    ...LANGUAGE_META_CONFIGURATION.no,
    title: 'Om meg · Diegos portefølje',
    description:
      'Bli kjent med Diego Fois, junior fullstack-utvikler, hans bakgrunn, verdier og samarbeidsorienterte arbeidsmetode.',
    keywords:
      'Diego Fois, om meg, profil, bakgrunn, verdier, arbeidsmetode, programvareutvikler, portefølje',
    url: `${SITE_URL}about`,
  },
  ru: {
    ...LANGUAGE_META_CONFIGURATION.ru,
    title: 'Обо мне · Портфолио Диего',
    description:
      'Узнайте больше о Диего Фойсе — младшем full-stack разработчике, его опыте, ценностях и подходе к совместной работе.',
    keywords:
      'Диего Фойс, обо мне, профиль, опыт, ценности, стиль работы, разработчик ПО, портфолио',
    url: `${SITE_URL}about`,
  },
};

export const PROJECTS_LANGUAGE_META_CONFIGURATION: Record<LanguageCode, LanguageMetaConfig> = {
  it: {
    ...LANGUAGE_META_CONFIGURATION.it,
    title: 'Progetti · Portfolio di Diego',
    description:
      'Esplora casi studio selezionati con tecnologie front-end e back-end, metriche e lezioni apprese durante il lavoro di Diego Fois.',
    keywords:
      'Diego Fois, progetti, casi studio, applicazioni web, full-stack, risultati, tecnologie, portfolio',
    url: `${SITE_URL}projects`,
  },
  en: {
    ...LANGUAGE_META_CONFIGURATION.en,
    title: "Projects · Diego's Portfolio",
    description:
      "Browse curated case studies highlighting Diego Fois' full-stack work, technical choices, goals and measurable outcomes.",
    keywords:
      "Diego Fois, projects, case studies, web applications, full-stack, results, technologies, portfolio",
    url: `${SITE_URL}projects`,
  },
  de: {
    ...LANGUAGE_META_CONFIGURATION.de,
    title: 'Projekte · Diegos Portfolio',
    description:
      'Entdecke ausgewählte Case-Studies zu den Full-Stack-Projekten von Diego Fois mit technischen Entscheidungen, Zielen und Ergebnissen.',
    keywords:
      'Diego Fois, Projekte, Case Study, Webanwendungen, Full Stack, Ergebnisse, Technologien, Portfolio',
    url: `${SITE_URL}projects`,
  },
  es: {
    ...LANGUAGE_META_CONFIGURATION.es,
    title: 'Proyectos · Portfolio de Diego',
    description:
      'Recorre estudios de caso destacados del trabajo full-stack de Diego Fois, con decisiones técnicas, objetivos y resultados medibles.',
    keywords:
      'Diego Fois, proyectos, estudios de caso, aplicaciones web, full-stack, resultados, tecnologías, portfolio',
    url: `${SITE_URL}projects`,
  },
  no: {
    ...LANGUAGE_META_CONFIGURATION.no,
    title: 'Prosjekter · Diegos portefølje',
    description:
      'Utforsk utvalgte case-studier fra Diego Fois sitt fullstack-arbeid med teknologivalg, mål og målbare resultater.',
    keywords:
      'Diego Fois, prosjekter, case-studier, webapplikasjoner, fullstack, resultater, teknologier, portefølje',
    url: `${SITE_URL}projects`,
  },
  ru: {
    ...LANGUAGE_META_CONFIGURATION.ru,
    title: 'Проекты · Портфолио Диего',
    description:
      'Просмотрите отобранные кейсы full-stack проектов Диего Фойса с техническими решениями, целями и измеримыми результатами.',
    keywords:
      'Диего Фойс, проекты, кейсы, веб-приложения, full-stack, результаты, технологии, портфолио',
    url: `${SITE_URL}projects`,
  },
};

export const SKILLS_LANGUAGE_META_CONFIGURATION: Record<LanguageCode, LanguageMetaConfig> = {
  it: {
    ...LANGUAGE_META_CONFIGURATION.it,
    title: 'Competenze · Portfolio di Diego',
    description:
      'Analizza lo stack tecnologico di Diego Fois con focus su backend, frontend, tooling e DevOps, completo di esempi e punti di forza.',
    keywords:
      'Diego Fois, competenze, stack tecnologico, backend, frontend, tooling, DevOps, sviluppatore, portfolio',
    url: `${SITE_URL}skills`,
  },
  en: {
    ...LANGUAGE_META_CONFIGURATION.en,
    title: "Skills · Diego's Portfolio",
    description:
      "Review Diego Fois' technology stack across back-end, front-end, tooling and DevOps with highlights of experience and strengths.",
    keywords:
      "Diego Fois, skills, technology stack, backend, frontend, tooling, DevOps, software developer, portfolio",
    url: `${SITE_URL}skills`,
  },
  de: {
    ...LANGUAGE_META_CONFIGURATION.de,
    title: 'Fähigkeiten · Diegos Portfolio',
    description:
      'Überblicke den Technologie-Stack von Diego Fois in Back-End, Front-End, Tooling und DevOps inklusive Erfahrungs-Highlights.',
    keywords:
      'Diego Fois, Fähigkeiten, Tech-Stack, Backend, Frontend, Tooling, DevOps, Softwareentwickler, Portfolio',
    url: `${SITE_URL}skills`,
  },
  es: {
    ...LANGUAGE_META_CONFIGURATION.es,
    title: 'Habilidades · Portfolio de Diego',
    description:
      'Consulta el stack tecnológico de Diego Fois en back-end, front-end, herramientas y DevOps, con ejemplos prácticos y fortalezas.',
    keywords:
      'Diego Fois, habilidades, stack tecnológico, backend, frontend, tooling, DevOps, desarrollador, portfolio',
    url: `${SITE_URL}skills`,
  },
  no: {
    ...LANGUAGE_META_CONFIGURATION.no,
    title: 'Teknologistack · Diegos portefølje',
    description:
      'Se Diego Fois sin teknologistack innen backend, frontend, verktøy og DevOps med erfaring og styrker for hver kategori.',
    keywords:
      'Diego Fois, ferdigheter, teknologistack, backend, frontend, verktøy, DevOps, utvikler, portefølje',
    url: `${SITE_URL}skills`,
  },
  ru: {
    ...LANGUAGE_META_CONFIGURATION.ru,
    title: 'Технологический стек · Портфолио Диего',
    description:
      'Изучите технологический стек Диего Фойса: backend, frontend, инструменты и DevOps с ключевыми навыками и примерами.',
    keywords:
      'Диего Фойс, навыки, технологический стек, backend, frontend, инструменты, DevOps, разработчик, портфолио',
    url: `${SITE_URL}skills`,
  },
};

export const EDUCATION_LANGUAGE_META_CONFIGURATION: Record<LanguageCode, LanguageMetaConfig> = {
  it: {
    ...LANGUAGE_META_CONFIGURATION.it,
    title: 'Formazione · Portfolio di Diego',
    description:
      'Ripercorri il percorso formativo di Diego Fois tra università, bootcamp e certificazioni che supportano il suo lavoro full-stack.',
    keywords:
      'Diego Fois, formazione, studi, bootcamp, certificazioni, istruzione, sviluppatore, portfolio',
    url: `${SITE_URL}education`,
  },
  en: {
    ...LANGUAGE_META_CONFIGURATION.en,
    title: "Education · Diego's Portfolio",
    description:
      "Follow Diego Fois' education path across university studies, bootcamps and certifications that strengthen his full-stack practice.",
    keywords:
      "Diego Fois, education, studies, bootcamp, certifications, learning, software developer, portfolio",
    url: `${SITE_URL}education`,
  },
  de: {
    ...LANGUAGE_META_CONFIGURATION.de,
    title: 'Ausbildung · Diegos Portfolio',
    description:
      'Verfolge die Ausbildung von Diego Fois mit Studium, Bootcamps und Zertifizierungen, die seine Full-Stack-Kompetenz prägen.',
    keywords:
      'Diego Fois, Ausbildung, Studium, Bootcamp, Zertifizierungen, Lernen, Softwareentwickler, Portfolio',
    url: `${SITE_URL}education`,
  },
  es: {
    ...LANGUAGE_META_CONFIGURATION.es,
    title: 'Educación · Portfolio de Diego',
    description:
      'Descubre la formación académica y profesional de Diego Fois con estudios, bootcamps y certificaciones para el desarrollo full-stack.',
    keywords:
      'Diego Fois, educación, estudios, bootcamp, certificaciones, aprendizaje, desarrollador, portfolio',
    url: `${SITE_URL}education`,
  },
  no: {
    ...LANGUAGE_META_CONFIGURATION.no,
    title: 'Utdanning · Diegos portefølje',
    description:
      'Se utdanningsløpet til Diego Fois med studier, bootcamp og sertifiseringer som støtter fullstack-kompetansen hans.',
    keywords:
      'Diego Fois, utdanning, studier, bootcamp, sertifiseringer, læring, utvikler, portefølje',
    url: `${SITE_URL}education`,
  },
  ru: {
    ...LANGUAGE_META_CONFIGURATION.ru,
    title: 'Образование · Портфолио Диего',
    description:
      'Узнайте об образовании Диего Фойса: университет, буткемпы и сертификаты, которые подпитывают его full-stack практику.',
    keywords:
      'Диего Фойс, образование, обучение, буткемп, сертификаты, обучение, разработчик, портфолио',
    url: `${SITE_URL}education`,
  },
};

export const EXPERIENCES_LANGUAGE_META_CONFIGURATION: Record<LanguageCode, LanguageMetaConfig> = {
  it: {
    ...LANGUAGE_META_CONFIGURATION.it,
    title: 'Esperienze · Portfolio di Diego',
    description:
      'Scopri le esperienze professionali di Diego Fois con ruoli, responsabilità e risultati concreti maturati in team multidisciplinari.',
    keywords:
      'Diego Fois, esperienze professionali, ruoli, responsabilità, risultati, collaborazione, sviluppatore, portfolio',
    url: `${SITE_URL}experiences`,
  },
  en: {
    ...LANGUAGE_META_CONFIGURATION.en,
    title: "Experiences · Diego's Portfolio",
    description:
      "Review Diego Fois' professional experience with roles, responsibilities and impact achieved while collaborating with cross-functional teams.",
    keywords:
      "Diego Fois, experience, roles, responsibilities, results, collaboration, software developer, portfolio",
    url: `${SITE_URL}experiences`,
  },
  de: {
    ...LANGUAGE_META_CONFIGURATION.de,
    title: 'Erfahrung · Diegos Portfolio',
    description:
      'Erfahre mehr über die Berufserfahrung von Diego Fois mit Rollen, Verantwortlichkeiten und messbaren Ergebnissen in interdisziplinären Teams.',
    keywords:
      'Diego Fois, Erfahrung, Rollen, Verantwortlichkeiten, Ergebnisse, Zusammenarbeit, Softwareentwickler, Portfolio',
    url: `${SITE_URL}experiences`,
  },
  es: {
    ...LANGUAGE_META_CONFIGURATION.es,
    title: 'Experiencia · Portfolio de Diego',
    description:
      'Revisa la experiencia profesional de Diego Fois con roles, responsabilidades e impacto obtenido en equipos multidisciplinarios.',
    keywords:
      'Diego Fois, experiencia, roles, responsabilidades, resultados, colaboración, desarrollador, portfolio',
    url: `${SITE_URL}experiences`,
  },
  no: {
    ...LANGUAGE_META_CONFIGURATION.no,
    title: 'Erfaring · Diegos portefølje',
    description:
      'Les om Diego Fois sin arbeidserfaring med roller, ansvar og effekt skapt sammen med tverrfaglige team.',
    keywords:
      'Diego Fois, erfaring, roller, ansvar, resultater, samarbeid, utvikler, portefølje',
    url: `${SITE_URL}experiences`,
  },
  ru: {
    ...LANGUAGE_META_CONFIGURATION.ru,
    title: 'Опыт · Портфолио Диего',
    description:
      'Ознакомьтесь с профессиональным опытом Диего Фойса: роли, обязанности и вклад в проектах кросс-функциональных команд.',
    keywords:
      'Диего Фойс, опыт, роли, обязанности, результаты, сотрудничество, разработчик, портфолио',
    url: `${SITE_URL}experiences`,
  },
};

export const STATS_LANGUAGE_META_CONFIGURATION: Record<LanguageCode, LanguageMetaConfig> = {
  it: {
    ...LANGUAGE_META_CONFIGURATION.it,
    title: 'Statistiche · Portfolio di Diego',
    description:
      'Consulta i numeri chiave di Diego Fois: progetti consegnati, righe di codice, ore di formazione e altre metriche interattive.',
    keywords:
      'Diego Fois, statistiche, numeri chiave, metriche, progetti, produttività, portfolio',
    url: `${SITE_URL}stats`,
  },
  en: {
    ...LANGUAGE_META_CONFIGURATION.en,
    title: "Stats · Diego's Portfolio",
    description:
      "Dive into Diego Fois' key numbers including delivered projects, lines of code, learning hours and other interactive metrics.",
    keywords:
      "Diego Fois, stats, key numbers, metrics, projects, productivity, portfolio",
    url: `${SITE_URL}stats`,
  },
  de: {
    ...LANGUAGE_META_CONFIGURATION.de,
    title: 'Statistiken · Diegos Portfolio',
    description:
      'Erhalte Einblick in die Kennzahlen von Diego Fois: abgeschlossene Projekte, Codezeilen, Lernstunden und weitere interaktive Metriken.',
    keywords:
      'Diego Fois, Statistiken, Kennzahlen, Metriken, Projekte, Produktivität, Portfolio',
    url: `${SITE_URL}stats`,
  },
  es: {
    ...LANGUAGE_META_CONFIGURATION.es,
    title: 'Estadísticas · Portfolio de Diego',
    description:
      'Revisa los números clave de Diego Fois: proyectos entregados, líneas de código, horas de formación y otras métricas interactivas.',
    keywords:
      'Diego Fois, estadísticas, números clave, métricas, proyectos, productividad, portfolio',
    url: `${SITE_URL}stats`,
  },
  no: {
    ...LANGUAGE_META_CONFIGURATION.no,
    title: 'Nøkkeltall · Diegos portefølje',
    description:
      'Utforsk nøkkeltall for Diego Fois: leverte prosjekter, kodelinjer, læringstimer og andre interaktive målinger.',
    keywords:
      'Diego Fois, statistikk, nøkkeltall, metrikker, prosjekter, produktivitet, portefølje',
    url: `${SITE_URL}stats`,
  },
  ru: {
    ...LANGUAGE_META_CONFIGURATION.ru,
    title: 'Ключевые показатели · Портфолио Диего',
    description:
      'Изучите ключевые показатели Диего Фойса: завершённые проекты, строки кода, часы обучения и другие интерактивные метрики.',
    keywords:
      'Диего Фойс, статистика, ключевые показатели, метрики, проекты, продуктивность, портфолио',
    url: `${SITE_URL}stats`,
  },
};

export const CONTACT_LANGUAGE_META_CONFIGURATION: Record<LanguageCode, LanguageMetaConfig> = {
  it: {
    ...LANGUAGE_META_CONFIGURATION.it,
    title: 'Contatti · Portfolio di Diego',
    description:
      'Invia un messaggio a Diego Fois tramite modulo, email o canali social per collaborazioni, domande o consulenze.',
    keywords:
      'Diego Fois, contatti, email, modulo, social, collaborazioni, sviluppatore, portfolio',
    url: `${SITE_URL}contact`,
  },
  en: {
    ...LANGUAGE_META_CONFIGURATION.en,
    title: "Contact · Diego's Portfolio",
    description:
      "Reach out to Diego Fois via form, email or social channels to discuss collaborations, questions or project ideas.",
    keywords:
      "Diego Fois, contact, email, form, social media, collaboration, software developer, portfolio",
    url: `${SITE_URL}contact`,
  },
  de: {
    ...LANGUAGE_META_CONFIGURATION.de,
    title: 'Kontakt · Diegos Portfolio',
    description:
      'Nimm Kontakt zu Diego Fois über Formular, E-Mail oder soziale Netzwerke auf, um Kooperationen, Fragen oder Projektideen zu besprechen.',
    keywords:
      'Diego Fois, Kontakt, E-Mail, Formular, Social Media, Zusammenarbeit, Softwareentwickler, Portfolio',
    url: `${SITE_URL}contact`,
  },
  es: {
    ...LANGUAGE_META_CONFIGURATION.es,
    title: 'Contacto · Portfolio de Diego',
    description:
      'Escribe a Diego Fois mediante el formulario, correo electrónico o redes sociales para hablar de colaboraciones, dudas o ideas de proyecto.',
    keywords:
      'Diego Fois, contacto, correo electrónico, formulario, redes sociales, colaboración, desarrollador, portfolio',
    url: `${SITE_URL}contact`,
  },
  no: {
    ...LANGUAGE_META_CONFIGURATION.no,
    title: 'Kontakt · Diegos portefølje',
    description:
      'Ta kontakt med Diego Fois via skjema, e-post eller sosiale kanaler for samarbeid, spørsmål eller prosjektideer.',
    keywords:
      'Diego Fois, kontakt, e-post, skjema, sosiale medier, samarbeid, utvikler, portefølje',
    url: `${SITE_URL}contact`,
  },
  ru: {
    ...LANGUAGE_META_CONFIGURATION.ru,
    title: 'Контакты · Портфолио Диего',
    description:
      'Свяжитесь с Диего Фойсом через форму, электронную почту или социальные сети, чтобы обсудить сотрудничество, вопросы или идеи проектов.',
    keywords:
      'Диего Фойс, контакты, электронная почта, форма, социальные сети, сотрудничество, разработчик, портфолио',
    url: `${SITE_URL}contact`,
  },
};

export type MetaKey =
  | 'home'
  | 'privacy'
  | 'about'
  | 'projects'
  | 'skills'
  | 'education'
  | 'experiences'
  | 'stats'
  | 'contact';

export const META_CONFIGURATION_DICTIONARY: Record<MetaKey, Record<LanguageCode, LanguageMetaConfig>> = {
  home: LANGUAGE_META_CONFIGURATION,
  privacy: PRIVACY_LANGUAGE_META_CONFIGURATION,
  about: ABOUT_LANGUAGE_META_CONFIGURATION,
  projects: PROJECTS_LANGUAGE_META_CONFIGURATION,
  skills: SKILLS_LANGUAGE_META_CONFIGURATION,
  education: EDUCATION_LANGUAGE_META_CONFIGURATION,
  experiences: EXPERIENCES_LANGUAGE_META_CONFIGURATION,
  stats: STATS_LANGUAGE_META_CONFIGURATION,
  contact: CONTACT_LANGUAGE_META_CONFIGURATION,
};

export const DEFAULT_META_KEY: MetaKey = 'home';
