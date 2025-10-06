export type SupportedLanguage = 'en' | 'it' | 'de' | 'es';

export type LanguageMap<T> = {
  en: T;
} & Partial<Record<Exclude<SupportedLanguage, 'en'>, T>> & {
  [key: string]: T | undefined;
};
