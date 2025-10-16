import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { ThemeKey } from '../models/theme-key.type';
import { NavigationDataService } from './navigation-data.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'theme';
  private readonly themeSubject = new BehaviorSubject<ThemeKey>('dark');

  readonly theme$ = this.themeSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly navigationData: NavigationDataService,
  ) {
    const initialTheme = this.resolveInitialTheme();
    this.themeSubject.next(initialTheme);
    this.applyTheme(initialTheme);
  }

  getCurrentTheme(): ThemeKey {
    return this.themeSubject.value;
  }

  setTheme(theme: ThemeKey): void {
    if (!this.isSupportedTheme(theme) || this.themeSubject.value === theme) {
      if (this.isSupportedTheme(theme) && this.themeSubject.value === theme) {
        this.applyTheme(theme);
      }
      return;
    }

    this.themeSubject.next(theme);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, theme);
    }

    this.applyTheme(theme);
  }

  private resolveInitialTheme(): ThemeKey {
    if (!isPlatformBrowser(this.platformId)) {
      return this.themeSubject.value;
    }

    const stored = localStorage.getItem(this.storageKey);
    if (this.isSupportedTheme(stored)) {
      return stored;
    }

    return this.themeSubject.value;
  }

  private isSupportedTheme(theme: unknown): theme is ThemeKey {
    if (typeof theme !== 'string') {
      return false;
    }

    return this.navigationData.getThemes().some((option) => option.key === theme);
  }

  private applyTheme(theme: ThemeKey): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const classList = document.body.classList;
    classList.remove('light-mode', 'dark-mode', 'blue-mode', 'green-mode', 'red-mode');

    switch (theme) {
      case 'light':
        classList.add('light-mode');
        break;
      case 'dark':
        classList.add('dark-mode');
        break;
      case 'blue':
        classList.add('blue-mode');
        break;
      case 'green':
        classList.add('green-mode');
        break;
      case 'red':
        classList.add('red-mode');
        break;
    }
  }
}
