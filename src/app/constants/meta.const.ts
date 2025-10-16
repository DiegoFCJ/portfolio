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

export type PageMetaKey =
  | 'home'
  | 'about'
  | 'projects'
  | 'skills'
  | 'education'
  | 'experiences'
  | 'stats'
  | 'contact'
  | 'privacy';

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
      'Datenschutzhinweise zu Datenverwendung, Cookies und Kontaktmöglichkeiten im Portfolio von Diego Fois.',
    keywords:
      'Datenschutz, Cookies, Datenverarbeitung, Privatsphäre, Rechte, Diego Fois, Portfolio, Kontakt',
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
      'Aviso de privacidad con información sobre el uso de datos, cookies y datos de contacto del portfolio de Diego Fois.',
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
      'Personvernerklæring med detaljer om databruk, cookies og kontaktinformasjon for Diego Fois sitt portefølje.',
    keywords:
      'personvern, cookies, databehandling, personvernrettigheter, Diego Fois, portefølje, kontakt',
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
      'Политика конфиденциальности портфолио Диего Фойса с описанием cookies, обработки данных и способов связи.',
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
    lang: 'it',
    direction: 'ltr',
    title: 'Chi sono · Portfolio di Diego',
    description:
      'Conosci il percorso personale e professionale di Diego Fois, sviluppatore software junior appassionato di esperienze full-stack accessibili.',
    keywords:
      'Diego Fois, biografia, chi sono, valori, percorso professionale, sviluppatore software, full-stack',
    siteName: 'Portfolio di Diego',
    url: `${SITE_URL}about`,
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
    title: "About · Diego's Portfolio",
    description:
      "Learn about Diego Fois' background, values and goals as a junior software developer focused on full-stack experiences.",
    keywords:
      "Diego Fois, about, biography, background, software developer, full-stack, values",
    siteName: "Diego's Portfolio",
    url: `${SITE_URL}about`,
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
    title: 'Über mich · Diegos Portfolio',
    description:
      'Erfahre mehr über Hintergrund, Werte und Ziele von Diego Fois, einem Junior-Softwareentwickler mit Fokus auf Full-Stack-Erlebnisse.',
    keywords:
      'Diego Fois, über mich, Biografie, Hintergrund, Softwareentwickler, Full-Stack, Werte',
    siteName: 'Diegos Portfolio',
    url: `${SITE_URL}about`,
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
    title: 'Sobre mí · Portfolio de Diego',
    description:
      'Descubre la trayectoria, los valores y los objetivos de Diego Fois, desarrollador de software junior enfocado en experiencias full-stack.',
    keywords:
      'Diego Fois, sobre mí, biografía, trayectoria, desarrollador de software, full-stack, valores',
    siteName: 'Portfolio de Diego',
    url: `${SITE_URL}about`,
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
    title: 'Om meg · Diegos portefølje',
    description:
      'Bli kjent med bakgrunn, verdier og mål til Diego Fois, en junior programvareutvikler med fokus på brukervennlige fullstack-opplevelser.',
    keywords:
      'Diego Fois, om meg, biografi, bakgrunn, programvareutvikler, fullstack, verdier',
    siteName: 'Diegos portefølje',
    url: `${SITE_URL}about`,
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
    title: 'Обо мне · Портфолио Диего',
    description:
      'Узнайте об образовании, ценностях и целях Диего Фойса — младшего разработчика, создающего доступные full-stack решения.',
    keywords:
      'Диего Фойс, обо мне, биография, разработчик программного обеспечения, full-stack, ценности',
    siteName: 'Портфолио Диего',
    url: `${SITE_URL}about`,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: 'Превью портфолио Диего Фойса с избранными проектами',
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'ru_RU',
  },
};

