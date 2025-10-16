import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { LanguageCode } from '../models/language-code.type';
import { ThemeKey } from '../models/theme-key.type';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private static readonly storageKey = 'theme';
  private static readonly defaultTheme: ThemeKey = 'dark';
  private readonly availableThemes: ThemeKey[] = ['light', 'dark', 'blue', 'green', 'red'];

  private readonly themeNames: Record<LanguageCode, Record<ThemeKey, string>> = {
    en: { light: 'Light theme', dark: 'Dark theme', blue: 'Blue theme', green: 'Green theme', red: 'Red theme' },
    it: { light: 'Tema chiaro', dark: 'Tema scuro', blue: 'Tema blu', green: 'Tema verde', red: 'Tema rosso' },
    de: { light: 'Helles Thema', dark: 'Dunkles Thema', blue: 'Blaues Thema', green: 'Grünes Thema', red: 'Rotes Thema' },
    es: { light: 'Tema claro', dark: 'Tema oscuro', blue: 'Tema azul', green: 'Tema verde', red: 'Tema rojo' },
    no: { light: 'Lyst tema', dark: 'Mørkt tema', blue: 'Blått tema', green: 'Grønt tema', red: 'Rødt tema' },
    ru: { light: 'Светлая тема', dark: 'Тёмная тема', blue: 'Синяя тема', green: 'Зелёная тема', red: 'Красная тема' },
  };

  private readonly classMap: Record<ThemeKey, string> = {
    light: 'light-mode',
    dark: 'dark-mode',
    blue: 'blue-mode',
    green: 'green-mode',
    red: 'red-mode',
  };

  private readonly currentThemeSubject = new BehaviorSubject<ThemeKey>(ThemeService.defaultTheme);
  readonly currentTheme$ = this.currentThemeSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    const initialTheme = this.resolveInitialTheme();
    this.currentThemeSubject.next(initialTheme);
    this.applyTheme(initialTheme);
  }

  getAvailableThemes(): ThemeKey[] {
    return [...this.availableThemes];
  }

  getCurrentTheme(): ThemeKey {
    return this.currentThemeSubject.value;
  }

  setTheme(theme: ThemeKey): void {
    if (!this.availableThemes.includes(theme) || theme === this.currentThemeSubject.value) {
      return;
    }

    this.currentThemeSubject.next(theme);

    if (isPlatformBrowser(this.platformId)) {
      try {
        this.document.defaultView?.localStorage?.setItem(ThemeService.storageKey, theme);
      } catch {
        // Ignore storage errors (e.g. private mode)
      }
    }

    this.applyTheme(theme);
  }

  getThemeLabel(theme: ThemeKey, language: LanguageCode): string {
    const dictionary = this.themeNames[language] ?? this.themeNames['en'];
    return dictionary[theme];
  }

  private resolveInitialTheme(): ThemeKey {
    if (!isPlatformBrowser(this.platformId)) {
      return ThemeService.defaultTheme;
    }

    try {
      const stored = this.document.defaultView?.localStorage?.getItem(ThemeService.storageKey) ?? null;
      if (this.isValidTheme(stored)) {
        return stored;
      }
    } catch {
      // Ignore storage errors (e.g. private mode)
    }

    return ThemeService.defaultTheme;
  }

  private applyTheme(theme: ThemeKey): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const classList = this.document.body?.classList;
    if (!classList) {
      return;
    }

    classList.remove(...Object.values(this.classMap));
    classList.add(this.classMap[theme]);
  }

  private isValidTheme(value: string | null): value is ThemeKey {
    return !!value && this.availableThemes.includes(value as ThemeKey);
  }
}
