import { CommonModule, NgClass } from '@angular/common';
import { Component, DestroyRef, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TranslationService } from '../services/translation.service';
import { LanguageCode } from '../models/language-code.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { APP_TITLE_de, APP_TITLE_en, APP_TITLE_es, APP_TITLE_it, APP_TITLE_no, APP_TITLE_ru } from '../constants/general.const';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface NavLinkConfig {
  readonly id: string;
  readonly commands: string[];
  readonly labels: Partial<Record<LanguageCode, string>>;
  readonly exact?: boolean;
}

interface NavLinkView extends NavLinkConfig {
  readonly label$: Observable<string>;
}

type ThemeKey = 'light' | 'dark' | 'blue' | 'green' | 'red';

type TooltipKey = 'theme' | 'language';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, NgClass, MatIconModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  readonly appTitle$: Observable<string>;
  readonly navLinks: NavLinkView[];
  readonly availableThemes: ThemeKey[] = ['light', 'dark', 'blue', 'green', 'red'];
  readonly availableLanguages: LanguageCode[] = ['it', 'en', 'de', 'es', 'no', 'ru'];

  isMobileMenuOpen = false;
  isThemeMenuOpen = false;
  isLanguageMenuOpen = false;

  currentLanguage: LanguageCode;
  currentTheme: ThemeKey = 'dark';

  private readonly themeIcons: Record<ThemeKey, string> = {
    light: 'wb_sunny',
    dark: 'nights_stay',
    blue: 'water_drop',
    green: 'park',
    red: 'flare',
  };

  private readonly themeNames: Record<LanguageCode, Record<ThemeKey, string>> = {
    it: { light: 'Tema chiaro', dark: 'Tema scuro', blue: 'Tema blu', green: 'Tema verde', red: 'Tema rosso' },
    en: { light: 'Light theme', dark: 'Dark theme', blue: 'Blue theme', green: 'Green theme', red: 'Red theme' },
    de: { light: 'Helles Thema', dark: 'Dunkles Thema', blue: 'Blaues Thema', green: 'Grünes Thema', red: 'Rotes Thema' },
    es: { light: 'Tema claro', dark: 'Tema oscuro', blue: 'Tema azul', green: 'Tema verde', red: 'Tema rojo' },
    no: { light: 'Lyst tema', dark: 'Mørkt tema', blue: 'Blått tema', green: 'Grønt tema', red: 'Rødt tema' },
    ru: { light: 'Светлая тема', dark: 'Тёмная тема', blue: 'Синяя тема', green: 'Зелёная тема', red: 'Красная тема' },
  };

  private readonly languageNames: Record<LanguageCode, Record<LanguageCode, string>> = {
    it: { it: 'Italiano', en: 'Inglese', de: 'Tedesco', es: 'Spagnolo', no: 'Norvegese', ru: 'Russo' },
    en: { it: 'Italian', en: 'English', de: 'German', es: 'Spanish', no: 'Norwegian', ru: 'Russian' },
    de: { it: 'Italienisch', en: 'Englisch', de: 'Deutsch', es: 'Spanisch', no: 'Norwegisch', ru: 'Russisch' },
    es: { it: 'Italiano', en: 'Inglés', de: 'Alemán', es: 'Español', no: 'Noruego', ru: 'Ruso' },
    no: { it: 'Italiensk', en: 'Engelsk', de: 'Tysk', es: 'Spansk', no: 'Norsk', ru: 'Russisk' },
    ru: { it: 'Итальянский', en: 'Английский', de: 'Немецкий', es: 'Испанский', no: 'Норвежский', ru: 'Русский' },
  };

  private readonly tooltipTexts: Record<LanguageCode, Record<TooltipKey, string>> = {
    it: { theme: 'Tema', language: 'Lingua' },
    en: { theme: 'Theme', language: 'Language' },
    de: { theme: 'Thema', language: 'Sprache' },
    es: { theme: 'Tema', language: 'Idioma' },
    no: { theme: 'Tema', language: 'Språk' },
    ru: { theme: 'Тема', language: 'Язык' },
  };

  constructor(
    private readonly translationService: TranslationService,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly destroyRef: DestroyRef,
  ) {
    this.currentLanguage = this.translationService.getCurrentLanguage();
    this.appTitle$ = this.translationService.getTranslatedData(
      {
        it: APP_TITLE_it,
        en: APP_TITLE_en,
        de: APP_TITLE_de,
        es: APP_TITLE_es,
        no: APP_TITLE_no,
        ru: APP_TITLE_ru,
      },
      'it',
    );
    this.navLinks = this.createNavLinks();
  }

  ngOnInit(): void {
    this.translationService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((language) => {
        this.currentLanguage = language;
      });

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.closeMobileMenu();
        this.isThemeMenuOpen = false;
        this.isLanguageMenuOpen = false;
      });

    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = localStorage.getItem('theme');
      const theme = this.isValidTheme(storedTheme) ? storedTheme : 'dark';
      this.currentTheme = theme;
      this.applyTheme(theme);
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  toggleThemeMenu(): void {
    this.isThemeMenuOpen = !this.isThemeMenuOpen;
    if (this.isThemeMenuOpen) {
      this.isLanguageMenuOpen = false;
    }
  }

  toggleLanguageMenu(): void {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
    if (this.isLanguageMenuOpen) {
      this.isThemeMenuOpen = false;
    }
  }

  changeTheme(theme: ThemeKey): void {
    if (this.currentTheme === theme) {
      this.isThemeMenuOpen = false;
      return;
    }

    this.currentTheme = theme;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
    }
    this.applyTheme(theme);
    this.isThemeMenuOpen = false;
  }

  changeLanguage(language: LanguageCode): void {
    this.translationService.setLanguage(language);
    this.isLanguageMenuOpen = false;
  }

  getThemeIcon(theme: ThemeKey): string {
    return this.themeIcons[theme];
  }

  getThemeName(theme: ThemeKey): string {
    const names = this.themeNames[this.currentLanguage] ?? this.themeNames['en'];
    return names[theme];
  }

  getLanguageName(language: LanguageCode): string {
    const names = this.languageNames[this.currentLanguage] ?? this.languageNames['en'];
    return names[language];
  }

  getTooltip(key: TooltipKey): string {
    const tooltip = this.tooltipTexts[this.currentLanguage] ?? this.tooltipTexts['en'];
    return tooltip[key];
  }

  trackByNavLinkId(_: number, link: NavLinkView): string {
    return link.id;
  }

  private createNavLinks(): NavLinkView[] {
    const configurations: NavLinkConfig[] = [
      {
        id: 'home',
        commands: ['/'],
        labels: { it: 'Home', en: 'Home', de: 'Startseite', es: 'Inicio', no: 'Hjem', ru: 'Главная' },
        exact: true,
      },
      {
        id: 'projects',
        commands: ['/projects'],
        labels: { it: 'Progetti', en: 'Projects', de: 'Projekte', es: 'Proyectos', no: 'Prosjekter', ru: 'Проекты' },
      },
      {
        id: 'skills',
        commands: ['/skills'],
        labels: { it: 'Competenze', en: 'Skills', de: 'Kompetenzen', es: 'Competencias', no: 'Kompetanser', ru: 'Навыки' },
      },
      {
        id: 'experiences',
        commands: ['/experiences'],
        labels: { it: 'Esperienze', en: 'Experiences', de: 'Erfahrungen', es: 'Experiencias', no: 'Erfaringer', ru: 'Опыт' },
      },
      {
        id: 'contact',
        commands: ['/contact'],
        labels: { it: 'Contatti', en: 'Contact', de: 'Kontakt', es: 'Contactos', no: 'Kontakt', ru: 'Контакты' },
      },
      {
        id: 'privacy',
        commands: ['/privacy'],
        labels: { it: 'Privacy', en: 'Privacy', de: 'Datenschutz', es: 'Privacidad', no: 'Personvern', ru: 'Конфиденциальность' },
      },
    ];

    return configurations.map((config) => ({
      ...config,
      label$: this.translationService.getTranslatedData(config.labels, 'it'),
    }));
  }

  private applyTheme(theme: ThemeKey): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const classList = document.body.classList;
    classList.remove('light-mode', 'dark-mode', 'blue-mode', 'green-mode', 'red-mode');

    if (theme === 'light') {
      classList.add('light-mode');
    } else if (theme === 'dark') {
      classList.add('dark-mode');
    } else if (theme === 'blue') {
      classList.add('blue-mode');
    } else if (theme === 'green') {
      classList.add('green-mode');
    } else if (theme === 'red') {
      classList.add('red-mode');
    }
  }

  private isValidTheme(theme: string | null): theme is ThemeKey {
    return !!theme && this.availableThemes.includes(theme as ThemeKey);
  }
}
