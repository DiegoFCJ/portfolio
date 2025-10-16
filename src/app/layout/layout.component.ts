import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslationService } from '../services/translation.service';
import { LanguageCode } from '../models/language-code.type';
import { AssistantComponent } from '../components/assistant/assistant.component';
import { NavigationDataService, NavigationItem, PreferenceLabels, ThemeOption } from '../services/navigation-data.service';
import { ThemeKey } from '../models/theme-key.type';
import { NavigatorComponent } from '../components/navigator/navigator.component';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AssistantComponent,
    NavigatorComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  readonly languageMenuId = 'layout-language-menu';
  readonly themeMenuId = 'layout-theme-menu';

  showLanguageMenu = false;
  showThemeMenu = false;

  currentLanguage: LanguageCode;
  currentTheme: ThemeKey;

  navigationItems: NavigationItem[] = [];
  readonly languages: LanguageCode[];
  readonly themes: ThemeOption[];
  languageLabel = 'Language';
  themeLabel = 'Theme';

  totalSections = 0;
  currentSectionIndex = 0;

  private readonly preferenceLabels: Record<LanguageCode, PreferenceLabels>;
  private sectionElements: HTMLElement[] = [];
  private programmaticScrollTimeout: ReturnType<typeof setTimeout> | null = null;
  private programmaticScroll = false;
  private readonly isBrowser: boolean;

  constructor(
    private readonly translationService: TranslationService,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    private readonly navigationData: NavigationDataService,
    private readonly themeService: ThemeService,
    private readonly elementRef: ElementRef,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.currentLanguage = this.translationService.getCurrentLanguage();
    this.currentTheme = this.themeService.getCurrentTheme();
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
        this.closePreferenceMenus();
      });

    this.themeService.theme$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((theme) => {
        this.currentTheme = theme;
      });

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event) => {
        const url = event.urlAfterRedirects ?? event.url;
        this.closePreferenceMenus();
        this.handleNavigatorContext(url);
      });

    this.handleNavigatorContext(this.router.url);
  }

  toggleLanguageMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showLanguageMenu = !this.showLanguageMenu;
    if (this.showLanguageMenu) {
      this.showThemeMenu = false;
    }
  }

  toggleThemeMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showThemeMenu = !this.showThemeMenu;
    if (this.showThemeMenu) {
      this.showLanguageMenu = false;
    }
  }

  onSelectLanguage(language: LanguageCode): void {
    if (language === this.currentLanguage) {
      this.closePreferenceMenus();
      return;
    }

    if (!this.languages.includes(language)) {
      return;
    }

    this.translationService.setLanguage(language);
    this.closePreferenceMenus();
  }

  onSelectTheme(theme: ThemeKey): void {
    if (!this.themes.some((option) => option.key === theme)) {
      return;
    }

    this.themeService.setTheme(theme);
    this.closePreferenceMenus();
  }

  onNavigateNextSection(): void {
    if (!this.sectionElements.length || this.currentSectionIndex >= this.sectionElements.length - 1) {
      return;
    }

    this.scrollToSection(this.currentSectionIndex + 1);
  }

  onNavigatePreviousSection(): void {
    if (!this.sectionElements.length || this.currentSectionIndex <= 0) {
      return;
    }

    this.scrollToSection(this.currentSectionIndex - 1);
  }

  onNavigateLink(): void {
    this.closePreferenceMenus();
  }

  trackByRoute(_: number, item: NavigationItem): string {
    return item.route;
  }

  getLanguageName(language: LanguageCode): string {
    return this.navigationData.getLanguageName(this.currentLanguage, language);
  }

  getThemeName(theme: ThemeKey): string {
    return this.navigationData.getThemeName(this.currentLanguage, theme);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.showLanguageMenu && !this.showThemeMenu) {
      return;
    }

    const target = event.target as Node | null;
    if (!target) {
      return;
    }

    if (!this.elementRef.nativeElement.contains(target)) {
      this.closePreferenceMenus();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closePreferenceMenus();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.isBrowser || !this.sectionElements.length || this.programmaticScroll) {
      return;
    }

    this.syncCurrentSectionFromScroll();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (!this.isBrowser || !this.sectionElements.length) {
      return;
    }

    this.syncCurrentSectionFromScroll(true);
  }

  private resolveNavigationItems(language: LanguageCode): NavigationItem[] {
    return this.navigationData.getNavigationItems(language);
  }

  private updatePreferenceLabels(language: LanguageCode): void {
    const labels = this.preferenceLabels[language] ?? this.navigationData.getPreferenceLabels('en');
    this.languageLabel = labels.language;
    this.themeLabel = labels.theme;
  }

  private closePreferenceMenus(): void {
    this.showLanguageMenu = false;
    this.showThemeMenu = false;
  }

  private handleNavigatorContext(url: string): void {
    if (!this.isBrowser) {
      this.totalSections = 0;
      this.currentSectionIndex = 0;
      this.sectionElements = [];
      return;
    }

    if (this.isHomeRoute(url)) {
      this.hydrateHomeSections();
    } else {
      this.sectionElements = [];
      this.totalSections = 0;
      this.currentSectionIndex = 0;
    }
  }

  private hydrateHomeSections(): void {
    if (!this.isBrowser) {
      return;
    }

    requestAnimationFrame(() => {
      const sections = Array.from(document.querySelectorAll('.home__section')) as HTMLElement[];
      this.sectionElements = sections;
      this.totalSections = sections.length;
      this.syncCurrentSectionFromScroll(true);
    });
  }

  private syncCurrentSectionFromScroll(force = false): void {
    if (!this.isBrowser || !this.sectionElements.length) {
      return;
    }

    if (this.programmaticScroll && !force) {
      return;
    }

    const scrollPosition = window.scrollY + window.innerHeight * 0.2;
    let nextIndex = 0;

    this.sectionElements.forEach((section, index) => {
      if (scrollPosition >= section.offsetTop) {
        nextIndex = index;
      }
    });

    if (this.currentSectionIndex !== nextIndex) {
      this.currentSectionIndex = nextIndex;
    }
  }

  private scrollToSection(index: number): void {
    if (!this.isBrowser) {
      return;
    }

    const targetSection = this.sectionElements[index];
    if (!targetSection) {
      return;
    }

    this.programmaticScroll = true;

    if (this.programmaticScrollTimeout) {
      clearTimeout(this.programmaticScrollTimeout);
    }

    const top = Math.max(targetSection.offsetTop - 16, 0);
    window.scrollTo({ top, behavior: 'smooth' });
    this.currentSectionIndex = index;

    this.programmaticScrollTimeout = setTimeout(() => {
      this.programmaticScroll = false;
      this.syncCurrentSectionFromScroll();
    }, 800);
  }

  private isHomeRoute(url: string): boolean {
    const normalized = (url ?? '').split('?')[0]?.split('#')[0] ?? '';
    return normalized === '' || normalized === '/';
  }
}
