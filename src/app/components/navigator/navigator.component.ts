import { Component, EventEmitter, Input, Output, OnInit, Inject, PLATFORM_ID, HostListener, ElementRef, ViewChild, DestroyRef, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslationService } from '../../services/translation.service';

interface CommandAction {
  label: string;
  icon: string;
  group: 'Navigation' | 'Theme' | 'Language';
  action: () => void;
}

@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
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

  isPaletteOpen = false;
  private _searchTerm = '';
  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.resetCommandFocus();
  }
  commands: CommandAction[] = [];

  currentLang: string;
  currentTheme: 'light' | 'dark' | 'blue' | 'green' = 'light';

  /** Controls visibility of the navigator */
  isOpen = false;

  @ViewChild('searchInput') searchInputRef?: ElementRef<HTMLInputElement>;
  @ViewChild('palettePanel') palettePanelRef?: ElementRef<HTMLDivElement>;

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

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private elementRef: ElementRef
  ) {
    this.currentLang = this.translationService.getCurrentLanguage();
  }

  ngOnInit(): void {
    // keep language in sync with translation service
    this.translationService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(lang => {
        this.currentLang = lang;
        this.buildCommands();
      });
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = (localStorage.getItem('theme') as 'light' | 'dark' | 'blue' | 'green') || 'light';
      this.currentTheme = storedTheme;
      this.applyTheme(storedTheme);
    }
    this.buildCommands();
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
    this.buildCommands();
  }

  changeTheme(theme: 'light' | 'dark' | 'blue' | 'green'): void {
    this.currentTheme = theme;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
      this.applyTheme(theme);
    }
    this.showThemeOptions = false;
    this.buildCommands();
  }

  /** Returns the tooltip text for the given key based on current language */
  getTooltip(key: 'prev' | 'next' | 'theme' | 'language'): string {
    return this.tooltipTexts[this.currentLang][key];
  }

  get filteredCommands(): CommandAction[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.commands;
    }
    return this.commands.filter(command =>
      command.label.toLowerCase().includes(term) || command.group.toLowerCase().includes(term)
    );
  }

  get groupedFilteredCommands(): { group: CommandAction['group']; commands: CommandAction[] }[] {
    const groups: CommandAction['group'][] = ['Navigation', 'Theme', 'Language'];
    const filtered = this.filteredCommands;
    return groups
      .map(group => ({ group, commands: filtered.filter(command => command.group === group) }))
      .filter(group => group.commands.length > 0);
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

  openPalette(): void {
    this.isPaletteOpen = true;
    this.searchTerm = '';
    this.showLanguageOptions = false;
    this.showThemeOptions = false;
    setTimeout(() => this.focusSearchInput());
  }

  closePalette(): void {
    this.isPaletteOpen = false;
  }

  togglePalette(): void {
    if (this.isPaletteOpen) {
      this.closePalette();
    } else {
      this.openPalette();
    }
  }

  executeCommand(command: CommandAction): void {
    command.action();
    this.closePalette();
  }

  handlePaletteKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.focusRelativeCommand('next');
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.focusRelativeCommand('previous');
      return;
    }
    if (event.key === 'Tab') {
      const focusable = this.getFocusableElements();
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement as HTMLElement | null;
      if (event.shiftKey) {
        if (current === first || !current) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (current === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleGlobalShortcuts(event: KeyboardEvent): void {
    const isToggleShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';
    if (isToggleShortcut) {
      event.preventDefault();
      this.togglePalette();
    }
    if (event.key === 'Escape' && this.isPaletteOpen) {
      event.preventDefault();
      this.closePalette();
    }
  }

  /** Host listener to detect clicks outside and close */
  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside && this.isOpen) {
      this.isOpen = false;
    }
    if (!clickedInside && this.isPaletteOpen) {
      this.closePalette();
    }
  }

  private focusSearchInput(): void {
    this.searchInputRef?.nativeElement?.focus();
  }

  private getFocusableElements(): HTMLElement[] {
    const panel = this.palettePanelRef?.nativeElement;
    if (!panel) {
      return [];
    }
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    return Array.from(panel.querySelectorAll<HTMLElement>(focusableSelectors)).filter(el => !el.hasAttribute('disabled'));
  }

  private getCommandButtons(): HTMLButtonElement[] {
    const panel = this.palettePanelRef?.nativeElement;
    if (!panel) {
      return [];
    }
    return Array.from(panel.querySelectorAll<HTMLButtonElement>('[data-command-button]'));
  }

  private focusRelativeCommand(direction: 'next' | 'previous'): void {
    const buttons = this.getCommandButtons();
    if (!buttons.length) {
      return;
    }
    const activeElement = document.activeElement as HTMLElement | null;
    const currentIndex = buttons.indexOf(activeElement as HTMLButtonElement);
    if (currentIndex === 0 && direction === 'previous') {
      this.focusSearchInput();
      return;
    }
    let targetIndex: number;
    if (currentIndex === -1) {
      targetIndex = direction === 'next' ? 0 : buttons.length - 1;
    } else if (direction === 'next') {
      targetIndex = Math.min(currentIndex + 1, buttons.length - 1);
    } else {
      targetIndex = Math.max(currentIndex - 1, 0);
    }
    buttons[targetIndex].focus();
  }

  private resetCommandFocus(): void {
    if (!this.isPaletteOpen) {
      return;
    }
    this.focusSearchInput();
  }

  private buildCommands(): void {
    this.commands = [
      {
        label: 'Go to next section',
        icon: 'arrow_downward',
        group: 'Navigation',
        action: () => this.onNext()
      },
      {
        label: 'Go to previous section',
        icon: 'arrow_upward',
        group: 'Navigation',
        action: () => this.onPrevious()
      },
      {
        label: 'Switch to light theme',
        icon: 'light_mode',
        group: 'Theme',
        action: () => this.changeTheme('light')
      },
      {
        label: 'Switch to dark theme',
        icon: 'dark_mode',
        group: 'Theme',
        action: () => this.changeTheme('dark')
      },
      {
        label: 'Switch to blue theme',
        icon: 'water_drop',
        group: 'Theme',
        action: () => this.changeTheme('blue')
      },
      {
        label: 'Switch to green theme',
        icon: 'eco',
        group: 'Theme',
        action: () => this.changeTheme('green')
      },
      {
        label: 'Change language to English',
        icon: 'language',
        group: 'Language',
        action: () => this.changeLanguage('en')
      },
      {
        label: 'Change language to Italian',
        icon: 'translate',
        group: 'Language',
        action: () => this.changeLanguage('it')
      },
      {
        label: 'Change language to German',
        icon: 'g_translate',
        group: 'Language',
        action: () => this.changeLanguage('de')
      },
      {
        label: 'Change language to Spanish',
        icon: 'language',
        group: 'Language',
        action: () => this.changeLanguage('es')
      }
    ];
  }
}
