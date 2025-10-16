import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslationService } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';
import { LanguageCode } from '../../models/language-code.type';
import { ThemeKey } from '../../models/theme-key.type';

interface NavigationItem {
  readonly label: string;
  readonly route: string;
  readonly exact?: boolean;
}

interface ThemeDictionary {
  readonly [key: string]: Record<ThemeKey, string>;
}

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  navigationItems: NavigationItem[] = [];
  readonly languages: LanguageCode[] = ['it', 'en', 'de', 'es', 'no', 'ru'];
  readonly themes: readonly ThemeKey[];

  currentLanguage: LanguageCode;
  currentTheme: ThemeKey;

  languageLabel = 'Language';
  themeLabel = 'Theme';

  private readonly navDictionary: Record<LanguageCode, NavigationItem[]> = {
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

  private readonly preferenceLabels: Record<LanguageCode, { language: string; theme: string }> = {
    it: { language: 'Lingua', theme: 'Tema' },
    en: { language: 'Language', theme: 'Theme' },
    de: { language: 'Sprache', theme: 'Thema' },
    es: { language: 'Idioma', theme: 'Tema' },
    no: { language: 'Språk', theme: 'Tema' },
    ru: { language: 'Язык', theme: 'Тема' },
  };

  private readonly themeLabels: ThemeDictionary = {
    it: { light: 'Tema chiaro', dark: 'Tema scuro', blue: 'Tema blu', green: 'Tema verde', red: 'Tema rosso' },
    en: { light: 'Light theme', dark: 'Dark theme', blue: 'Blue theme', green: 'Green theme', red: 'Red theme' },
    de: { light: 'Helles Thema', dark: 'Dunkles Thema', blue: 'Blaues Thema', green: 'Grünes Thema', red: 'Rotes Thema' },
    es: { light: 'Tema claro', dark: 'Tema oscuro', blue: 'Tema azul', green: 'Tema verde', red: 'Tema rojo' },
    no: { light: 'Lyst tema', dark: 'Mørkt tema', blue: 'Blått tema', green: 'Grønt tema', red: 'Rødt tema' },
    ru: { light: 'Светлая тема', dark: 'Тёмная тема', blue: 'Синяя тема', green: 'Зелёная тема', red: 'Красная тема' },
  };

  constructor(
    private readonly translationService: TranslationService,
    private readonly themeService: ThemeService,
  ) {
    this.currentLanguage = this.resolveInitialLanguage();
    this.currentTheme = this.resolveInitialTheme();
    this.navigationItems = this.resolveNavigationItems(this.currentLanguage);
    this.themes = this.resolveAvailableThemes();
    this.updatePreferenceLabels(this.currentLanguage);
  }

  ngOnInit(): void {
    this.translationService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((language) => {
        this.currentLanguage = language;
        this.navigationItems = this.resolveNavigationItems(language);
        this.updatePreferenceLabels(language);
      });

    this.themeService.themeChanges$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((theme) => {
        this.currentTheme = theme;
      });
  }

  trackByRoute(_: number, item: NavigationItem): string {
    return item.route;
  }

  onSelectLanguage(language: string): void {
    if (!this.languages.includes(language as LanguageCode)) {
      return;
    }

    const nextLanguage = language as LanguageCode;
    if (nextLanguage === this.currentLanguage) {
      return;
    }

    this.translationService.setLanguage(nextLanguage);
  }

  onSelectTheme(theme: string): void {
    if (!this.themes.includes(theme as ThemeKey)) {
      return;
    }

    const nextTheme = theme as ThemeKey;
    if (nextTheme === this.currentTheme) {
      return;
    }

    this.themeService.setTheme(nextTheme);
  }

  getThemeLabel(theme: ThemeKey): string {
    const dictionary = this.themeLabels[this.currentLanguage] ?? this.themeLabels['en'];
    return dictionary[theme];
  }

  private resolveNavigationItems(language: LanguageCode): NavigationItem[] {
    return this.navDictionary[language] ?? this.navDictionary['it'];
  }

  private updatePreferenceLabels(language: LanguageCode): void {
    const labels = this.preferenceLabels[language] ?? this.preferenceLabels['en'];
    this.languageLabel = labels.language;
    this.themeLabel = labels.theme;
  }

  private resolveInitialLanguage(): LanguageCode {
    const fallback: LanguageCode = 'it';
    const getter = this.translationService
      .getCurrentLanguage as (() => LanguageCode) | undefined;

    if (typeof getter === 'function') {
      try {
        const language = getter.call(this.translationService);
        if (this.languages.includes(language)) {
          return language;
        }
      } catch {
        // Ignore and fallback
      }
    }

    return fallback;
  }

  private resolveInitialTheme(): ThemeKey {
    const fallback: ThemeKey = 'dark';
    const getter = this.themeService.getCurrentTheme as (() => ThemeKey) | undefined;

    if (typeof getter === 'function') {
      try {
        const theme = getter.call(this.themeService);
        if (this.themeService.getAvailableThemes().includes(theme)) {
          return theme;
        }
      } catch {
        // Ignore and fallback
      }
    }

    return fallback;
  }

  private resolveAvailableThemes(): readonly ThemeKey[] {
    const getter = this.themeService.getAvailableThemes as
      | (() => readonly ThemeKey[])
      | undefined;

    if (typeof getter === 'function') {
      try {
        const themes = getter.call(this.themeService);
        if (Array.isArray(themes) && themes.length) {
          return themes;
        }
      } catch {
        // Ignore and fallback
      }
    }

    return ['light', 'dark', 'blue', 'green', 'red'];
  }
}
