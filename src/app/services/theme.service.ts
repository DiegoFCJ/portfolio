import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { LanguageCode } from '../models/language-code.type';
import {
  AVAILABLE_THEMES,
  THEME_CLASS_MAP,
  THEME_ICONS,
  THEME_NAMES,
  ThemeKey,
} from '../constants/personalization.const';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'theme';
  private readonly themeSubject = new BehaviorSubject<ThemeKey>(this.resolveInitialTheme());
  readonly currentTheme$ = this.themeSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.applyTheme(this.themeSubject.value);
  }

  get availableThemes(): readonly ThemeKey[] {
    return AVAILABLE_THEMES;
  }

  getCurrentTheme(): ThemeKey {
    return this.themeSubject.value;
  }

  setTheme(theme: ThemeKey): void {
    if (!AVAILABLE_THEMES.includes(theme) || this.themeSubject.value === theme) {
      return;
    }

    this.themeSubject.next(theme);
    this.persistTheme(theme);
    this.applyTheme(theme);
  }

  getThemeIcon(theme: ThemeKey): string {
    return THEME_ICONS[theme] ?? THEME_ICONS.dark;
  }

  getThemeName(theme: ThemeKey, language: LanguageCode): string {
    const dictionary = THEME_NAMES[language] ?? THEME_NAMES.en;
    return dictionary[theme];
  }

  private resolveInitialTheme(): ThemeKey {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const storedTheme = window.localStorage?.getItem(this.storageKey) as ThemeKey | null;
        if (storedTheme && AVAILABLE_THEMES.includes(storedTheme)) {
          return storedTheme;
        }
      } catch {
        // Ignore storage access issues and fall back to default theme.
      }
    }

    return 'dark';
  }

  private persistTheme(theme: ThemeKey): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      window.localStorage?.setItem(this.storageKey, theme);
    } catch {
      // Ignore storage write failures silently.
    }
  }

  private applyTheme(theme: ThemeKey): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const body = this.document?.body;
    if (!body) {
      return;
    }

    AVAILABLE_THEMES.forEach((availableTheme) => {
      const className = THEME_CLASS_MAP[availableTheme];
      if (className) {
        body.classList.remove(className);
      }
    });

    const nextClass = THEME_CLASS_MAP[theme];
    if (nextClass) {
      body.classList.add(nextClass);
    }
  }
}
