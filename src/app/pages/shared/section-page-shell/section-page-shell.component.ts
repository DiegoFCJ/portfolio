import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AssistantComponent } from '../../../components/assistant/assistant.component';
import { NavigatorComponent } from '../../../components/navigator/navigator.component';

@Component({
  selector: 'app-section-page-shell',
  standalone: true,
  imports: [CommonModule, AssistantComponent, NavigatorComponent],
  templateUrl: './section-page-shell.component.html',
  styleUrls: ['./section-page-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionPageShellComponent {
  @Input() navigatorTotalSections = 1;
  @Input() navigatorCurrentSectionIndex = 0;

  @Output() navigateNext = new EventEmitter<void>();
  @Output() navigatePrevious = new EventEmitter<void>();
  @Output() assistantOpenChange = new EventEmitter<boolean>();

  isAssistantOpen = false;

  onNavigateNext(): void {
    this.navigateNext.emit();
  }

  onNavigatePrevious(): void {
    this.navigatePrevious.emit();
  }

  onAssistantOpened(): void {
    if (!this.isAssistantOpen) {
      this.isAssistantOpen = true;
      this.assistantOpenChange.emit(true);
    }
  }

  onAssistantClosed(): void {
    if (this.isAssistantOpen) {
      this.isAssistantOpen = false;
      this.assistantOpenChange.emit(false);
    }
  }
}
