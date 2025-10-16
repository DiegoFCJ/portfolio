import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AssistantComponent } from '../../components/assistant/assistant.component';
import { NavigatorComponent } from '../../components/navigator/navigator.component';

@Component({
  selector: 'app-section-page-shell',
  standalone: true,
  imports: [CommonModule, AssistantComponent, NavigatorComponent],
  templateUrl: './section-page-shell.component.html',
  styleUrls: ['./section-page-shell.component.scss']
})
export class SectionPageShellComponent {
  /** Optional route to reach when navigating to the previous section */
  @Input() previousRoute?: string;

  /** Optional route to reach when navigating to the next section */
  @Input() nextRoute?: string;

  /** Emits when the user triggers the previous navigation and no route is provided */
  @Output() navigatePrevious = new EventEmitter<void>();

  /** Emits when the user triggers the next navigation and no route is provided */
  @Output() navigateNext = new EventEmitter<void>();

  /** Controls whether opening the assistant expands the navigator automatically */
  @Input() autoRevealNavigator = true;

  @ViewChild(NavigatorComponent)
  private navigator?: NavigatorComponent;

  constructor(private readonly router: Router) { }

  get navigatorTotalSections(): number {
    if (this.previousRoute && this.nextRoute) {
      return 3;
    }

    if (this.previousRoute || this.nextRoute) {
      return 2;
    }

    return 1;
  }

  get navigatorCurrentSectionIndex(): number {
    return this.previousRoute ? 1 : 0;
  }

  onNavigatorPrevious(): void {
    if (this.previousRoute) {
      this.router.navigateByUrl(this.previousRoute);
      return;
    }

    this.navigatePrevious.emit();
  }

  onNavigatorNext(): void {
    if (this.nextRoute) {
      this.router.navigateByUrl(this.nextRoute);
      return;
    }

    this.navigateNext.emit();
  }

  onAssistantOpened(): void {
    if (!this.autoRevealNavigator) {
      return;
    }

    this.navigator?.openNavigator();
  }

  onAssistantClosed(): void {
    if (!this.autoRevealNavigator) {
      return;
    }

    this.navigator?.closeNavigator();
  }
}
