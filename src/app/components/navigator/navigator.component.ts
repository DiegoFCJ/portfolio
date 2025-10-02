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
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslationService } from '../../services/translation.service';

type SectionItem = {
  index: number;
  label: string;
};

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
export class NavigatorComponent implements OnInit, OnChanges {
  @Input() totalSections: number = 8;
  @Input() currentSectionIndex: number = 0;
  @Output() navigateNext = new EventEmitter<void>();
  @Output() navigatePrevious = new EventEmitter<void>();
  @Output() navigateToSection = new EventEmitter<number>();

  /** Maintains backward compatibility with legacy toggle logic used in tests */
  isOpen = true;

  showLanguageOptions = false;
  showThemeOptions = false;

  currentLang: string;
  currentTheme: 'light' | 'dark' | 'blue' | 'green' = 'light';

  /** Array with all the sections rendered in the timeline */
  sectionItems: SectionItem[] = [];

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

  private readonly sectionLabelTranslations: Record<'en' | 'it' | 'de' | 'es', string[]> = {
    en: ['Welcome', 'About', 'Projects', 'Skills', 'Education', 'Experience', 'Stats', 'Contact'],
    it: ['Benvenuto', 'Chi sono', 'Progetti', 'Competenze', 'Formazione', 'Esperienze', 'Statistiche', 'Contatti'],
    de: ['Willkommen', 'Über mich', 'Projekte', 'Fähigkeiten', 'Ausbildung', 'Erfahrungen', 'Statistiken', 'Kontakt'],
    es: ['Bienvenida', 'Sobre mí', 'Proyectos', 'Habilidades', 'Educación', 'Experiencias', 'Estadísticas', 'Contacto']
  };

  constructor(
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private elementRef: ElementRef
  ) {
    this.currentLang = this.translationService.getCurrentLanguage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalSections']) {
      this.updateSections();
    }

    if (changes['currentSectionIndex']) {
      this.currentSectionIndex = this.normalizeSectionIndex(this.currentSectionIndex);
    }
  }

  ngOnInit(): void {
    // keep language in sync with translation service
    this.translationService.currentLanguage$.subscribe(lang => {
      this.currentLang = lang;
      this.updateSections();
    });
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = (localStorage.getItem('theme') as 'light' | 'dark' | 'blue' | 'green') || 'light';
      this.currentTheme = storedTheme;
      this.applyTheme(storedTheme);
    }
    this.updateSections();
  }

  onNext(): void {
    if (this.currentSectionIndex < this.totalSections - 1) {
      this.navigateNext.emit();
    }
  }

  onPrevious(): void {
    if (this.currentSectionIndex > 0) {
      this.navigatePrevious.emit();
    }
  }

  onSelectSection(index: number): void {
    const targetIndex = this.normalizeSectionIndex(index);
    if (targetIndex !== this.currentSectionIndex) {
      this.navigateToSection.emit(targetIndex);
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

  /** Returns the section currently active in the timeline */
  get activeSection(): SectionItem | null {
    return this.sectionItems[this.currentSectionIndex] ?? null;
  }

  /** Returns the percentage used by the animated progress indicator */
  get progressPercentage(): number {
    if (this.totalSections <= 1) {
      return this.sectionItems.length ? 100 : 0;
    }

    const ratio = this.currentSectionIndex / (this.totalSections - 1);
    return Math.min(100, Math.max(0, ratio * 100));
  }

  trackBySection = (_: number, item: SectionItem) => item.index;

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

  /** Host listener to detect clicks outside and close */
  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.showLanguageOptions = false;
      this.showThemeOptions = false;
    }
  }

  private updateSections(): void {
    const translatedLabels = this.translationService.getTranslatedData(this.sectionLabelTranslations) || [];

    this.sectionItems = Array.from({ length: this.totalSections }, (_, index) => ({
      index,
      label: translatedLabels[index] ?? this.defaultSectionLabel(index)
    }));

    this.currentSectionIndex = this.normalizeSectionIndex(this.currentSectionIndex);
  }

  private defaultSectionLabel(index: number): string {
    const languageFallbacks: Record<'en' | 'it' | 'de' | 'es', string> = {
      en: `Section ${index + 1}`,
      it: `Sezione ${index + 1}`,
      de: `Abschnitt ${index + 1}`,
      es: `Sección ${index + 1}`
    };

    const fallback = languageFallbacks[this.currentLang as 'en' | 'it' | 'de' | 'es'];
    return fallback ?? `Section ${index + 1}`;
  }

  private normalizeSectionIndex(index: number): number {
    if (this.sectionItems.length === 0) {
      return 0;
    }

    return Math.min(this.sectionItems.length - 1, Math.max(0, index));
  }
}
