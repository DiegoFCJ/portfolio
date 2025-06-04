import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent {
  @Input() totalSections: number = 8;
  @Input() currentSectionIndex: number = 0;
  @Output() navigateNext = new EventEmitter<void>();
  @Output() navigatePrevious = new EventEmitter<void>();

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

  changeLanguage(language: 'en' | 'it'): void {
    this.translationService.setLanguage(language);
    this.currentLang = language;
  }

  changeTheme(theme: string): void {
    this.currentTheme = theme;
    document.body.classList.toggle('dark-mode', theme === 'dark');

    // Future: handle more themes (e.g., 'solarized', 'blue-hue', etc.)
    // You could emit an event or use a ThemeService here.
  }
}