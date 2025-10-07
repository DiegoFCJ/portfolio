import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ChangeDetectorRef,
  HostListener,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent, Subscription } from 'rxjs';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { AboutComponent } from '../../components/about/about.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { NavigatorComponent } from '../../components/navigator/navigator.component';
import { EducationComponent } from '../../components/education/education.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { ContactMeComponent } from '../../components/contact-me/contact-me.component';
import { ExperiencesComponent } from '../../components/experiences/experiences.component';
import { AssistantComponent } from '../../components/assistant/assistant.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProjectsComponent,
    AboutComponent,
    HeroComponent,
    SkillsComponent,
    NavigatorComponent,
    AssistantComponent,
    EducationComponent,
    StatsComponent,
    ContactMeComponent,
    ExperiencesComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  currentSectionIndex = 0;
  viewInitialized = false;
  totalSections = 0;
  isAssistantOpen = false;
  private readonly scrollSnappingClass = 'home-scroll-snapping';
  private scrollSubscription: Subscription | null = null;

  @ViewChildren('section') sections!: QueryList<ElementRef>;

  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      this.navigateNext();
    } else if (event.key === 'ArrowUp') {
      this.navigatePrevious();
    }
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.cdr.detectChanges();
    this.toggleScrollSnapping(true);

    setTimeout(() => {
      this.initializeScrollTracking();
    });
  }

  ngOnDestroy(): void {
    this.toggleScrollSnapping(false);
    this.destroyScrollTracking();
  }

  navigateNext(): void {
    if (this.viewInitialized) {
      const nextIndex = Math.min(this.currentSectionIndex + 1, this.totalSections - 1);

      if (nextIndex !== this.currentSectionIndex) {
        this.currentSectionIndex = nextIndex;
        this.scrollToSection(nextIndex);
      }
    }
  }

  navigatePrevious(): void {
    if (this.viewInitialized) {
      const previousIndex = Math.max(this.currentSectionIndex - 1, 0);

      if (previousIndex !== this.currentSectionIndex) {
        this.currentSectionIndex = previousIndex;
        this.scrollToSection(previousIndex);
      }
    }
  }

  scrollToSection(index: number): void {
    const sections = this.sections?.toArray() ?? [];
    const section = sections[index];

    if (!section) {
      return;
    }

    section.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private initializeScrollTracking(): void {
    this.destroyScrollTracking();
    this.updateCurrentSectionFromViewport();

    this.scrollSubscription = fromEvent(window, 'scroll', { passive: true }).subscribe(() => {
      this.updateCurrentSectionFromViewport();
    });
  }

  private destroyScrollTracking(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
      this.scrollSubscription = null;
    }
  }

  private toggleScrollSnapping(activate: boolean): void {
    if (typeof document === 'undefined') {
      return;
    }

    document.body.classList.toggle(this.scrollSnappingClass, activate);
  }

  private updateCurrentSectionFromViewport(): void {
    const sectionsArray = this.sections?.toArray() ?? [];
    this.totalSections = sectionsArray.length;

    if (sectionsArray.length === 0) {
      this.currentSectionIndex = 0;
      return;
    }

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    const viewportCenter = viewportHeight / 2;

    const sectionRects = sectionsArray.map(section => section.nativeElement.getBoundingClientRect());

    let candidateIndex = sectionRects.findIndex(rect => {
      return rect.top <= viewportCenter && rect.bottom >= viewportCenter;
    });

    if (candidateIndex === -1) {
      const firstVisibleIndex = sectionRects.findIndex(rect => rect.top >= 0);

      if (firstVisibleIndex !== -1) {
        candidateIndex = firstVisibleIndex;
      } else {
        candidateIndex = sectionRects.length - 1;
      }
    }

    if (candidateIndex !== this.currentSectionIndex) {
      this.currentSectionIndex = candidateIndex;
      this.cdr.markForCheck();
    }
  }

  onAssistantOpened(): void {
    this.isAssistantOpen = true;
  }

  onAssistantClosed(): void {
    this.isAssistantOpen = false;
  }
}