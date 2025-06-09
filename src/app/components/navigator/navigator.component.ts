import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent {
  @Input() totalSections: number = 8;
  @Input() currentSectionIndex: number = 0;
  @Output() navigateNext = new EventEmitter<void>();
  @Output() navigatePrevious = new EventEmitter<void>();

  showLanguageOptions = false;
  showThemeOptions = false;

  currentLang: string;
  currentTheme: string = 'light';

  constructor(private translationService: TranslationService) {
    this.currentLang = this.translationService.getCurrentLanguage();
  }

  onNext(): void {
    this.navigateNext.emit();
  }

  onPrevious(): void {
    this.navigatePrevious.emit();
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

  changeTheme(theme: string): void {
    this.currentTheme = theme;
    document.body.classList.toggle('dark-mode', theme === 'dark');

    this.showThemeOptions = false;

    // Future: handle more themes (e.g., 'solarized', 'blue-hue', etc.)
    // You could emit an event or use a ThemeService here.
  }
}