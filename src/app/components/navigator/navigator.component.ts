import { Component, EventEmitter, Input, Output, OnInit, HostListener, ElementRef, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslationService } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';
import { ThemeKey } from '../../models/theme-key.type';
import { LanguageCode } from '../../models/language-code.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type LanguageKey = LanguageCode;

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

  currentLang: LanguageCode;
  currentTheme: ThemeKey;
  readonly availableThemes: ThemeKey[];
  readonly availableLanguages: LanguageKey[] = ['en', 'it', 'de', 'es', 'no', 'ru'];

  /** Controls visibility of the navigator */
  isOpen = true;

  /** Tracks whether the current scroll was triggered programmatically */
  private programmaticScroll = false;
  private programmaticScrollTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Tooltip translations */
  tooltipTexts: Record<LanguageKey, { prev: string; next: string; theme: string; language: string }> = {
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

  private readonly tooltipFallbackOrder: LanguageKey[] = ['it', 'en', 'de', 'es', 'no', 'ru'];

  languageNames: Record<string, Record<LanguageKey, string>> = {
    en: { en: 'English', it: 'Italian', de: 'German', es: 'Spanish', no: 'Norwegian', ru: 'Russian' },
    it: { en: 'Inglese', it: 'Italiano', de: 'Tedesco', es: 'Spagnolo', no: 'Norvegese', ru: 'Russo' },
    de: { en: 'Englisch', it: 'Italienisch', de: 'Deutsch', es: 'Spanisch', no: 'Norwegisch', ru: 'Russisch' },
    es: { en: 'Inglés', it: 'Italiano', de: 'Alemán', es: 'Español', no: 'Noruego', ru: 'Ruso' },
    no: { en: 'Engelsk', it: 'Italiensk', de: 'Tysk', es: 'Spansk', no: 'Norsk', ru: 'Russisk' },
    ru: { en: 'Английский', it: 'Итальянский', de: 'Немецкий', es: 'Испанский', no: 'Норвежский', ru: 'Русский' }
  };

  private readonly languageFlags: Record<LanguageKey, string> = {
    en: 'assets/flags/en.svg',
    it: 'assets/flags/it.svg',
    de: 'assets/flags/de.svg',
    es: 'assets/flags/es.svg',
    no: 'assets/flags/no.svg',
    ru: 'assets/flags/ru.svg'
  };

  toggleButtonLabels: { [key: string]: { open: string; close: string } } = {
    en: { open: 'Open navigator', close: 'Close navigator' },
    it: { open: 'Apri navigatore', close: 'Chiudi navigatore' },
    de: { open: 'Navigator öffnen', close: 'Navigator schließen' },
    es: { open: 'Abrir navegador', close: 'Cerrar navegador' },
    no: { open: 'Åpne navigator', close: 'Lukk navigator' },
    ru: { open: 'Открыть навигатор', close: 'Закрыть навигатор' }
  };

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly translationService: TranslationService,
    private readonly themeService: ThemeService,
    private readonly elementRef: ElementRef
  ) {
    this.currentLang = this.translationService.getCurrentLanguage();
    this.availableThemes = this.themeService.getAvailableThemes();
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  ngOnInit(): void {
    // keep language in sync with translation service
    this.translationService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(lang => {
        this.currentLang = lang;
      });

    this.themeService.currentTheme$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(theme => {
        this.currentTheme = theme;
      });
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
    this.themeService.setTheme(theme);
    this.showThemeOptions = false;
  }

  /** Returns the tooltip text for the given key based on current language */
  getTooltip(key: 'prev' | 'next' | 'theme' | 'language'): string {
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

  private getTooltipFallbackLanguages(): LanguageKey[] {
    const fallback = [...this.tooltipFallbackOrder];

    if (this.isSupportedLanguage(this.currentLang)) {
      fallback.unshift(this.currentLang);
    }

    return fallback.filter((language, index, array) => array.indexOf(language) === index);
  }

  private isSupportedLanguage(language: string): language is LanguageKey {
    return Object.prototype.hasOwnProperty.call(this.tooltipTexts, language);
  }

  getToggleButtonLabel(): string {
    const labels = this.toggleButtonLabels[this.currentLang] || this.toggleButtonLabels['en'];
    return this.isOpen ? labels.close : labels.open;
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
    return this.themeService.getThemeLabel(theme, this.currentLang ?? 'en');
  }

  getLanguageName(language: LanguageKey): string {
    const names = this.languageNames[this.currentLang] || this.languageNames['en'];
    return names[language];
  }

  getLanguageFlag(language: LanguageKey): string {
    return this.languageFlags[language] ?? this.languageFlags['en'];
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
