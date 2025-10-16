import { CommonModule } from '@angular/common';
import { Component, DestroyRef, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslationService } from '../services/translation.service';
import { LanguageCode } from '../models/language-code.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AssistantComponent } from '../components/assistant/assistant.component';

interface NavigationItem {
  readonly label: string;
  readonly route: string;
  readonly exact?: boolean;
}

interface ThemeOption {
  readonly key: ThemeKey;
  readonly label: string;
}

type ThemeKey = 'light' | 'dark' | 'blue' | 'green' | 'red';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AssistantComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  menuOpen = false;
  currentLanguage: LanguageCode;
  currentTheme: ThemeKey = 'dark';

  navigationItems: NavigationItem[] = [];
  readonly languages: LanguageCode[] = ['it', 'en', 'de', 'es', 'no', 'ru'];
  readonly themes: ThemeOption[] = [
    { key: 'light', label: 'Light' },
    { key: 'dark', label: 'Dark' },
    { key: 'blue', label: 'Blue' },
    { key: 'green', label: 'Green' },
    { key: 'red', label: 'Red' },
  ];

  languageLabel = 'Language';
  themeLabel = 'Theme';

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

  private readonly preferenceLabels: Record<LanguageCode, { language: string; theme: string }> = {
    it: { language: 'Lingua', theme: 'Tema' },
    en: { language: 'Language', theme: 'Theme' },
    de: { language: 'Sprache', theme: 'Thema' },
    es: { language: 'Idioma', theme: 'Tema' },
    no: { language: 'Språk', theme: 'Tema' },
    ru: { language: 'Язык', theme: 'Тема' },
  };

  constructor(
    private readonly translationService: TranslationService,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
  ) {
    this.currentLanguage = this.translationService.getCurrentLanguage();
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
      });

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.menuOpen = false);

    this.restoreTheme();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
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
    if (!this.themes.some((option) => option.key === theme)) {
      return;
    }

    const nextTheme = theme as ThemeKey;

    if (nextTheme === this.currentTheme) {
      return;
    }

    this.currentTheme = nextTheme;
    this.persistTheme(nextTheme);
    this.applyTheme(nextTheme);
  }

  trackByRoute(_: number, item: NavigationItem): string {
    return item.route;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (window.innerWidth > 960 && this.menuOpen) {
      this.menuOpen = false;
    }
  }

  private resolveNavigationItems(language: LanguageCode): NavigationItem[] {
    return this.navDictionary[language] ?? this.navDictionary['it'];
  }

  private restoreTheme(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem('theme') as ThemeKey | null;
    if (stored && this.themes.some((theme) => theme.key === stored)) {
      this.currentTheme = stored;
      this.applyTheme(stored);
    } else {
      this.applyTheme(this.currentTheme);
    }
  }

  private persistTheme(theme: ThemeKey): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem('theme', theme);
  }

  private applyTheme(theme: ThemeKey): void {
    if (typeof document === 'undefined') {
      return;
    }

    const classList = document.body.classList;
    classList.remove('light-mode', 'dark-mode', 'blue-mode', 'green-mode', 'red-mode');

    switch (theme) {
      case 'light':
        classList.add('light-mode');
        break;
      case 'dark':
        classList.add('dark-mode');
        break;
      case 'blue':
        classList.add('blue-mode');
        break;
      case 'green':
        classList.add('green-mode');
        break;
      case 'red':
        classList.add('red-mode');
        break;
    }
  }

  private updatePreferenceLabels(language: LanguageCode): void {
    const labels = this.preferenceLabels[language] ?? this.preferenceLabels['en'];
    this.languageLabel = labels.language;
    this.themeLabel = labels.theme;
  }
}
