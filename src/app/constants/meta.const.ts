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
