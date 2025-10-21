import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  Inject,
  ViewChild,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';
import { LanguageCode } from '../../models/language-code.type';
import { ThemeKey } from '../../models/theme-key.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { PLATFORM_ID } from '@angular/core';

interface NavigationItem {
  readonly label: string;
  readonly route: string;
  readonly exact?: boolean;
}

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent implements AfterViewInit {
  readonly languages: LanguageCode[] = ['it', 'en', 'de', 'es', 'no', 'ru'];
  readonly themes: ThemeKey[];

  navigationItems: NavigationItem[] = [];
  visibleNavigationItems: NavigationItem[] = [];
  overflowNavigationItems: NavigationItem[] = [];
  currentLanguage: LanguageCode;
  currentTheme: ThemeKey;
  languageLabel = 'Language';
  themeLabel = 'Theme';
  overflowMenuLabel = 'Open navigation menu';
  overflowMenuId = 'topbar-overflow-menu';
  isOverflowMenuOpen = false;

  private readonly navDictionary: Record<LanguageCode, NavigationItem[]> = {
    it: [
      { label: 'Home', route: '/', exact: true },
      { label: 'Chi sono', route: '/about' },
      { label: 'Progetti', route: '/projects' },
      { label: 'Competenze', route: '/skills' },
      { label: 'Formazione', route: '/education' },
      { label: 'Esperienze', route: '/experiences' },
      { label: 'Numeri chiave', route: '/stats' },
      { label: 'Contatti', route: '/contact' },
      { label: 'Privacy', route: '/privacy' },
    ],
    en: [
      { label: 'Home', route: '/', exact: true },
      { label: 'About', route: '/about' },
      { label: 'Projects', route: '/projects' },
      { label: 'Skills', route: '/skills' },
      { label: 'Education', route: '/education' },
      { label: 'Experiences', route: '/experiences' },
      { label: 'Stats', route: '/stats' },
      { label: 'Contacts', route: '/contact' },
      { label: 'Privacy', route: '/privacy' },
    ],
    de: [
      { label: 'Start', route: '/', exact: true },
      { label: 'Über mich', route: '/about' },
      { label: 'Projekte', route: '/projects' },
      { label: 'Fähigkeiten', route: '/skills' },
      { label: 'Ausbildung', route: '/education' },
      { label: 'Erfahrungen', route: '/experiences' },
      { label: 'Kennzahlen', route: '/stats' },
      { label: 'Kontakt', route: '/contact' },
      { label: 'Datenschutz', route: '/privacy' },
    ],
    es: [
      { label: 'Inicio', route: '/', exact: true },
      { label: 'Sobre mí', route: '/about' },
      { label: 'Proyectos', route: '/projects' },
      { label: 'Competencias', route: '/skills' },
      { label: 'Formación', route: '/education' },
      { label: 'Experiencias', route: '/experiences' },
      { label: 'Números clave', route: '/stats' },
      { label: 'Contactos', route: '/contact' },
      { label: 'Privacidad', route: '/privacy' },
    ],
    no: [
      { label: 'Hjem', route: '/', exact: true },
      { label: 'Om meg', route: '/about' },
      { label: 'Prosjekter', route: '/projects' },
      { label: 'Kompetanser', route: '/skills' },
      { label: 'Utdanning', route: '/education' },
      { label: 'Erfaringer', route: '/experiences' },
      { label: 'Nøkkeltall', route: '/stats' },
      { label: 'Kontakt', route: '/contact' },
      { label: 'Personvern', route: '/privacy' },
    ],
    ru: [
      { label: 'Главная', route: '/', exact: true },
      { label: 'Обо мне', route: '/about' },
      { label: 'Проекты', route: '/projects' },
      { label: 'Навыки', route: '/skills' },
      { label: 'Образование', route: '/education' },
      { label: 'Опыт', route: '/experiences' },
      { label: 'Статистика', route: '/stats' },
      { label: 'Контакты', route: '/contact' },
      { label: 'Конфиденциальность', route: '/privacy' },
    ],
  };

  @ViewChild('navContainer') private readonly navContainer?: ElementRef<HTMLElement>;

  private readonly preferenceLabels: Record<LanguageCode, { language: string; theme: string }> = {
    it: { language: 'Lingua', theme: 'Tema' },
    en: { language: 'Language', theme: 'Theme' },
    de: { language: 'Sprache', theme: 'Thema' },
    es: { language: 'Idioma', theme: 'Tema' },
    no: { language: 'Språk', theme: 'Tema' },
    ru: { language: 'Язык', theme: 'Тема' },
  };

  private readonly overflowMenuLabels: Record<LanguageCode, string> = {
    it: 'Apri menu di navigazione',
    en: 'Open navigation menu',
    de: 'Navigationsmenü öffnen',
    es: 'Abrir menú de navegación',
    no: 'Åpne navigasjonsmeny',
    ru: 'Открыть меню навигации',
  };

  private readonly isBrowser: boolean;
  private viewInitialized = false;
  private hasPendingOverflowCheck = false;
  private overflowDetectionFrameId: number | null = null;

  constructor(
    private readonly translationService: TranslationService,
    private readonly themeService: ThemeService,
    private readonly cdr: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly elementRef: ElementRef<HTMLElement>,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.themes = this.themeService.getAvailableThemes();
    this.currentLanguage = this.translationService.getCurrentLanguage();
    this.currentTheme = this.themeService.getCurrentTheme();
    this.navigationItems = this.resolveNavigationItems(this.currentLanguage);
    this.visibleNavigationItems = [...this.navigationItems];
    this.overflowNavigationItems = [];
    this.updatePreferenceLabels(this.currentLanguage);

    this.translationService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(language => {
        this.currentLanguage = language;
        this.navigationItems = this.resolveNavigationItems(language);
        this.visibleNavigationItems = [...this.navigationItems];
        this.overflowNavigationItems = [];
        this.isOverflowMenuOpen = false;
        this.updatePreferenceLabels(language);
        this.scheduleOverflowDetection();
      });

    this.themeService.currentTheme$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(theme => {
        this.currentTheme = theme;
      });

    if (this.isBrowser) {
      fromEvent(window, 'resize')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.scheduleOverflowDetection());
    }

    this.destroyRef.onDestroy(() => {
      if (this.overflowDetectionFrameId !== null && this.isBrowser) {
        cancelAnimationFrame(this.overflowDetectionFrameId);
        this.overflowDetectionFrameId = null;
      }
    });
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    if (this.hasPendingOverflowCheck) {
      this.hasPendingOverflowCheck = false;
    }
    this.scheduleOverflowDetection();
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
    if (!this.themes.includes(theme as ThemeKey)) {
      return;
    }

    const nextTheme = theme as ThemeKey;

    if (nextTheme === this.currentTheme) {
      return;
    }

    this.themeService.setTheme(nextTheme);
  }

  trackByRoute(_: number, item: NavigationItem): string {
    return item.route;
  }

  getThemeLabel(theme: ThemeKey): string {
    return this.themeService.getThemeLabel(theme, this.currentLanguage);
  }

  toggleOverflowMenu(): void {
    this.isOverflowMenuOpen = !this.isOverflowMenuOpen;
    this.cdr.markForCheck();
  }

  closeOverflowMenu(): void {
    if (!this.isOverflowMenuOpen) {
      return;
    }
    this.isOverflowMenuOpen = false;
    this.cdr.markForCheck();
  }

  onOverflowItemSelected(): void {
    this.closeOverflowMenu();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.isBrowser || !this.isOverflowMenuOpen) {
      return;
    }

    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.closeOverflowMenu();
    }
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (!this.isBrowser) {
      return;
    }
    this.closeOverflowMenu();
  }

  private scheduleOverflowDetection(): void {
    if (!this.isBrowser) {
      return;
    }

    if (!this.viewInitialized || !this.navContainer) {
      this.hasPendingOverflowCheck = true;
      return;
    }

    this.hasPendingOverflowCheck = false;

    if (this.overflowDetectionFrameId !== null) {
      cancelAnimationFrame(this.overflowDetectionFrameId);
    }

    this.overflowDetectionFrameId = requestAnimationFrame(() => {
      this.overflowDetectionFrameId = null;
      this.detectOverflow();
    });
  }

  private detectOverflow(): void {
    if (!this.navContainer) {
      return;
    }

    const navElement = this.navContainer.nativeElement;
    let removedAny = false;

    if (this.isOverflowMenuOpen) {
      this.isOverflowMenuOpen = false;
      this.cdr.detectChanges();
    }

    while (this.visibleNavigationItems.length > 0 && this.hasOverflow(navElement)) {
      removedAny = true;
      const removedItem = this.visibleNavigationItems[this.visibleNavigationItems.length - 1];
      this.visibleNavigationItems = this.visibleNavigationItems.slice(0, -1);
      this.overflowNavigationItems = [removedItem, ...this.overflowNavigationItems];
      this.cdr.detectChanges();
    }

    if (removedAny) {
      this.cdr.markForCheck();
      return;
    }

    if (this.overflowNavigationItems.length > 0) {
      let canAddMore = true;

      while (canAddMore && this.overflowNavigationItems.length > 0) {
        const candidate = this.overflowNavigationItems[0];
        this.visibleNavigationItems = [...this.visibleNavigationItems, candidate];
        this.overflowNavigationItems = this.overflowNavigationItems.slice(1);
        this.cdr.detectChanges();

        if (this.hasOverflow(navElement)) {
          this.overflowNavigationItems = [candidate, ...this.overflowNavigationItems];
          this.visibleNavigationItems = this.visibleNavigationItems.slice(0, -1);
          this.cdr.detectChanges();
          canAddMore = false;
        }
      }
    }

    this.cdr.markForCheck();
  }

  private hasOverflow(navElement: HTMLElement): boolean {
    return navElement.scrollWidth - navElement.clientWidth > 1;
  }

  private resolveNavigationItems(language: LanguageCode): NavigationItem[] {
    return this.navDictionary[language] ?? this.navDictionary['it'];
  }

  private updatePreferenceLabels(language: LanguageCode): void {
    const labels = this.preferenceLabels[language] ?? this.preferenceLabels['en'];
    this.languageLabel = labels.language;
    this.themeLabel = labels.theme;
    this.overflowMenuLabel = this.overflowMenuLabels[language] ?? this.overflowMenuLabels['en'];
  }
}