export const PROJECTS_LANGUAGE_META_CONFIGURATION: Record<LanguageCode, LanguageMetaConfig> = {
  it: {
    lang: 'it',
    direction: 'ltr',
    title: 'Progetti · Portfolio di Diego',
    description:
      'Selezione di progetti full-stack di Diego Fois con focus su Angular, TypeScript e applicazioni web accessibili.',
    keywords:
      'Diego Fois, progetti, case study, Angular, TypeScript, full-stack, applicazioni web',
    siteName: 'Portfolio di Diego',
    url: `${SITE_URL}projects`,
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
    title: "Projects · Diego's Portfolio",
    description:
      'Explore full-stack projects by Diego Fois featuring Angular, TypeScript and accessible web applications.',
    keywords:
      "Diego Fois, projects, case studies, Angular, TypeScript, full-stack, web applications",
    siteName: "Diego's Portfolio",
    url: `${SITE_URL}projects`,
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
    title: 'Projekte · Diegos Portfolio',
    description:
      'Ausgewählte Full-Stack-Projekte von Diego Fois mit Angular, TypeScript und zugänglichen Webanwendungen.',
    keywords:
      'Diego Fois, Projekte, Fallstudien, Angular, TypeScript, Full-Stack, Webanwendungen',
    siteName: 'Diegos Portfolio',
    url: `${SITE_URL}projects`,
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
    title: 'Proyectos · Portfolio de Diego',
    description:
      'Proyectos full-stack de Diego Fois con Angular, TypeScript y aplicaciones web accesibles.',
    keywords:
      'Diego Fois, proyectos, casos de estudio, Angular, TypeScript, full-stack, aplicaciones web',
    siteName: 'Portfolio de Diego',
    url: `${SITE_URL}projects`,
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
    title: 'Prosjekter · Diegos portefølje',
    description:
      'Utvalgte fullstack-prosjekter av Diego Fois med Angular, TypeScript og tilgjengelige nettapplikasjoner.',
    keywords:
      'Diego Fois, prosjekter, casestudier, Angular, TypeScript, fullstack, nettapplikasjoner',
    siteName: 'Diegos portefølje',
    url: `${SITE_URL}projects`,
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
    title: 'Проекты · Портфолио Диего',
    description:
      'Подборка full-stack проектов Диего Фойса с использованием Angular, TypeScript и доступных веб-приложений.',
    keywords:
      'Диего Фойс, проекты, кейсы, Angular, TypeScript, full-stack, веб-приложения',
    siteName: 'Портфолио Диего',
    url: `${SITE_URL}projects`,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: 'Превью портфолио Диего Фойса с избранными проектами',
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'ru_RU',
  },
};

export const SKILLS_LANGUAGE_META_CONFIGURATION: Record<LanguageCode, LanguageMetaConfig> = {
  it: {
    lang: 'it',
    direction: 'ltr',
    title: 'Competenze · Portfolio di Diego',
    description:
      'Competenze tecniche e trasversali di Diego Fois tra frontend, backend, UX writing e collaborazione di team.',
    keywords:
      'Diego Fois, competenze, frontend, backend, soft skills, UX, collaborazione, TypeScript',
    siteName: 'Portfolio di Diego',
    url: `${SITE_URL}skills`,
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
    title: "Skills · Diego's Portfolio",
    description:
      'Technical and collaborative skills Diego Fois uses across frontend, backend, UX writing and teamwork.',
    keywords:
      "Diego Fois, skills, frontend, backend, soft skills, UX, teamwork, TypeScript",
    siteName: "Diego's Portfolio",
    url: `${SITE_URL}skills`,
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
    title: 'Fähigkeiten · Diegos Portfolio',
    description:
      'Technische und kollaborative Fähigkeiten von Diego Fois in Frontend, Backend, UX Writing und Teamarbeit.',
    keywords:
      'Diego Fois, Fähigkeiten, Frontend, Backend, Soft Skills, UX, Teamarbeit, TypeScript',
    siteName: 'Diegos Portfolio',
    url: `${SITE_URL}skills`,
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
    title: 'Competencias · Portfolio de Diego',
    description:
      'Competencias técnicas y transversales de Diego Fois en frontend, backend, redacción UX y trabajo en equipo.',
    keywords:
      'Diego Fois, competencias, frontend, backend, habilidades blandas, UX, trabajo en equipo, TypeScript',
    siteName: 'Portfolio de Diego',
    url: `${SITE_URL}skills`,
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
    title: 'Kompetanser · Diegos portefølje',
    description:
      'Tekniske og samarbeidsmessige ferdigheter Diego Fois bruker i frontend, backend, UX-skriving og teamarbeid.',
    keywords:
      'Diego Fois, kompetanser, frontend, backend, myke ferdigheter, UX, teamarbeid, TypeScript',
    siteName: 'Diegos portefølje',
    url: `${SITE_URL}skills`,
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
    title: 'Навыки · Портфолио Диего',
    description:
      'Технические и коммуникационные навыки Диего Фойса: фронтенд, бэкенд, UX-райтинг и командная работа.',
    keywords:
      'Диего Фойс, навыки, фронтенд, бэкенд, soft skills, UX, командная работа, TypeScript',
    siteName: 'Портфолио Диего',
    url: `${SITE_URL}skills`,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: 'Превью портфолио Диего Фойса с избранными проектами',
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'ru_RU',
  },
};

