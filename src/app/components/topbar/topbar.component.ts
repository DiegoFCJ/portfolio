import { CommonModule } from '@angular/common';
import { Component, DestroyRef, ElementRef, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslationService } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';
import { LanguageCode } from '../../models/language-code.type';
import {
  AVAILABLE_LANGUAGES,
  LANGUAGE_FLAGS,
  LANGUAGE_NAMES,
  ThemeKey,
} from '../../constants/personalization.const';

interface TopbarLinkConfig {
  path: string;
  exact?: boolean;
  key: 'home' | 'privacy';
}

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  readonly availableLanguages = AVAILABLE_LANGUAGES;
  readonly availableThemes = this.themeService.availableThemes;

  currentLang: string = 'it';
  currentTheme: ThemeKey = this.themeService.getCurrentTheme();

  showLanguageOptions = false;
  showThemeOptions = false;

  readonly menuLinks: TopbarLinkConfig[] = [
    { path: '/', exact: true, key: 'home' },
    { path: '/privacy', exact: true, key: 'privacy' },
  ];

  private readonly linkLabels: Record<TopbarLinkConfig['key'], Partial<Record<LanguageCode, string>>> = {
    home: {
      it: 'Home',
      en: 'Home',
      de: 'Startseite',
      es: 'Inicio',
      no: 'Hjem',
      ru: 'Главная',
    },
    privacy: {
      it: 'Privacy',
      en: 'Privacy',
      de: 'Datenschutz',
      es: 'Privacidad',
      no: 'Personvern',
      ru: 'Конфиденциальность',
    },
  };

  private readonly controlLabels: Record<'language' | 'theme', Partial<Record<LanguageCode, string>>> = {
    language: {
      it: 'Seleziona lingua',
      en: 'Select language',
      de: 'Sprache wählen',
      es: 'Selecciona idioma',
      no: 'Velg språk',
      ru: 'Выберите язык',
    },
    theme: {
      it: 'Seleziona tema',
      en: 'Select theme',
      de: 'Thema wählen',
      es: 'Selecciona tema',
      no: 'Velg tema',
      ru: 'Выберите тему',
    },
  };

  constructor(
    private readonly translationService: TranslationService,
    private readonly themeService: ThemeService,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly destroyRef: DestroyRef,
  ) {
    this.translationService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((lang) => {
        this.currentLang = lang;
      });

    this.themeService.currentTheme$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((theme) => {
        this.currentTheme = theme;
      });
  }

  toggleLanguageOptions(): void {
    this.showLanguageOptions = !this.showLanguageOptions;
    if (this.showLanguageOptions) {
      this.showThemeOptions = false;
    }
  }

  toggleThemeOptions(): void {
    this.showThemeOptions = !this.showThemeOptions;
    if (this.showThemeOptions) {
      this.showLanguageOptions = false;
    }
  }

  changeLanguage(language: LanguageCode): void {
    this.translationService.setLanguage(language);
    this.showLanguageOptions = false;
  }

  changeTheme(theme: ThemeKey): void {
    this.themeService.setTheme(theme);
    this.showThemeOptions = false;
  }

  getLinkLabel(link: TopbarLinkConfig): string {
    const dictionary = this.linkLabels[link.key];
    const lookupLanguage = this.getLanguageForLookup();
    return dictionary?.[lookupLanguage] ?? dictionary?.en ?? link.key;
  }

  getThemeName(theme: ThemeKey): string {
    return this.themeService.getThemeName(theme, this.getLanguageForLookup());
  }

  getThemeIcon(theme: ThemeKey): string {
    return this.themeService.getThemeIcon(theme);
  }

  getLanguageName(language: string): string {
    const fallbackLanguage = this.getLanguageForLookup();
    const dictionary = LANGUAGE_NAMES[fallbackLanguage] ?? LANGUAGE_NAMES.en;
    const code = this.isSupportedLanguage(language) ? (language as LanguageCode) : 'en';
    return dictionary[code];
  }

  getLanguageFlag(language: string): string {
    const code = this.isSupportedLanguage(language) ? (language as LanguageCode) : 'en';
    return LANGUAGE_FLAGS[code] ?? LANGUAGE_FLAGS.en;
  }

  getLanguageMenuLabel(): string {
    const labels = this.controlLabels.language;
    return labels[this.getLanguageForLookup()] ?? labels.en ?? 'Select language';
  }

  getThemeMenuLabel(): string {
    const labels = this.controlLabels.theme;
    return labels[this.getLanguageForLookup()] ?? labels.en ?? 'Select theme';
  }

  trackByLink = (_: number, link: TopbarLinkConfig) => link.key;

  trackByLanguage = (_: number, language: LanguageCode) => language;

  trackByTheme = (_: number, theme: ThemeKey) => theme;

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: EventTarget | null): void {
    if (!target) {
      return;
    }

    const element = target as HTMLElement;
    const clickedInside = this.elementRef.nativeElement.contains(element);

    if (!clickedInside) {
      this.closeAllMenus();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeAllMenus();
  }

  private closeAllMenus(): void {
    this.showLanguageOptions = false;
    this.showThemeOptions = false;
  }

  private getLanguageForLookup(): LanguageCode {
    if (this.isSupportedLanguage(this.currentLang)) {
      return this.currentLang as LanguageCode;
    }

    return 'en';
  }

  private isSupportedLanguage(language: string): language is LanguageCode {
    return AVAILABLE_LANGUAGES.includes(language as LanguageCode);
  }
}
