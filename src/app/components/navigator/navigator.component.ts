import { Component, EventEmitter, Input, Output, OnInit, Inject, PLATFORM_ID, HostListener, ElementRef, OnDestroy } from '@angular/core';
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
export class NavigatorComponent implements OnInit, OnDestroy {
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

  /** Identifies programmatic scrolls triggered by navigator buttons */
  private programmaticScrollActive = false;

  /** Timeout reference used to reset the programmatic scroll flag */
  private programmaticScrollResetTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Accumulated manual scroll delta used to decide when to close the navigator */
  private manualScrollDelta = 0;

  /** Threshold in pixels after which a prolonged manual scroll closes the navigator */
  private readonly manualScrollThreshold = 200;

  /** Keeps track of the last known scroll position to derive deltas on scroll events */
  private lastKnownScrollPosition: number | null = null;

  /** Tracks the latest Y position during touch gestures */
  private lastTouchY: number | null = null;

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

  ngOnDestroy(): void {
    if (this.programmaticScrollResetTimeout) {
      clearTimeout(this.programmaticScrollResetTimeout);
      this.programmaticScrollResetTimeout = null;
    }
  }

  onNext(): void {
    if (this.currentSectionIndex < this.totalSections - 1) {
      this.markProgrammaticScroll();
      this.navigateNext.emit();
    }
  }

  onPrevious(): void {
    if (this.currentSectionIndex > 0) {
      this.markProgrammaticScroll();
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
    return this.tooltipTexts[this.currentLang][key];
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
    this.resetManualScrollTracking();
  }

  /** Closes the navigator and resets option menus */
  closeNavigator(): void {
    if (!this.isOpen) {
      return;
    }
    this.isOpen = false;
    this.resetOptionMenus();
    this.resetManualScrollTracking();
  }

  private resetOptionMenus(): void {
    this.showLanguageOptions = false;
    this.showThemeOptions = false;
  }

  private markProgrammaticScroll(): void {
    this.programmaticScrollActive = true;
    this.resetManualScrollTracking();
    if (this.programmaticScrollResetTimeout) {
      clearTimeout(this.programmaticScrollResetTimeout);
    }
    this.programmaticScrollResetTimeout = setTimeout(() => {
      this.programmaticScrollActive = false;
      this.programmaticScrollResetTimeout = null;
    }, 600);
  }

  private resetManualScrollTracking(): void {
    this.manualScrollDelta = 0;
    this.lastTouchY = null;
    if (isPlatformBrowser(this.platformId)) {
      this.lastKnownScrollPosition = window.scrollY;
    } else {
      this.lastKnownScrollPosition = null;
    }
  }

  private registerManualScroll(delta: number): void {
    if (!this.isOpen || delta <= 0) {
      return;
    }
    this.manualScrollDelta += Math.abs(delta);
    if (this.manualScrollDelta >= this.manualScrollThreshold) {
      this.closeNavigator();
    }
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
  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const currentPosition = window.scrollY;
    if (this.lastKnownScrollPosition === null) {
      this.lastKnownScrollPosition = currentPosition;
    }

    if (!this.isOpen) {
      this.lastKnownScrollPosition = currentPosition;
      return;
    }

    if (this.programmaticScrollActive) {
      this.lastKnownScrollPosition = currentPosition;
      return;
    }

    const delta = Math.abs(currentPosition - this.lastKnownScrollPosition);
    this.lastKnownScrollPosition = currentPosition;
    this.registerManualScroll(delta);
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    if (this.programmaticScrollActive || !this.isOpen) {
      return;
    }
    this.registerManualScroll(event.deltaY);
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    const touch = event.touches[0];
    this.lastTouchY = touch ? touch.clientY : null;
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (this.programmaticScrollActive || !this.isOpen) {
      return;
    }

    const touch = event.touches[0];
    if (!touch) {
      return;
    }

    if (this.lastTouchY === null) {
      this.lastTouchY = touch.clientY;
      return;
    }

    const delta = Math.abs(touch.clientY - this.lastTouchY);
    this.lastTouchY = touch.clientY;
    this.registerManualScroll(delta);
  }
}
