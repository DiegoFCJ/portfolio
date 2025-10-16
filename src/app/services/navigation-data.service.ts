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
}
