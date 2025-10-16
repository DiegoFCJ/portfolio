import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  Inject,
  PLATFORM_ID,
  HostListener,
  ElementRef,
  QueryList,
  ViewChildren,
  DestroyRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslationService } from '../../services/translation.service';
import { NavigationDictionaryService } from '../../services/navigation-dictionary.service';
import { ThemeKey } from '../../models/theme-key.type';
import { LanguageCode } from '../../models/language-code.type';
import { NavigatorPageLinkDefinition } from '../../constants/navigation-dictionary.const';

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
  private _totalSections = 8;
  private _currentSectionIndex = 0;

  @Input()
  set totalSections(value: number) {
    const sanitized = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
    this._totalSections = sanitized;
    if (this._currentSectionIndex > this._totalSections - 1) {
      this._currentSectionIndex = Math.max(0, this._totalSections - 1);
    }
  }

  get totalSections(): number {
    return this._totalSections;
  }

  @Input()
  set currentSectionIndex(value: number) {
    if (!Number.isFinite(value)) {
      this._currentSectionIndex = 0;
      return;
    }
    const normalized = Math.max(0, Math.floor(value));
    this._currentSectionIndex = this.totalSections > 0
      ? Math.min(normalized, this.totalSections - 1)
      : 0;
  }

  get currentSectionIndex(): number {
    return this._currentSectionIndex;
  }

  @Output() navigateNext = new EventEmitter<void>();
  @Output() navigatePrevious = new EventEmitter<void>();

  showLanguageOptions = false;
  showThemeOptions = false;
  showPageOptions = false;

  currentLang: LanguageCode;
  currentTheme: ThemeKey = 'dark';
  readonly availableThemes: ThemeKey[];
  readonly availableLanguages: LanguageCode[];
  readonly pageLinks: NavigatorPageLinkDefinition[];

  /** Controls visibility of the navigator */
  isOpen = true;

  /** Tracks whether the current scroll was triggered programmatically */
  private programmaticScroll = false;
  private programmaticScrollTimeout: ReturnType<typeof setTimeout> | null = null;

  private readonly tooltipTexts = this.navigationDictionary.getNavigatorTooltips();
  private readonly tooltipFallbackOrder = this.navigationDictionary.getTooltipFallbackOrder();
  private readonly themeNames = this.navigationDictionary.getThemeNames();
  private readonly languageNames = this.navigationDictionary.getLanguageNames();
  private readonly languageFlags = this.navigationDictionary.getLanguageFlags();
  private readonly toggleButtonLabels = this.navigationDictionary.getToggleButtonLabels();
  private readonly menuLabels = this.navigationDictionary.getMenuLabels();

  @ViewChildren('pageLinkButton')
  private pageLinkButtons!: QueryList<ElementRef<HTMLButtonElement>>;

  constructor(
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private elementRef: ElementRef,
    private router: Router,
    private navigationDictionary: NavigationDictionaryService,
    private readonly destroyRef: DestroyRef,
  ) {
    this.currentLang = this.translationService.getCurrentLanguage();
    this.availableThemes = this.navigationDictionary.getAvailableThemes();
    this.availableLanguages = this.navigationDictionary.getAvailableLanguages();
    this.pageLinks = this.navigationDictionary.getPageLinks();
  }

  ngOnInit(): void {
    this.translationService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(lang => {
        this.currentLang = lang;
        this.closePageOptions();
      });

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.closePageOptions();
        this.showLanguageOptions = false;
        this.showThemeOptions = false;
      });

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
    if (this.canNavigateNext) {
      this.startProgrammaticScroll();
      this.navigateNext.emit();
    }
  }

  onPrevious(): void {
    if (this.canNavigatePrevious) {
      this.startProgrammaticScroll();
      this.navigatePrevious.emit();
    }
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
      setTimeout(() => this.focusFirstPageLink(), 0);
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

  async navigateToPage(link: NavigatorPageLinkDefinition): Promise<void> {
    this.closePageOptions();
    try {
      await this.router.navigateByUrl(link.path);
    } catch {
      // Navigation failures are handled by Angular's router
    }
  }

  /** Returns the tooltip text for the given key based on current language */
  getTooltip(key: 'prev' | 'next' | 'theme' | 'language' | 'pages'): string {
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

  getMenuLabel(): string {
    return this.menuLabels[this.currentLang] ?? this.menuLabels['en'];
  }

  getPageLabel(link: NavigatorPageLinkDefinition): string {
    return link.labels[this.currentLang] ?? link.labels['en'];
  }

  isActiveLink(link: NavigatorPageLinkDefinition): boolean {
    const currentPath = this.normalizePath(this.router.url ?? '');
    const linkPath = this.normalizePath(link.path);
    return currentPath === linkPath;
  }

  getAriaCurrent(link: NavigatorPageLinkDefinition): 'page' | undefined {
    return this.isActiveLink(link) ? 'page' : undefined;
  }

  onPageOptionsKeydown(event: KeyboardEvent): void {
    if (!this.showPageOptions || event.key !== 'Tab') {
      return;
    }

    const buttons = this.pageLinkButtons?.filter(ref => !!ref.nativeElement) ?? [];
    if (buttons.length === 0) {
      return;
    }

    const first = buttons[0].nativeElement;
    const last = buttons[buttons.length - 1].nativeElement;
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && (this.showLanguageOptions || this.showThemeOptions || this.showPageOptions)) {
      this.resetOptionMenus();
      event.stopPropagation();
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
  @HostListener('window:wheel', ['$event'])
  onWindowWheel(event: WheelEvent): void {
    this.handleManualScrollEvent(event.target as HTMLElement | null);
  }

  @HostListener('window:touchmove', ['$event'])
  onWindowTouchMove(event: TouchEvent): void {
    this.handleManualScrollEvent(event.target as HTMLElement | null);
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

  private focusFirstPageLink(): void {
    const first = this.pageLinkButtons?.first?.nativeElement;
    first?.focus({ preventScroll: true });
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

  private normalizePath(path: string): string {
    if (!path) {
      return '/';
    }
    const [clean] = path.split('?');
    const withoutHash = clean.split('#')[0];
    const trimmed = withoutHash.endsWith('/') && withoutHash.length > 1
      ? withoutHash.slice(0, -1)
      : withoutHash;
    return trimmed || '/';
  }
}
