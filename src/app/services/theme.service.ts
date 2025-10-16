import { Inject, Injectable, PLATFORM_ID, DestroyRef, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { ThemeKey } from '../models/theme-key.type';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly storageKey = 'theme';
  private readonly supportedThemes: ThemeKey[] = ['light', 'dark', 'blue', 'green', 'red'];
  private readonly currentTheme$ = new BehaviorSubject<ThemeKey>('dark');

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.restorePersistedTheme();
      const listener = () => this.applyTheme(this.currentTheme$.value);
      window.addEventListener('storage', listener);
      this.destroyRef.onDestroy(() => window.removeEventListener('storage', listener));
    }
  }

  get themeChanges$(): Observable<ThemeKey> {
    return this.currentTheme$.asObservable();
  }

  getCurrentTheme(): ThemeKey {
    return this.currentTheme$.value;
  }

  getAvailableThemes(): readonly ThemeKey[] {
    return this.supportedThemes;
  }

  setTheme(theme: ThemeKey): void {
    if (!this.supportedThemes.includes(theme) || theme === this.currentTheme$.value) {
      return;
    }

    this.currentTheme$.next(theme);
    this.persistTheme(theme);
    this.applyTheme(theme);
  }

  private restorePersistedTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const stored = window.localStorage.getItem(this.storageKey) as ThemeKey | null;
    if (stored && this.supportedThemes.includes(stored)) {
      this.currentTheme$.next(stored);
    }

    this.applyTheme(this.currentTheme$.value);
  }

  private persistTheme(theme: ThemeKey): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    window.localStorage.setItem(this.storageKey, theme);
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
