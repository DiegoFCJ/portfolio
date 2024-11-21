import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ThemeswitchComponent } from './themeswitch/themeswitch.component';

/**
 * NavigatorComponent allows for navigation between sections and includes a theme switcher.
 */
@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ThemeswitchComponent
  ],
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent {
  @Input() totalSections: number = 8;  // Total number of sections
  @Input() currentSectionIndex: number = 1;  // Index of the current section
  @Output() navigateNext = new EventEmitter<void>();  // Event emitter for next navigation
  @Output() navigatePrevious = new EventEmitter<void>();  // Event emitter for previous navigation

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
}