export const EDUCATION_LANGUAGE_META_CONFIGURATION: Record<LanguageCode, LanguageMetaConfig> = {
  it: {
    lang: 'it',
    direction: 'ltr',
    title: 'Formazione · Portfolio di Diego',
    description:
      'Percorso formativo di Diego Fois tra studi universitari, corsi professionali e certificazioni sullo sviluppo software.',
    keywords:
      'Diego Fois, formazione, studi, istruzione, corsi, certificazioni, sviluppo software',
    siteName: 'Portfolio di Diego',
    url: `${SITE_URL}education`,
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
    title: "Education · Diego's Portfolio",
    description:
      'Academic path, professional courses and certifications that shaped Diego Fois as a software developer.',
    keywords:
      "Diego Fois, education, studies, courses, certifications, software development",
    siteName: "Diego's Portfolio",
    url: `${SITE_URL}education`,
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
    title: 'Ausbildung · Diegos Portfolio',
    description:
      'Ausbildung, Studien und Zertifizierungen, die Diego Fois als Softwareentwickler geprägt haben.',
    keywords:
      'Diego Fois, Ausbildung, Studium, Kurse, Zertifizierungen, Softwareentwicklung',
    siteName: 'Diegos Portfolio',
    url: `${SITE_URL}education`,
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
    title: 'Formación · Portfolio de Diego',
    description:
      'Formación académica, cursos y certificaciones que consolidan a Diego Fois como desarrollador de software.',
    keywords:
      'Diego Fois, formación, estudios, cursos, certificaciones, desarrollo de software',
    siteName: 'Portfolio de Diego',
    url: `${SITE_URL}education`,
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
    title: 'Utdanning · Diegos portefølje',
    description:
      'Studier, kurs og sertifiseringer som har formet Diego Fois som programvareutvikler.',
    keywords:
      'Diego Fois, utdanning, studier, kurs, sertifiseringer, programvareutvikling',
    siteName: 'Diegos portefølje',
    url: `${SITE_URL}education`,
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
    title: 'Образование · Портфолио Диего',
    description:
      'Учёба, курсы и сертификаты, которые помогли Диего Фойсу стать разработчиком программного обеспечения.',
    keywords:
      'Диего Фойс, образование, обучение, курсы, сертификаты, разработка ПО',
    siteName: 'Портфолио Диего',
    url: `${SITE_URL}education`,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: 'Превью портфолио Диего Фойса с избранными проектами',
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'ru_RU',
  },
};

