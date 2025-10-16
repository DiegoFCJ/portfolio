import { LanguageCode } from '../models/language-code.type';
import { ThemeKey } from '../models/theme-key.type';

export interface NavigatorTooltipDictionary {
  prev: string;
  next: string;
  theme: string;
  language: string;
  pages: string;
}

export interface ToggleButtonLabels {
  open: string;
  close: string;
}

export interface NavigatorPageLinkDefinition {
  path: string;
  labels: Record<LanguageCode, string>;
}

export const AVAILABLE_THEMES: ThemeKey[] = ['light', 'dark', 'blue', 'green', 'red'];

export const AVAILABLE_LANGUAGES: LanguageCode[] = ['en', 'it', 'de', 'es', 'no', 'ru'];

export const NAVIGATOR_TOOLTIP_FALLBACK_ORDER: LanguageCode[] = ['it', 'en', 'de', 'es', 'no', 'ru'];

export const NAVIGATOR_TOOLTIPS: Record<LanguageCode, NavigatorTooltipDictionary> = {
  en: {
    prev: 'Previous section',
    next: 'Next section',
    theme: 'Theme',
    language: 'Language',
    pages: 'Open page menu',
  },
  it: {
    prev: 'Sezione precedente',
    next: 'Sezione successiva',
    theme: 'Tema',
    language: 'Lingua',
    pages: 'Apri il menu delle pagine',
  },
  de: {
    prev: 'Vorheriger Abschnitt',
    next: 'Nächster Abschnitt',
    theme: 'Thema',
    language: 'Sprache',
    pages: 'Seitenmenü öffnen',
  },
  es: {
    prev: 'Sección anterior',
    next: 'Siguiente sección',
    theme: 'Tema',
    language: 'Idioma',
    pages: 'Abrir el menú de páginas',
  },
  no: {
    prev: 'Forrige seksjon',
    next: 'Neste seksjon',
    theme: 'Tema',
    language: 'Språk',
    pages: 'Åpne sidemenyen',
  },
  ru: {
    prev: 'Предыдущий раздел',
    next: 'Следующий раздел',
    theme: 'Тема',
    language: 'Язык',
    pages: 'Открыть меню страниц',
  },
};

export const NAVIGATOR_TOGGLE_BUTTON_LABELS: Record<LanguageCode, ToggleButtonLabels> = {
  en: { open: 'Open navigator', close: 'Close navigator' },
  it: { open: 'Apri navigatore', close: 'Chiudi navigatore' },
  de: { open: 'Navigator öffnen', close: 'Navigator schließen' },
  es: { open: 'Abrir navegador', close: 'Cerrar navegador' },
  no: { open: 'Åpne navigator', close: 'Lukk navigator' },
  ru: { open: 'Открыть навигатор', close: 'Закрыть навигатор' },
};

export const NAVIGATOR_MENU_LABELS: Record<LanguageCode, string> = {
  en: 'Menu',
  it: 'Menu',
  de: 'Menü',
  es: 'Menú',
  no: 'Meny',
  ru: 'Меню',
};

export const NAVIGATOR_THEME_NAMES: Record<LanguageCode, Record<ThemeKey, string>> = {
  en: { light: 'Light theme', dark: 'Dark theme', blue: 'Blue theme', green: 'Green theme', red: 'Red theme' },
  it: { light: 'Tema chiaro', dark: 'Tema scuro', blue: 'Tema blu', green: 'Tema verde', red: 'Tema rosso' },
  de: { light: 'Helles Thema', dark: 'Dunkles Thema', blue: 'Blaues Thema', green: 'Grünes Thema', red: 'Rotes Thema' },
  es: { light: 'Tema claro', dark: 'Tema oscuro', blue: 'Tema azul', green: 'Tema verde', red: 'Tema rojo' },
  no: { light: 'Lyst tema', dark: 'Mørkt tema', blue: 'Blått tema', green: 'Grønt tema', red: 'Rødt tema' },
  ru: { light: 'Светлая тема', dark: 'Тёмная тема', blue: 'Синяя тема', green: 'Зелёная тема', red: 'Красная тема' },
};

export const NAVIGATOR_LANGUAGE_NAMES: Record<LanguageCode, Record<LanguageCode, string>> = {
  en: { en: 'English', it: 'Italian', de: 'German', es: 'Spanish', no: 'Norwegian', ru: 'Russian' },
  it: { en: 'Inglese', it: 'Italiano', de: 'Tedesco', es: 'Spagnolo', no: 'Norvegese', ru: 'Russo' },
  de: { en: 'Englisch', it: 'Italienisch', de: 'Deutsch', es: 'Spanisch', no: 'Norwegisch', ru: 'Russisch' },
  es: { en: 'Inglés', it: 'Italiano', de: 'Alemán', es: 'Español', no: 'Noruego', ru: 'Ruso' },
  no: { en: 'Engelsk', it: 'Italiensk', de: 'Tysk', es: 'Spansk', no: 'Norsk', ru: 'Russisk' },
  ru: { en: 'Английский', it: 'Итальянский', de: 'Немецкий', es: 'Испанский', no: 'Норвежский', ru: 'Русский' },
};

export const NAVIGATOR_LANGUAGE_FLAGS: Record<LanguageCode, string> = {
  en: 'assets/flags/en.svg',
  it: 'assets/flags/it.svg',
  de: 'assets/flags/de.svg',
  es: 'assets/flags/es.svg',
  no: 'assets/flags/no.svg',
  ru: 'assets/flags/ru.svg',
};

export const NAVIGATOR_PAGE_LINKS: NavigatorPageLinkDefinition[] = [
  {
    path: '/',
    labels: {
      en: 'Home',
      it: 'Home',
      de: 'Startseite',
      es: 'Inicio',
      no: 'Hjem',
      ru: 'Главная',
    },
  },
  {
    path: '/privacy',
    labels: {
      en: 'Privacy',
      it: 'Privacy',
      de: 'Datenschutz',
      es: 'Privacidad',
      no: 'Personvern',
      ru: 'Конфиденциальность',
    },
  },
];
