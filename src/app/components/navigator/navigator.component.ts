import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeswitchComponent } from './themeswitch/themeswitch.component';

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
  @Input() totalSections: number = 8;
  @Input() currentSectionIndex: number = 1;
  @Output() navigateNext = new EventEmitter<void>();
  @Output() navigatePrevious = new EventEmitter<void>();

  //TODO add button for translation

  onNext() {
    this.navigateNext.emit();
  }

  onPrevious() {
    this.navigatePrevious.emit();
  }
}