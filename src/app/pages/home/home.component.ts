import {
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ChangeDetectorRef,
  HostListener,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Observable, fromEvent, Subscription } from 'rxjs';
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
import { TranslationService } from '../../services/translation.service';
import { LanguageCode } from '../../models/language-code.type';

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
    ExperiencesComponent,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  currentSectionIndex = 0;
  viewInitialized = false;
  totalSections = 0;
  isAssistantOpen = false;
  isMobileViewport = false;
  private skillsSectionIndex = -1;
  private readonly scrollSnappingClass = 'home-scroll-snapping';
  private scrollSubscription: Subscription | null = null;
  private sectionsChangeSubscription: Subscription | null = null;

  private readonly stackCarouselLabels: Record<'prev' | 'next', Partial<Record<LanguageCode, string>>> = {
    prev: {
      it: 'Stack precedente',
      en: 'Previous stack',
      de: 'Vorheriger Stack',
      es: 'Stack anterior',
      no: 'Forrige stack',
      ru: 'Предыдущий стек'
    },
    next: {
      it: 'Stack successivo',
      en: 'Next stack',
      de: 'Nächster Stack',
      es: 'Stack siguiente',
      no: 'Neste stack',
      ru: 'Следующий стек'
    }
  };

  readonly stackCarouselPreviousLabel$: Observable<string>;
  readonly stackCarouselNextLabel$: Observable<string>;

  @ViewChildren('section') sections!: QueryList<ElementRef>;
  @ViewChild(SkillsComponent) skillsComponent?: SkillsComponent;

  constructor(
    private cdr: ChangeDetectorRef,
    private translationService: TranslationService,
  ) {
    this.stackCarouselPreviousLabel$ = this.translationService.getTranslatedData(this.stackCarouselLabels.prev, 'it');
    this.stackCarouselNextLabel$ = this.translationService.getTranslatedData(this.stackCarouselLabels.next, 'it');
  }

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
      this.resolveSkillsSectionIndex();
      this.updateViewportMode();
      this.initializeScrollTracking();
      this.sectionsChangeSubscription = this.sections?.changes.subscribe(() => {
        this.resolveSkillsSectionIndex();
      }) ?? null;
    });
  }

  ngOnDestroy(): void {
    this.toggleScrollSnapping(false);
    this.destroyScrollTracking();
    if (this.sectionsChangeSubscription) {
      this.sectionsChangeSubscription.unsubscribe();
      this.sectionsChangeSubscription = null;
    }
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

  @HostListener('window:resize')
  onResize(): void {
    this.updateViewportMode();
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

  private resolveSkillsSectionIndex(): void {
    const sectionsArray = this.sections?.toArray() ?? [];
    const nextIndex = sectionsArray.findIndex(section =>
      !!section.nativeElement.querySelector('app-skills')
    );

    if (this.skillsSectionIndex !== nextIndex) {
      this.skillsSectionIndex = nextIndex;
      this.cdr.markForCheck();
    }
  }

  private updateViewportMode(): void {
    if (typeof window === 'undefined') {
      this.isMobileViewport = false;
      return;
    }

    const previous = this.isMobileViewport;
    this.isMobileViewport = window.innerWidth <= 768;

    if (previous !== this.isMobileViewport) {
      this.cdr.markForCheck();
    }
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

  get showStackCarouselControls(): boolean {
    return this.isMobileViewport
      && this.skillsSectionIndex !== -1
      && this.currentSectionIndex === this.skillsSectionIndex
      && !!this.skillsComponent;
  }

  onStackCarouselPrevious(): void {
    this.skillsComponent?.moveToPrevious();
  }

  onStackCarouselNext(): void {
    this.skillsComponent?.moveToNext();
  }
}
