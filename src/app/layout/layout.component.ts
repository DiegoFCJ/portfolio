import { CommonModule } from '@angular/common';
import { Component, DestroyRef, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslationService } from '../services/translation.service';
import { LanguageCode } from '../models/language-code.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AssistantComponent } from '../components/assistant/assistant.component';
import { NavigationDataService, NavigationItem, PreferenceLabels, ThemeOption } from '../services/navigation-data.service';
import { ThemeKey } from '../models/theme-key.type';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AssistantComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  menuOpen = false;
  currentLanguage: LanguageCode;
  currentTheme: ThemeKey = 'dark';

  navigationItems: NavigationItem[] = [];
  readonly languages: LanguageCode[];
  readonly themes: ThemeOption[];
  languageLabel = 'Language';
  themeLabel = 'Theme';

  private readonly preferenceLabels: Record<LanguageCode, PreferenceLabels>;

  constructor(
    private readonly translationService: TranslationService,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    private readonly navigationData: NavigationDataService,
  ) {
    this.currentLanguage = this.translationService.getCurrentLanguage();
    this.languages = this.navigationData.getLanguages();
    this.themes = this.navigationData.getThemes();
    this.preferenceLabels = this.languages.reduce((labels, language) => {
      labels[language] = this.navigationData.getPreferenceLabels(language);
      return labels;
    }, {} as Record<LanguageCode, PreferenceLabels>);
    this.navigationItems = this.resolveNavigationItems(this.currentLanguage);
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

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.menuOpen = false);

    this.restoreTheme();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
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
    if (!this.themes.some((option) => option.key === theme)) {
      return;
    }

    const nextTheme = theme as ThemeKey;

    if (nextTheme === this.currentTheme) {
      return;
    }

    this.currentTheme = nextTheme;
    this.persistTheme(nextTheme);
    this.applyTheme(nextTheme);
  }

  trackByRoute(_: number, item: NavigationItem): string {
    return item.route;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (window.innerWidth > 960 && this.menuOpen) {
      this.menuOpen = false;
    }
  }

  private resolveNavigationItems(language: LanguageCode): NavigationItem[] {
    return this.navigationData.getNavigationItems(language);
  }

  private restoreTheme(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem('theme') as ThemeKey | null;
    if (stored && this.themes.some((theme) => theme.key === stored)) {
      this.currentTheme = stored;
      this.applyTheme(stored);
    } else {
      this.applyTheme(this.currentTheme);
    }
  }

  private persistTheme(theme: ThemeKey): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem('theme', theme);
  }

  private applyTheme(theme: ThemeKey): void {
    if (typeof document === 'undefined') {
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

  private updatePreferenceLabels(language: LanguageCode): void {
    const labels = this.preferenceLabels[language] ?? this.navigationData.getPreferenceLabels('en');
    this.languageLabel = labels.language;
    this.themeLabel = labels.theme;
  }
}
