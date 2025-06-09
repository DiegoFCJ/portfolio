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
    console.log('currentSectionIndex ngOnInit', this.currentSectionIndex)
  }

  onNext(): void {
    console.log('currentSectionIndex onNext', this.currentSectionIndex)
    if (this.currentSectionIndex < this.totalSections - 1) {
      this.navigateNext.emit();
    }
  }

  onPrevious(): void {
    console.log('currentSectionIndex onPrevious', this.currentSectionIndex)
    if (this.currentSectionIndex > 0) {
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
    this.isOpen = !this.isOpen;
  }

  /** Opens the navigator */
  openNavigator(): void {
    this.isOpen = true;
  }

  /** Host listener to detect clicks outside and close */
  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside && this.isOpen) {
      this.isOpen = false;
    }
  }
}