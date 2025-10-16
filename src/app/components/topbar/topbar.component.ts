import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslationService } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';
import { ThemeKey } from '../../models/theme-key.type';
import { LanguageCode } from '../../models/language-code.type';

interface NavigationItem {
  readonly label: string;
  readonly route: string;
  readonly exact?: boolean;
}

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  readonly languages: LanguageCode[] = ['it', 'en', 'de', 'es', 'no', 'ru'];
  readonly navigationDictionary: Record<LanguageCode, NavigationItem[]> = {
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

  readonly themeLabels: Record<LanguageCode, Record<ThemeKey, string>> = {
    it: { light: 'Chiaro', dark: 'Scuro', blue: 'Blu', green: 'Verde', red: 'Rosso' },
    en: { light: 'Light', dark: 'Dark', blue: 'Blue', green: 'Green', red: 'Red' },
    de: { light: 'Hell', dark: 'Dunkel', blue: 'Blau', green: 'Grün', red: 'Rot' },
    es: { light: 'Claro', dark: 'Oscuro', blue: 'Azul', green: 'Verde', red: 'Rojo' },
    no: { light: 'Lys', dark: 'Mørk', blue: 'Blå', green: 'Grønn', red: 'Rød' },
    ru: { light: 'Светлая', dark: 'Тёмная', blue: 'Синяя', green: 'Зелёная', red: 'Красная' },
  };

  readonly preferenceLabels: Record<LanguageCode, { language: string; theme: string }> = {
    it: { language: 'Lingua', theme: 'Tema' },
    en: { language: 'Language', theme: 'Theme' },
    de: { language: 'Sprache', theme: 'Thema' },
    es: { language: 'Idioma', theme: 'Tema' },
    no: { language: 'Språk', theme: 'Tema' },
    ru: { language: 'Язык', theme: 'Тема' },
  };

  navigationItems: NavigationItem[] = [];
  languageLabel = 'Language';
  themeLabel = 'Theme';
  currentLanguage: LanguageCode;
  currentTheme: ThemeKey;
  readonly themes: ThemeKey[];

  constructor(
    private readonly translationService: TranslationService,
    private readonly themeService: ThemeService,
    private readonly destroyRef: DestroyRef,
  ) {
    this.currentLanguage = this.translationService.getCurrentLanguage();
    this.navigationItems = this.navigationDictionary[this.currentLanguage] ?? [];
    this.languageLabel = this.preferenceLabels[this.currentLanguage]?.language ?? 'Language';
    this.themeLabel = this.preferenceLabels[this.currentLanguage]?.theme ?? 'Theme';
    this.currentTheme = this.themeService.getCurrentTheme();
    this.themes = this.themeService.getAvailableThemes();
  }

  ngOnInit(): void {
    this.translationService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((language) => {
        this.currentLanguage = language;
        this.navigationItems = this.navigationDictionary[language] ?? [];
        const labels = this.preferenceLabels[language] ?? this.preferenceLabels['en'];
        this.languageLabel = labels.language;
        this.themeLabel = labels.theme;
      });

    this.themeService.currentTheme$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((theme) => (this.currentTheme = theme));
  }

  trackByRoute(_: number, item: NavigationItem): string {
    return item.route;
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

    this.themeService.setTheme(theme as ThemeKey);
  }

  getThemeLabel(theme: ThemeKey): string {
    const labels = this.themeLabels[this.currentLanguage] ?? this.themeLabels['en'];
    return labels[theme];
  }
}
