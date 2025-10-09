import { Component, EventEmitter, Input, Output, OnInit, Inject, PLATFORM_ID, HostListener, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslationService } from '../../services/translation.service';

type ThemeKey = 'light' | 'dark' | 'blue' | 'green' | 'red';
type LanguageKey = 'en' | 'it' | 'de' | 'es';

@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  @Input() totalSections: number = 8;
  @Input() currentSectionIndex: number = 0;
  @Output() navigateNext = new EventEmitter<void>();
  @Output() navigatePrevious = new EventEmitter<void>();

  showLanguageOptions = false;
  showThemeOptions = false;

  currentLang: string;
  currentTheme: ThemeKey = 'dark';
  readonly availableThemes: ThemeKey[] = ['light', 'dark', 'blue', 'green', 'red'];
  readonly availableLanguages: LanguageKey[] = ['en', 'it', 'de', 'es'];

  /** Controls visibility of the navigator */
  isOpen = true;

  /** Tracks whether the current scroll was triggered programmatically */
  private programmaticScroll = false;
  private programmaticScrollTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Tooltip translations */
  tooltipTexts: { [key: string]: { prev: string; next: string; theme: string; language: string } } = {
    en: {
      prev: 'Previous section',
      next: 'Next section',
      theme: 'Theme',
      language: 'Language'
    },
    it: {
      prev: 'Sezione precedente',
      next: 'Sezione successiva',
      theme: 'Tema',
      language: 'Lingua'
    },
    de: {
      prev: 'Vorheriger Abschnitt',
      next: 'Nächster Abschnitt',
      theme: 'Thema',
      language: 'Sprache'
    },
    es: {
      prev: 'Sección anterior',
      next: 'Siguiente sección',
      theme: 'Tema',
      language: 'Idioma'
    }
  };

  themeNames: Record<string, Record<ThemeKey, string>> = {
    en: { light: 'Light theme', dark: 'Dark theme', blue: 'Blue theme', green: 'Green theme', red: 'Red theme' },
    it: { light: 'Tema chiaro', dark: 'Tema scuro', blue: 'Tema blu', green: 'Tema verde', red: 'Tema rosso' },
    de: { light: 'Helles Thema', dark: 'Dunkles Thema', blue: 'Blaues Thema', green: 'Grünes Thema', red: 'Rotes Thema' },
    es: { light: 'Tema claro', dark: 'Tema oscuro', blue: 'Tema azul', green: 'Tema verde', red: 'Tema rojo' }
  };

  languageNames: Record<string, Record<LanguageKey, string>> = {
    en: { en: 'English', it: 'Italian', de: 'German', es: 'Spanish' },
    it: { en: 'Inglese', it: 'Italiano', de: 'Tedesco', es: 'Spagnolo' },
    de: { en: 'Englisch', it: 'Italienisch', de: 'Deutsch', es: 'Spanisch' },
    es: { en: 'Inglés', it: 'Italiano', de: 'Alemán', es: 'Español' }
  };

  private readonly languageFlags: Record<LanguageKey, string> = {
    en: '🇬🇧',
    it: '🇮🇹',
    de: '🇩🇪',
    es: '🇪🇸'
  };

  toggleButtonLabels: { [key: string]: { open: string; close: string } } = {
    en: { open: 'Open navigator', close: 'Close navigator' },
    it: { open: 'Apri navigatore', close: 'Chiudi navigatore' },
    de: { open: 'Navigator öffnen', close: 'Navigator schließen' },
    es: { open: 'Abrir navegador', close: 'Cerrar navegador' }
  };

  constructor(
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private elementRef: ElementRef
  ) {
    this.currentLang = this.translationService.getCurrentLanguage();
  }

  ngOnInit(): void {
    // keep language in sync with translation service
    this.translationService.currentLanguage$.subscribe(lang => {
      this.currentLang = lang;
    });
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = localStorage.getItem('theme');
      const nextTheme: ThemeKey = this.isValidTheme(storedTheme) ? storedTheme : 'dark';
      this.currentTheme = nextTheme;
      this.applyTheme(nextTheme);
    }
  }

  onNext(): void {
    if (this.currentSectionIndex < this.totalSections - 1) {
      this.startProgrammaticScroll();
      this.navigateNext.emit();
    }
  }

  onPrevious(): void {
    if (this.currentSectionIndex > 0) {
      this.startProgrammaticScroll();
      this.navigatePrevious.emit();
    }
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

  changeLanguage(language: LanguageKey): void {
    this.translationService.setLanguage(language);
    this.currentLang = language;
    this.showLanguageOptions = false;
  }

  changeTheme(theme: ThemeKey): void {
    this.currentTheme = theme;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
      this.applyTheme(theme);
    }
    this.showThemeOptions = false;
  }

  /** Returns the tooltip text for the given key based on current language */
  getTooltip(key: 'prev' | 'next' | 'theme' | 'language'): string {
    return this.tooltipTexts[this.currentLang][key];
  }

  getToggleButtonLabel(): string {
    const labels = this.toggleButtonLabels[this.currentLang] || this.toggleButtonLabels['en'];
    return this.isOpen ? labels.close : labels.open;
  }

  getThemeOptionHintId(index: number): string {
    return `theme-option-hint-${index}`;
  }

  getLanguageOptionHintId(index: number): string {
    return `language-option-hint-${index}`;
  }

  private applyTheme(theme: ThemeKey): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('light-mode', 'dark-mode', 'blue-mode', 'green-mode', 'red-mode');
      if (theme === 'light') {
        document.body.classList.add('light-mode');
      } else if (theme === 'dark') {
        document.body.classList.add('dark-mode');
      } else if (theme === 'blue') {
        document.body.classList.add('blue-mode');
      } else if (theme === 'green') {
        document.body.classList.add('green-mode');
      } else if (theme === 'red') {
        document.body.classList.add('red-mode');
      }
    }
  }

  /**
   * Returns the Material icon name corresponding to the given theme.
   */
  getThemeIcon(theme: ThemeKey): string {
    switch (theme) {
      case 'dark':
        return 'dark_mode';
      case 'blue':
        return 'water_drop';
      case 'green':
        return 'eco';
      case 'red':
        return 'local_fire_department';
      default:
        return 'light_mode';
    }
  }

  getThemeName(theme: ThemeKey): string {
    const names = this.themeNames[this.currentLang] || this.themeNames['en'];
    return names[theme];
  }

  getLanguageName(language: LanguageKey): string {
    const names = this.languageNames[this.currentLang] || this.languageNames['en'];
    return names[language];
  }

  getLanguageFlag(language: LanguageKey): string {
    return this.languageFlags[language];
  }

  private isValidTheme(theme: string | null): theme is ThemeKey {
    return !!theme && this.availableThemes.includes(theme as ThemeKey);
  }

  /** Toggles navigator visibility */
  toggleNavigator(): void {
    if (this.isOpen) {
      this.closeNavigator();
    } else {
      this.openNavigator();
    }
  }

  /** Opens the navigator */
  openNavigator(): void {
    this.isOpen = true;
    this.resetOptionMenus();
  }

  /** Closes the navigator and resets option menus */
  closeNavigator(): void {
    if (!this.isOpen) {
      return;
    }
    this.isOpen = false;
    this.resetOptionMenus();
  }

  private resetOptionMenus(): void {
    this.showLanguageOptions = false;
    this.showThemeOptions = false;
  }

  /** Host listener to detect clicks outside and close */
  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside && this.isOpen) {
      this.closeNavigator();
    }
  }

  /** Host listener to close navigator on scroll */
  @HostListener('window:wheel', ['$event'])
  onWindowWheel(event: WheelEvent): void {
    this.handleManualScrollEvent(event.target as HTMLElement | null);
  }

  @HostListener('window:touchmove', ['$event'])
  onWindowTouchMove(event: TouchEvent): void {
    this.handleManualScrollEvent(event.target as HTMLElement | null);
  }

  private handleManualScrollEvent(target: HTMLElement | null): void {
    if (!this.isOpen || this.programmaticScroll) {
      return;
    }

    const interactedInside = target ? this.elementRef.nativeElement.contains(target) : false;

    if (!interactedInside) {
      this.closeNavigator();
    }
  }

  private startProgrammaticScroll(): void {
    this.programmaticScroll = true;

    if (this.programmaticScrollTimeout) {
      clearTimeout(this.programmaticScrollTimeout);
    }

    // Keep the navigator open while smooth scrolling finishes
    this.programmaticScrollTimeout = setTimeout(() => {
      this.programmaticScroll = false;
      this.programmaticScrollTimeout = null;
    }, 800);
  }
}
