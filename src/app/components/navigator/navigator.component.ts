import { Component, EventEmitter, Input, Output, OnInit, Inject, PLATFORM_ID, HostListener, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslationService } from '../../services/translation.service';

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
  currentTheme: 'light' | 'dark' | 'blue' | 'green' = 'light';

  /** Controls visibility of the navigator */
  isOpen = false;

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

  ariaTexts: { [key: string]: { open: string; close: string; theme: string; light: string; dark: string; blue: string; green: string; prev: string; next: string; language: string; english: string; italian: string; german: string; spanish: string } } = {
    en: {
      open: 'Open navigator',
      close: 'Close navigator',
      theme: 'Theme selector',
      light: 'Light mode',
      dark: 'Dark mode',
      blue: 'Blue mode',
      green: 'Green mode',
      prev: 'Previous section',
      next: 'Next section',
      language: 'Language selector',
      english: 'English',
      italian: 'Italian',
      german: 'German',
      spanish: 'Spanish'
    },
    it: {
      open: 'Apri navigatore',
      close: 'Chiudi navigatore',
      theme: 'Selettore tema',
      light: 'Tema chiaro',
      dark: 'Tema scuro',
      blue: 'Tema blu',
      green: 'Tema verde',
      prev: 'Sezione precedente',
      next: 'Sezione successiva',
      language: 'Selettore lingua',
      english: 'Inglese',
      italian: 'Italiano',
      german: 'Tedesco',
      spanish: 'Spagnolo'
    },
    de: {
      open: 'Navigator öffnen',
      close: 'Navigator schließen',
      theme: 'Designauswahl',
      light: 'Heller Modus',
      dark: 'Dunkler Modus',
      blue: 'Blauer Modus',
      green: 'Grüner Modus',
      prev: 'Vorheriger Abschnitt',
      next: 'Nächster Abschnitt',
      language: 'Sprachauswahl',
      english: 'Englisch',
      italian: 'Italienisch',
      german: 'Deutsch',
      spanish: 'Spanisch'
    },
    es: {
      open: 'Abrir navegador',
      close: 'Cerrar navegador',
      theme: 'Selector de tema',
      light: 'Modo claro',
      dark: 'Modo oscuro',
      blue: 'Modo azul',
      green: 'Modo verde',
      prev: 'Sección anterior',
      next: 'Siguiente sección',
      language: 'Selector de idioma',
      english: 'Inglés',
      italian: 'Italiano',
      german: 'Alemán',
      spanish: 'Español'
    }
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
      const storedTheme = (localStorage.getItem('theme') as 'light' | 'dark' | 'blue' | 'green') || 'light';
      this.currentTheme = storedTheme;
      this.applyTheme(storedTheme);
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

  changeLanguage(language: 'en' | 'it' | 'de' | 'es'): void {
    this.translationService.setLanguage(language);
    this.currentLang = language;
    this.showLanguageOptions = false;
  }

  changeTheme(theme: 'light' | 'dark' | 'blue' | 'green'): void {
    this.currentTheme = theme;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
      this.applyTheme(theme);
    }
    this.showThemeOptions = false;
  }

  /** Returns the tooltip text for the given key based on current language */
  getTooltip(key: 'prev' | 'next' | 'theme' | 'language'): string {
    return this.tooltipTexts[this.currentLang]?.[key] ?? this.tooltipTexts['it'][key];
  }

  getNavigatorLabel(key: 'open' | 'close' | 'theme' | 'light' | 'dark' | 'blue' | 'green' | 'prev' | 'next' | 'language' | 'english' | 'italian' | 'german' | 'spanish'): string {
    const languageSet = this.ariaTexts[this.currentLang] ?? this.ariaTexts['it'];
    return languageSet[key];
  }

  private applyTheme(theme: 'light' | 'dark' | 'blue' | 'green'): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('dark-mode', 'blue-mode', 'green-mode');
      if (theme === 'dark') {
        document.body.classList.add('dark-mode');
      } else if (theme === 'blue') {
        document.body.classList.add('blue-mode');
      } else if (theme === 'green') {
        document.body.classList.add('green-mode');
      }
    }
  }

  /**
   * Returns the Material icon name corresponding to the given theme.
   */
  getThemeIcon(theme: 'light' | 'dark' | 'blue' | 'green'): string {
    switch (theme) {
      case 'dark':
        return 'dark_mode';
      case 'blue':
        return 'water_drop';
      case 'green':
        return 'eco';
      default:
        return 'light_mode';
    }
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
