import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ThemeKey } from '../models/theme-key.type';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private static readonly storageKey = 'theme';
  private static readonly themeClasses: Record<ThemeKey, string> = {
    light: 'light-mode',
    dark: 'dark-mode',
    blue: 'blue-mode',
    green: 'green-mode',
    red: 'red-mode',
  };

  private readonly availableThemes: ThemeKey[] = ['light', 'dark', 'blue', 'green', 'red'];
  private readonly currentThemeSubject = new BehaviorSubject<ThemeKey>('dark');
  private readonly isBrowser: boolean;

  readonly currentTheme$ = this.currentThemeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    const initialTheme = this.resolveInitialTheme();
    this.currentThemeSubject.next(initialTheme);
    this.applyThemeClass(initialTheme);
  }

  getCurrentTheme(): ThemeKey {
    return this.currentThemeSubject.value;
  }

  getAvailableThemes(): ThemeKey[] {
    return [...this.availableThemes];
  }

  setTheme(theme: ThemeKey): void {
    if (!this.availableThemes.includes(theme)) {
      return;
    }

    if (this.currentThemeSubject.value === theme) {
      return;
    }

    this.currentThemeSubject.next(theme);
    this.persistTheme(theme);
    this.applyThemeClass(theme);
  }

  private resolveInitialTheme(): ThemeKey {
    if (!this.isBrowser) {
      return this.currentThemeSubject.value;
    }

    const stored = window.localStorage.getItem(ThemeService.storageKey);
    if (stored && this.availableThemes.includes(stored as ThemeKey)) {
      return stored as ThemeKey;
    }

    return this.currentThemeSubject.value;
  }

  private persistTheme(theme: ThemeKey): void {
    if (!this.isBrowser) {
      return;
    }

    window.localStorage.setItem(ThemeService.storageKey, theme);
  }

  private applyThemeClass(theme: ThemeKey): void {
    if (!this.isBrowser) {
      return;
    }

    const classList = document.body.classList;
    Object.values(ThemeService.themeClasses).forEach((cssClass) => classList.remove(cssClass));

    const themeClass = ThemeService.themeClasses[theme];
    if (themeClass) {
      classList.add(themeClass);
    }
  }
}
