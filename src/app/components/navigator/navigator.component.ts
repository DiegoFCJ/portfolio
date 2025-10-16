import { Component, EventEmitter, Input, Output, OnInit, Inject, PLATFORM_ID, HostListener, ElementRef, DestroyRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslationService } from '../../services/translation.service';
import { NavigationDataService, NavigationItem } from '../../services/navigation-data.service';
import { ThemeKey } from '../../models/theme-key.type';
import { LanguageCode } from '../../models/language-code.type';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { A11yModule } from '@angular/cdk/a11y';

type TooltipKey = 'prev' | 'next' | 'theme' | 'language';

type TooltipDictionary = Record<LanguageCode, Record<TooltipKey, string>>;

type ToggleButtonLabels = Record<LanguageCode, { open: string; close: string }>;

type ThemeNamesDictionary = Record<LanguageCode, Record<ThemeKey, string>>;

type LanguageNamesDictionary = Record<LanguageCode, Record<LanguageCode, string>>;

type LanguageFlagsDictionary = Record<LanguageCode, string>;

@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    A11yModule,
  ],
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  @Input() totalSections = 8;
  @Input() currentSectionIndex = 0;
  @Output() navigateNext = new EventEmitter<void>();
  @Output() navigatePrevious = new EventEmitter<void>();

  showLanguageOptions = false;
  showThemeOptions = false;
  showPageOptions = false;

  currentLang: LanguageCode;
  currentTheme: ThemeKey = 'dark';
  readonly availableThemes: ThemeKey[];
  readonly availableLanguages: LanguageCode[];
  pageLinks: NavigationItem[] = [];

  /** Controls visibility of the navigator */
  isOpen = true;

  /** Tracks whether the current scroll was triggered programmatically */
  private programmaticScroll = false;
  private programmaticScrollTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Tooltip translations */
  private readonly tooltipTexts: TooltipDictionary = {
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
    },
    no: {
      prev: 'Forrige seksjon',
      next: 'Neste seksjon',
      theme: 'Tema',
      language: 'Språk'
    },
    ru: {
      prev: 'Предыдущий раздел',
      next: 'Следующий раздел',
      theme: 'Тема',
      language: 'Язык'
    }
  };

  private readonly tooltipFallbackOrder: LanguageCode[] = ['it', 'en', 'de', 'es', 'no', 'ru'];

  private readonly themeNames: ThemeNamesDictionary = {
    en: { light: 'Light theme', dark: 'Dark theme', blue: 'Blue theme', green: 'Green theme', red: 'Red theme' },
    it: { light: 'Tema chiaro', dark: 'Tema scuro', blue: 'Tema blu', green: 'Tema verde', red: 'Tema rosso' },
    de: { light: 'Helles Thema', dark: 'Dunkles Thema', blue: 'Blaues Thema', green: 'Grünes Thema', red: 'Rotes Thema' },
    es: { light: 'Tema claro', dark: 'Tema oscuro', blue: 'Tema azul', green: 'Tema verde', red: 'Tema rojo' },
    no: { light: 'Lyst tema', dark: 'Mørkt tema', blue: 'Blått tema', green: 'Grønt tema', red: 'Rødt tema' },
    ru: { light: 'Светлая тема', dark: 'Тёмная тема', blue: 'Синяя тема', green: 'Зелёная тема', red: 'Красная тема' }
  };

  private readonly languageNames: LanguageNamesDictionary = {
    en: { en: 'English', it: 'Italian', de: 'German', es: 'Spanish', no: 'Norwegian', ru: 'Russian' },
    it: { en: 'Inglese', it: 'Italiano', de: 'Tedesco', es: 'Spagnolo', no: 'Norvegese', ru: 'Russo' },
    de: { en: 'Englisch', it: 'Italienisch', de: 'Deutsch', es: 'Spanisch', no: 'Norwegisch', ru: 'Russisch' },
    es: { en: 'Inglés', it: 'Italiano', de: 'Alemán', es: 'Español', no: 'Noruego', ru: 'Ruso' },
    no: { en: 'Engelsk', it: 'Italiensk', de: 'Tysk', es: 'Spansk', no: 'Norsk', ru: 'Russisk' },
    ru: { en: 'Английский', it: 'Итальянский', de: 'Немецкий', es: 'Испанский', no: 'Норвежский', ru: 'Русский' }
  };

  private readonly languageFlags: LanguageFlagsDictionary = {
    en: 'assets/flags/en.svg',
    it: 'assets/flags/it.svg',
    de: 'assets/flags/de.svg',
    es: 'assets/flags/es.svg',
    no: 'assets/flags/no.svg',
    ru: 'assets/flags/ru.svg'
  };

  private readonly toggleButtonLabels: ToggleButtonLabels = {
    en: { open: 'Open navigator', close: 'Close navigator' },
    it: { open: 'Apri navigatore', close: 'Chiudi navigatore' },
    de: { open: 'Navigator öffnen', close: 'Navigator schließen' },
    es: { open: 'Abrir navegador', close: 'Cerrar navegador' },
    no: { open: 'Åpne navigator', close: 'Lukk navigator' },
    ru: { open: 'Открыть навигатор', close: 'Закрыть навигатор' }
  };

  readonly pageMenuId = 'navigator-page-menu';

  constructor(
    private readonly translationService: TranslationService,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly elementRef: ElementRef,
    private readonly navigationData: NavigationDataService,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
  ) {
    this.currentLang = this.translationService.getCurrentLanguage();
    this.availableThemes = this.navigationData.getThemes().map((theme) => theme.key);
    this.availableLanguages = this.navigationData.getLanguages();
    this.pageLinks = this.navigationData.getNavigationItems(this.currentLang);
  }

  ngOnInit(): void {
    this.translationService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((lang) => {
        this.currentLang = lang;
        this.pageLinks = this.navigationData.getNavigationItems(lang);
        this.closePageOptions();
      });

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.closePageOptions());

    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = localStorage.getItem('theme');
      const nextTheme: ThemeKey = this.isValidTheme(storedTheme) ? storedTheme : 'dark';
      this.currentTheme = nextTheme;
      this.applyTheme(nextTheme);
    }
  }

  get canNavigatePrevious(): boolean {
    return this.totalSections > 0 && this.currentSectionIndex > 0;
  }

  get canNavigateNext(): boolean {
    return this.totalSections > 0 && this.currentSectionIndex < this.totalSections - 1;
  }

  onNext(): void {
    if (!this.canNavigateNext) {
      return;
    }
    this.startProgrammaticScroll();
    this.navigateNext.emit();
  }

  onPrevious(): void {
    if (!this.canNavigatePrevious) {
      return;
    }
    this.startProgrammaticScroll();
    this.navigatePrevious.emit();
  }

  toggleLanguageOptions(): void {
    this.showLanguageOptions = !this.showLanguageOptions;
    if (this.showLanguageOptions) {
      this.showThemeOptions = false;
      this.closePageOptions();
    }
  }

  toggleThemeOptions(): void {
    this.showThemeOptions = !this.showThemeOptions;
    if (this.showThemeOptions) {
      this.showLanguageOptions = false;
      this.closePageOptions();
    }
  }

  togglePageOptions(): void {
    this.showPageOptions = !this.showPageOptions;
    if (this.showPageOptions) {
      this.showLanguageOptions = false;
      this.showThemeOptions = false;
    }
  }

  changeLanguage(language: LanguageCode): void {
    this.translationService.setLanguage(language);
    this.currentLang = language;
    this.showLanguageOptions = false;
    this.closePageOptions();
  }

  changeTheme(theme: ThemeKey): void {
    this.currentTheme = theme;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
      this.applyTheme(theme);
    }
    this.showThemeOptions = false;
    this.closePageOptions();
  }

  onSelectPage(link: NavigationItem): void {
    this.closePageOptions();
    this.router.navigateByUrl(link.route);
  }

  /** Returns the tooltip text for the given key based on current language */
  getTooltip(key: TooltipKey): string {
    const languagesToCheck = this.getTooltipFallbackLanguages();

    for (const language of languagesToCheck) {
      const translation = this.tooltipTexts[language]?.[key];
      if (translation) {
        return translation;
      }
    }

    const defaultLanguage = this.tooltipFallbackOrder[0];
    return this.tooltipTexts[defaultLanguage]?.[key] ?? key;
  }

  getPageMenuLabel(): string {
    return this.navigationData.getPageMenuLabel(this.currentLang);
  }

  private getTooltipFallbackLanguages(): LanguageCode[] {
    const fallback = [...this.tooltipFallbackOrder];

    if (this.isSupportedLanguage(this.currentLang)) {
      fallback.unshift(this.currentLang);
    }

    return fallback.filter((language, index, array) => array.indexOf(language) === index);
  }

  private isSupportedLanguage(language: string): language is LanguageCode {
    return Object.prototype.hasOwnProperty.call(this.tooltipTexts, language);
  }

  getToggleButtonLabel(): string {
    const labels = this.toggleButtonLabels[this.currentLang] || this.toggleButtonLabels['en'];
    return this.isOpen ? labels.close : labels.open;
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

  getLanguageName(language: LanguageCode): string {
    const names = this.languageNames[this.currentLang] || this.languageNames['en'];
    return names[language];
  }

  getLanguageFlag(language: LanguageCode): string {
    return this.languageFlags[language] ?? this.languageFlags['en'];
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
    this.showPageOptions = false;
  }

  private closePageOptions(): void {
    this.showPageOptions = false;
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

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (!this.isOpen) {
      return;
    }
    this.resetOptionMenus();
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
