import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output, PLATFORM_ID, ViewChild } from '@angular/core';
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
export class SectionPageShellComponent implements OnInit {
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

  /** Controls whether the floating navigator should be displayed */
  isMobileViewport = false;

  @ViewChild(NavigatorComponent)
  private navigator?: NavigatorComponent;

  private readonly mobileBreakpoint = 960;
  private readonly isBrowser: boolean;

  constructor(
    private readonly router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.updateViewportFlag();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateViewportFlag();
  }

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

  private updateViewportFlag(): void {
    if (!this.isBrowser) {
      this.isMobileViewport = false;
      return;
    }

    this.isMobileViewport = window.innerWidth <= this.mobileBreakpoint;
  }
}
