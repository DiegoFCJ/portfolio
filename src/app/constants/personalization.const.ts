import { LanguageCode } from '../models/language-code.type';

export type ThemeKey = 'light' | 'dark' | 'blue' | 'green' | 'red';

export const AVAILABLE_THEMES: ThemeKey[] = ['light', 'dark', 'blue', 'green', 'red'];

export const THEME_CLASS_MAP: Record<ThemeKey, string> = {
  light: 'light-mode',
  dark: 'dark-mode',
  blue: 'blue-mode',
  green: 'green-mode',
  red: 'red-mode',
};

export const THEME_ICONS: Record<ThemeKey, string> = {
  light: 'light_mode',
  dark: 'dark_mode',
  blue: 'water_drop',
  green: 'eco',
  red: 'local_fire_department',
};

export const THEME_NAMES: Record<LanguageCode, Record<ThemeKey, string>> = {
  en: {
    light: 'Light theme',
    dark: 'Dark theme',
    blue: 'Blue theme',
    green: 'Green theme',
    red: 'Red theme',
  },
  it: {
    light: 'Tema chiaro',
    dark: 'Tema scuro',
    blue: 'Tema blu',
    green: 'Tema verde',
    red: 'Tema rosso',
  },
  de: {
    light: 'Helles Thema',
    dark: 'Dunkles Thema',
    blue: 'Blaues Thema',
    green: 'Grünes Thema',
    red: 'Rotes Thema',
  },
  es: {
    light: 'Tema claro',
    dark: 'Tema oscuro',
    blue: 'Tema azul',
    green: 'Tema verde',
    red: 'Tema rojo',
  },
  no: {
    light: 'Lyst tema',
    dark: 'Mørkt tema',
    blue: 'Blått tema',
    green: 'Grønt tema',
    red: 'Rødt tema',
  },
  ru: {
    light: 'Светлая тема',
    dark: 'Тёмная тема',
    blue: 'Синяя тема',
    green: 'Зелёная тема',
    red: 'Красная тема',
  },
};

export const AVAILABLE_LANGUAGES: LanguageCode[] = ['en', 'it', 'de', 'es', 'no', 'ru'];

export const LANGUAGE_NAMES: Record<LanguageCode, Record<LanguageCode, string>> = {
  en: { en: 'English', it: 'Italian', de: 'German', es: 'Spanish', no: 'Norwegian', ru: 'Russian' },
  it: { en: 'Inglese', it: 'Italiano', de: 'Tedesco', es: 'Spagnolo', no: 'Norvegese', ru: 'Russo' },
  de: { en: 'Englisch', it: 'Italienisch', de: 'Deutsch', es: 'Spanisch', no: 'Norwegisch', ru: 'Russisch' },
  es: { en: 'Inglés', it: 'Italiano', de: 'Alemán', es: 'Español', no: 'Noruego', ru: 'Ruso' },
  no: { en: 'Engelsk', it: 'Italiensk', de: 'Tysk', es: 'Spansk', no: 'Norsk', ru: 'Russisk' },
  ru: { en: 'Английский', it: 'Итальянский', de: 'Немецкий', es: 'Испанский', no: 'Норвежский', ru: 'Русский' },
};

export const LANGUAGE_FLAGS: Record<LanguageCode, string> = {
  en: 'assets/flags/en.svg',
  it: 'assets/flags/it.svg',
  de: 'assets/flags/de.svg',
  es: 'assets/flags/es.svg',
  no: 'assets/flags/no.svg',
  ru: 'assets/flags/ru.svg',
};
