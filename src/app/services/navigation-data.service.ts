import { Injectable } from '@angular/core';
import { LanguageCode } from '../models/language-code.type';
import { ThemeKey } from '../models/theme-key.type';

export interface NavigationItem {
  readonly label: string;
  readonly route: string;
  readonly exact?: boolean;
}

export interface ThemeOption {
  readonly key: ThemeKey;
  readonly label: string;
}

export interface PreferenceLabels {
  readonly language: string;
  readonly theme: string;
}

@Injectable({ providedIn: 'root' })
export class NavigationDataService {
  private readonly languages: LanguageCode[] = ['it', 'en', 'de', 'es', 'no', 'ru'];

  private readonly themes: ThemeOption[] = [
    { key: 'light', label: 'Light' },
    { key: 'dark', label: 'Dark' },
    { key: 'blue', label: 'Blue' },
    { key: 'green', label: 'Green' },
    { key: 'red', label: 'Red' },
  ];

  private readonly themeNames: Record<LanguageCode, Record<ThemeKey, string>> = {
    en: { light: 'Light theme', dark: 'Dark theme', blue: 'Blue theme', green: 'Green theme', red: 'Red theme' },
    it: { light: 'Tema chiaro', dark: 'Tema scuro', blue: 'Tema blu', green: 'Tema verde', red: 'Tema rosso' },
    de: { light: 'Helles Thema', dark: 'Dunkles Thema', blue: 'Blaues Thema', green: 'Grünes Thema', red: 'Rotes Thema' },
    es: { light: 'Tema claro', dark: 'Tema oscuro', blue: 'Tema azul', green: 'Tema verde', red: 'Tema rojo' },
    no: { light: 'Lyst tema', dark: 'Mørkt tema', blue: 'Blått tema', green: 'Grønt tema', red: 'Rødt tema' },
    ru: { light: 'Светлая тема', dark: 'Тёмная тема', blue: 'Синяя тема', green: 'Зелёная тема', red: 'Красная тема' },
  };

  private readonly languageNames: Record<LanguageCode, Record<LanguageCode, string>> = {
    en: { en: 'English', it: 'Italian', de: 'German', es: 'Spanish', no: 'Norwegian', ru: 'Russian' },
    it: { en: 'Inglese', it: 'Italiano', de: 'Tedesco', es: 'Spagnolo', no: 'Norvegese', ru: 'Russo' },
    de: { en: 'Englisch', it: 'Italienisch', de: 'Deutsch', es: 'Spanisch', no: 'Norwegisch', ru: 'Russisch' },
    es: { en: 'Inglés', it: 'Italiano', de: 'Alemán', es: 'Español', no: 'Noruego', ru: 'Ruso' },
    no: { en: 'Engelsk', it: 'Italiensk', de: 'Tysk', es: 'Spansk', no: 'Norsk', ru: 'Russisk' },
    ru: { en: 'Английский', it: 'Итальянский', de: 'Немецкий', es: 'Испанский', no: 'Норвежский', ru: 'Русский' },
  };

  private readonly languageFlags: Record<LanguageCode, string> = {
    en: 'assets/flags/en.svg',
    it: 'assets/flags/it.svg',
    de: 'assets/flags/de.svg',
    es: 'assets/flags/es.svg',
    no: 'assets/flags/no.svg',
    ru: 'assets/flags/ru.svg',
  };

  private readonly navigationDictionary: Record<LanguageCode, NavigationItem[]> = {
    it: [
      { label: 'Home', route: '/', exact: true },
      { label: 'Progetti', route: '/projects' },
      { label: 'Competenze', route: '/skills' },
      { label: 'Esperienze', route: '/experiences' },
      { label: 'Contatti', route: '/contacts' },
      { label: 'Privacy', route: '/privacy' },
    ],
    en: [
      { label: 'Home', route: '/', exact: true },
      { label: 'Projects', route: '/projects' },
      { label: 'Skills', route: '/skills' },
      { label: 'Experiences', route: '/experiences' },
      { label: 'Contacts', route: '/contacts' },
      { label: 'Privacy', route: '/privacy' },
    ],
    de: [
      { label: 'Start', route: '/', exact: true },
      { label: 'Projekte', route: '/projects' },
      { label: 'Fähigkeiten', route: '/skills' },
      { label: 'Erfahrungen', route: '/experiences' },
      { label: 'Kontakt', route: '/contacts' },
      { label: 'Datenschutz', route: '/privacy' },
    ],
    es: [
      { label: 'Inicio', route: '/', exact: true },
      { label: 'Proyectos', route: '/projects' },
      { label: 'Competencias', route: '/skills' },
      { label: 'Experiencias', route: '/experiences' },
      { label: 'Contactos', route: '/contacts' },
      { label: 'Privacidad', route: '/privacy' },
    ],
    no: [
      { label: 'Hjem', route: '/', exact: true },
      { label: 'Prosjekter', route: '/projects' },
      { label: 'Kompetanser', route: '/skills' },
      { label: 'Erfaringer', route: '/experiences' },
      { label: 'Kontakt', route: '/contacts' },
      { label: 'Personvern', route: '/privacy' },
    ],
    ru: [
      { label: 'Главная', route: '/', exact: true },
      { label: 'Проекты', route: '/projects' },
      { label: 'Навыки', route: '/skills' },
      { label: 'Опыт', route: '/experiences' },
      { label: 'Контакты', route: '/contacts' },
      { label: 'Конфиденциальность', route: '/privacy' },
    ],
  };

  private readonly preferenceLabels: Record<LanguageCode, PreferenceLabels> = {
    it: { language: 'Lingua', theme: 'Tema' },
    en: { language: 'Language', theme: 'Theme' },
    de: { language: 'Sprache', theme: 'Thema' },
    es: { language: 'Idioma', theme: 'Tema' },
    no: { language: 'Språk', theme: 'Tema' },
    ru: { language: 'Язык', theme: 'Тема' },
  };

  private readonly pageMenuLabels: Record<LanguageCode, string> = {
    it: 'Vai a…',
    en: 'Go to…',
    de: 'Gehe zu…',
    es: 'Ir a…',
    no: 'Gå til…',
    ru: 'Перейти к…',
  };

  getLanguages(): LanguageCode[] {
    return [...this.languages];
  }

  getThemes(): ThemeOption[] {
    return [...this.themes];
  }

  getNavigationItems(language: LanguageCode): NavigationItem[] {
    return this.navigationDictionary[language] ?? this.navigationDictionary['it'];
  }

  getPreferenceLabels(language: LanguageCode): PreferenceLabels {
    return this.preferenceLabels[language] ?? this.preferenceLabels['en'];
  }

  getPageMenuLabel(language: LanguageCode): string {
    return this.pageMenuLabels[language] ?? this.pageMenuLabels['en'];
  }

  getThemeName(language: LanguageCode, theme: ThemeKey): string {
    const dictionary = this.themeNames[language] ?? this.themeNames['en'];
    return dictionary[theme] ?? dictionary['dark'];
  }

  getLanguageName(currentLanguage: LanguageCode, target: LanguageCode): string {
    const dictionary = this.languageNames[currentLanguage] ?? this.languageNames['en'];
    return dictionary[target] ?? dictionary['en'];
  }

  getLanguageFlag(language: LanguageCode): string {
    return this.languageFlags[language] ?? this.languageFlags['en'];
  }
}
