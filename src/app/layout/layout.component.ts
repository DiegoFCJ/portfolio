import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslationService } from '../services/translation.service';
import { LanguageCode } from '../models/language-code.type';
import { AssistantComponent } from '../components/assistant/assistant.component';
import {
  APP_TITLE_de,
  APP_TITLE_en,
  APP_TITLE_es,
  APP_TITLE_it,
  APP_TITLE_no,
  APP_TITLE_ru,
} from '../constants/general.const';

type ThemeKey = 'light' | 'dark' | 'blue' | 'green' | 'red';
type NavKey = 'home' | 'projects' | 'skills' | 'experiences' | 'contact' | 'privacy';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, AssistantComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  readonly navLinks: { path: string; key: NavKey; exact?: boolean }[] = [
    { path: '/', key: 'home', exact: true },
    { path: '/projects', key: 'projects' },
    { path: '/skills', key: 'skills' },
    { path: '/experiences', key: 'experiences' },
    { path: '/contact', key: 'contact' },
    { path: '/privacy', key: 'privacy' },
  ];

  readonly availableLanguages: LanguageCode[] = ['it', 'en', 'de', 'es', 'no', 'ru'];
  readonly availableThemes: ThemeKey[] = ['light', 'dark', 'blue', 'green', 'red'];

  menuOpen = false;
  currentLanguage: LanguageCode = 'it';
  currentTheme: ThemeKey = 'dark';

  private readonly navigationLabels: Record<NavKey, Partial<Record<LanguageCode, string>>> = {
    home: {
      it: 'Home',
      en: 'Home',
      de: 'Start',
      es: 'Inicio',
      no: 'Hjem',
      ru: 'Главная',
    },
    projects: {
      it: 'Progetti',
      en: 'Projects',
      de: 'Projekte',
      es: 'Proyectos',
      no: 'Prosjekter',
      ru: 'Проекты',
    },
    skills: {
      it: 'Competenze',
      en: 'Skills',
      de: 'Kompetenzen',
      es: 'Competencias',
      no: 'Kompetanse',
      ru: 'Навыки',
    },
    experiences: {
      it: 'Esperienze',
      en: 'Experience',
      de: 'Erfahrungen',
      es: 'Experiencias',
      no: 'Erfaring',
      ru: 'Опыт',
    },
    contact: {
      it: 'Contatti',
      en: 'Contact',
      de: 'Kontakt',
      es: 'Contacto',
      no: 'Kontakt',
      ru: 'Контакты',
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

  private readonly themeNames: Record<string, Record<ThemeKey, string>> = {
    en: { light: 'Light', dark: 'Dark', blue: 'Blue', green: 'Green', red: 'Red' },
    it: { light: 'Chiaro', dark: 'Scuro', blue: 'Blu', green: 'Verde', red: 'Rosso' },
    de: { light: 'Hell', dark: 'Dunkel', blue: 'Blau', green: 'Grün', red: 'Rot' },
    es: { light: 'Claro', dark: 'Oscuro', blue: 'Azul', green: 'Verde', red: 'Rojo' },
    no: { light: 'Lys', dark: 'Mørk', blue: 'Blå', green: 'Grønn', red: 'Rød' },
    ru: { light: 'Светлая', dark: 'Тёмная', blue: 'Синяя', green: 'Зелёная', red: 'Красная' },
  };

  private readonly languageNames: Record<string, Record<LanguageCode, string>> = {
    en: { en: 'English', it: 'Italian', de: 'German', es: 'Spanish', no: 'Norwegian', ru: 'Russian' },
    it: { en: 'Inglese', it: 'Italiano', de: 'Tedesco', es: 'Spagnolo', no: 'Norvegese', ru: 'Russo' },
    de: { en: 'Englisch', it: 'Italienisch', de: 'Deutsch', es: 'Spanisch', no: 'Norwegisch', ru: 'Russisch' },
    es: { en: 'Inglés', it: 'Italiano', de: 'Alemán', es: 'Español', no: 'Noruego', ru: 'Ruso' },
    no: { en: 'Engelsk', it: 'Italiensk', de: 'Tysk', es: 'Spansk', no: 'Norsk', ru: 'Russisk' },
    ru: { en: 'Английский', it: 'Итальянский', de: 'Немецкий', es: 'Испанский', no: 'Норвежский', ru: 'Русский' },
  };

  private readonly appTitleMap: Record<LanguageCode, string> = {
    en: APP_TITLE_en,
    it: APP_TITLE_it,
    de: APP_TITLE_de,
    es: APP_TITLE_es,
    no: APP_TITLE_no,
    ru: APP_TITLE_ru,
  };

  constructor(
    private readonly router: Router,
    private readonly translationService: TranslationService,
    private readonly destroyRef: DestroyRef,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
  ) { }

  ngOnInit(): void {
    this.currentLanguage = this.translationService.getCurrentLanguage();

    this.translationService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(language => {
        this.currentLanguage = language;
      });

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.menuOpen = false;
      });

    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = localStorage.getItem('theme');
      const nextTheme = this.isValidTheme(storedTheme) ? storedTheme : 'dark';
      this.currentTheme = nextTheme;
      this.applyTheme(nextTheme);
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  changeLanguage(language: LanguageCode): void {
    if (!this.availableLanguages.includes(language)) {
      return;
    }

    this.translationService.setLanguage(language);
    this.menuOpen = false;
  }

  changeTheme(theme: ThemeKey): void {
    if (!this.availableThemes.includes(theme)) {
      return;
    }

    this.currentTheme = theme;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
    }

    this.applyTheme(theme);
    this.menuOpen = false;
  }

  getNavLabel(key: NavKey): string {
    const dictionary = this.navigationLabels[key];
    return dictionary[this.currentLanguage] ?? dictionary['it'] ?? key;
  }

  getThemeLabel(theme: ThemeKey): string {
    const names = this.themeNames[this.currentLanguage] ?? this.themeNames['en'];
    return names[theme] ?? theme;
  }

  getLanguageLabel(language: LanguageCode): string {
    const names = this.languageNames[this.currentLanguage] ?? this.languageNames['en'];
    return names[language] ?? language;
  }

  getBrandTitle(): string {
    return this.appTitleMap[this.currentLanguage] ?? APP_TITLE_it;
  }

  private applyTheme(theme: ThemeKey): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

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

  private isValidTheme(theme: string | null): theme is ThemeKey {
    return this.availableThemes.includes((theme ?? '') as ThemeKey);
  }
}