export const EXPERIENCES_LANGUAGE_META_CONFIGURATION: Record<LanguageCode, LanguageMetaConfig> = {
  it: {
    lang: 'it',
    direction: 'ltr',
    title: 'Esperienze · Portfolio di Diego',
    description:
      'Esperienze lavorative e volontarie di Diego Fois come sviluppatore software e supporto ai team digitali.',
    keywords:
      'Diego Fois, esperienze lavorative, esperienza professionale, volontariato, sviluppo software, team digitali',
    siteName: 'Portfolio di Diego',
    url: `${SITE_URL}experiences`,
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
    title: "Experiences · Diego's Portfolio",
    description:
      'Professional and volunteer experiences where Diego Fois supported digital teams as a software developer.',
    keywords:
      "Diego Fois, work experience, volunteering, software developer, digital teams, career",
    siteName: "Diego's Portfolio",
    url: `${SITE_URL}experiences`,
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
    title: 'Erfahrungen · Diegos Portfolio',
    description:
      'Berufliche und ehrenamtliche Stationen, in denen Diego Fois digitale Teams als Softwareentwickler unterstützt hat.',
    keywords:
      'Diego Fois, Berufserfahrung, Ehrenamt, Softwareentwickler, digitale Teams, Karriere',
    siteName: 'Diegos Portfolio',
    url: `${SITE_URL}experiences`,
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
    title: 'Experiencias · Portfolio de Diego',
    description:
      'Experiencias profesionales y voluntarias en las que Diego Fois apoyó a equipos digitales como desarrollador.',
    keywords:
      'Diego Fois, experiencia laboral, voluntariado, desarrollador de software, equipos digitales, carrera',
    siteName: 'Portfolio de Diego',
    url: `${SITE_URL}experiences`,
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
    title: 'Erfaringer · Diegos portefølje',
    description:
      'Yrkes- og frivillige erfaringer hvor Diego Fois støttet digitale team som programvareutvikler.',
    keywords:
      'Diego Fois, arbeidserfaring, frivillig arbeid, programvareutvikler, digitale team, karriere',
    siteName: 'Diegos portefølje',
    url: `${SITE_URL}experiences`,
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
    title: 'Опыт · Портфолио Диего',
    description:
      'Профессиональный и волонтёрский опыт Диего Фойса в поддержке цифровых команд как разработчика.',
    keywords:
      'Диего Фойс, опыт работы, волонтёрство, разработчик ПО, цифровые команды, карьера',
    siteName: 'Портфолио Диего',
    url: `${SITE_URL}experiences`,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: 'Превью портфолио Диего Фойса с избранными проектами',
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'ru_RU',
  },
};

export const STATS_LANGUAGE_META_CONFIGURATION: Record<LanguageCode, LanguageMetaConfig> = {
  it: {
    lang: 'it',
    direction: 'ltr',
    title: 'Numeri chiave · Portfolio di Diego',
    description:
      'Metriche e risultati misurabili del lavoro di Diego Fois per valutare impatto, produttività e crescita tecnica.',
    keywords:
      'Diego Fois, numeri chiave, metriche, risultati, produttività, crescita tecnica',
    siteName: 'Portfolio di Diego',
    url: `${SITE_URL}stats`,
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
    title: "Stats · Diego's Portfolio",
    description:
      'Key metrics summarising the impact, productivity and learning progress of Diego Fois.',
    keywords:
      "Diego Fois, stats, metrics, results, productivity, growth, impact",
    siteName: "Diego's Portfolio",
    url: `${SITE_URL}stats`,
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
    title: 'Kennzahlen · Diegos Portfolio',
    description:
      'Wichtige Kennzahlen zu Wirkung, Produktivität und Lernfortschritt von Diego Fois.',
    keywords:
      'Diego Fois, Kennzahlen, Metriken, Ergebnisse, Produktivität, Wachstum, Wirkung',
    siteName: 'Diegos Portfolio',
    url: `${SITE_URL}stats`,
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
    title: 'Números clave · Portfolio de Diego',
    description:
      'Indicadores clave sobre el impacto, la productividad y el aprendizaje continuo de Diego Fois.',
    keywords:
      'Diego Fois, números clave, métricas, resultados, productividad, crecimiento, impacto',
    siteName: 'Portfolio de Diego',
    url: `${SITE_URL}stats`,
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
    title: 'Nøkkeltall · Diegos portefølje',
    description:
      'Nøkkeltall som viser effekt, produktivitet og læringsutvikling for Diego Fois.',
    keywords:
      'Diego Fois, nøkkeltall, måltall, resultater, produktivitet, vekst, effekt',
    siteName: 'Diegos portefølje',
    url: `${SITE_URL}stats`,
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
    title: 'Статистика · Портфолио Диего',
    description:
      'Ключевые показатели, отражающие влияние, продуктивность и развитие навыков Диего Фойса.',
    keywords:
      'Диего Фойс, статистика, показатели, результаты, продуктивность, рост, влияние',
    siteName: 'Портфолио Диего',
    url: `${SITE_URL}stats`,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: 'Превью портфолио Диего Фойса с избранными проектами',
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'ru_RU',
  },
};

