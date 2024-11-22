import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MAT_MENU_DEFAULT_OPTIONS, MatMenuModule } from '@angular/material/menu';  // Aggiungere MatMenuModule
import { ThemeswitchComponent } from './themeswitch/themeswitch.component';
import { TranslationService } from '../../services/translation.service';

/**
 * NavigatorComponent allows for navigation between sections and includes a theme switcher.
 */
@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    ThemeswitchComponent
  ],
  providers: [
    {
      provide: MAT_MENU_DEFAULT_OPTIONS,
      useValue: { panelClass: 'custom-menu-panel' }
    }
  ],
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent {
  @Input() totalSections: number = 8;  // Total number of sections
  @Input() currentSectionIndex: number = 1;  // Index of the current section
  @Output() navigateNext = new EventEmitter<void>();  // Event emitter for next navigation
  @Output() navigatePrevious = new EventEmitter<void>();  // Event emitter for previous navigation

  constructor(private translationService: TranslationService) { }

  /**
   * Emits the navigateNext event to move to the next section.
   */
  onNext(): void {
    this.navigateNext.emit();
  }

  /**
   * Emits the navigatePrevious event to move to the previous section.
   */
  onPrevious(): void {
    this.navigatePrevious.emit();
  }

  /**
   * Changes the current language by passing either 'en' or 'it' to the TranslationService.
   * @param language The language to set, either 'en' or 'it'.
   */
  changeLanguage(language: 'en' | 'it'): void {
    this.translationService.setLanguage(language);
  }
}