export const CONTACT_LANGUAGE_META_CONFIGURATION: Record<LanguageCode, LanguageMetaConfig> = {
  it: {
    lang: 'it',
    direction: 'ltr',
    title: 'Contatti · Portfolio di Diego',
    description:
      'Scrivi a Diego Fois per collaborazioni, richieste professionali o feedback sul portfolio.',
    keywords:
      'Diego Fois, contatti, email, collaborazioni, richieste, portfolio',
    siteName: 'Portfolio di Diego',
    url: `${SITE_URL}contact`,
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
    title: "Contact · Diego's Portfolio",
    description:
      'Reach out to Diego Fois for collaborations, professional opportunities or feedback about the portfolio.',
    keywords:
      "Diego Fois, contact, email, collaborations, opportunities, portfolio",
    siteName: "Diego's Portfolio",
    url: `${SITE_URL}contact`,
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
    title: 'Kontakt · Diegos Portfolio',
    description:
      'Nimm Kontakt zu Diego Fois für Kooperationen, berufliche Anfragen oder Feedback zum Portfolio auf.',
    keywords:
      'Diego Fois, Kontakt, E-Mail, Kooperationen, Anfragen, Portfolio',
    siteName: 'Diegos Portfolio',
    url: `${SITE_URL}contact`,
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
    title: 'Contactos · Portfolio de Diego',
    description:
      'Escribe a Diego Fois para colaboraciones, oportunidades profesionales o comentarios sobre el portfolio.',
    keywords:
      'Diego Fois, contacto, correo, colaboraciones, oportunidades, portfolio',
    siteName: 'Portfolio de Diego',
    url: `${SITE_URL}contact`,
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
    title: 'Kontakt · Diegos portefølje',
    description:
      'Ta kontakt med Diego Fois for samarbeid, jobbmuligheter eller tilbakemeldinger på porteføljen.',
    keywords:
      'Diego Fois, kontakt, e-post, samarbeid, muligheter, portefølje',
    siteName: 'Diegos portefølje',
    url: `${SITE_URL}contact`,
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
    title: 'Контакты · Портфолио Диего',
    description:
      'Свяжитесь с Диего Фойсом для сотрудничества, профессиональных предложений или отзывов о портфолио.',
    keywords:
      'Диего Фойс, контакты, email, сотрудничество, предложения, портфолио',
    siteName: 'Портфолио Диего',
    url: `${SITE_URL}contact`,
    image: SOCIAL_PREVIEW_IMAGE,
    imageAlt: 'Превью портфолио Диего Фойса с избранными проектами',
    twitterCard: 'summary_large_image',
    twitterCreator: '@diegofois',
    ogType: 'website',
    ogLocale: 'ru_RU',
  },
};

export const PAGE_LANGUAGE_META_CONFIGURATION: Record<PageMetaKey, Record<LanguageCode, LanguageMetaConfig>> = {
  home: LANGUAGE_META_CONFIGURATION,
  about: ABOUT_LANGUAGE_META_CONFIGURATION,
  projects: PROJECTS_LANGUAGE_META_CONFIGURATION,
  skills: SKILLS_LANGUAGE_META_CONFIGURATION,
  education: EDUCATION_LANGUAGE_META_CONFIGURATION,
  experiences: EXPERIENCES_LANGUAGE_META_CONFIGURATION,
  stats: STATS_LANGUAGE_META_CONFIGURATION,
  contact: CONTACT_LANGUAGE_META_CONFIGURATION,
  privacy: PRIVACY_LANGUAGE_META_CONFIGURATION,
};
