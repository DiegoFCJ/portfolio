import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { EducationComponent } from '../../components/education/education.component';
import { ExperiencesComponent } from '../../components/experiences/experiences.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { ContactMeComponent } from '../../components/contact-me/contact-me.component';
import { NavigatorComponent } from '../../components/navigator/navigator.component';
import { AssistantComponent } from '../../components/assistant/assistant.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    SkillsComponent,
    EducationComponent,
    ExperiencesComponent,
    StatsComponent,
    ContactMeComponent,
    NavigatorComponent,
    AssistantComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly mobileBreakpoint = 960;
  isMobileViewport = false;
  totalSections = 0;
  currentSectionIndex = 0;

  @ViewChildren('homeSection', { read: ElementRef })
  private sectionElements?: QueryList<ElementRef<HTMLElement>>;

  private programmaticScrollTimeout: ReturnType<typeof setTimeout> | number | null = null;
  private isProgrammaticScroll = false;
  private targetSectionIndex: number | null = null;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateViewportState();
  }

  ngAfterViewInit(): void {
    this.observeSections();
  }

  ngOnDestroy(): void {
    if (this.programmaticScrollTimeout) {
      clearTimeout(this.programmaticScrollTimeout);
      this.programmaticScrollTimeout = null;
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateViewportState();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.isProgrammaticScroll) {
      return;
    }

    this.updateCurrentSectionIndex();
  }

  onNavigatorNext(): void {
    if (this.totalSections === 0) {
      return;
    }

    const nextIndex = Math.min(this.currentSectionIndex + 1, this.totalSections - 1);
    this.scrollToSection(nextIndex);
  }

  onNavigatorPrevious(): void {
    if (this.totalSections === 0) {
      return;
    }

    const previousIndex = Math.max(this.currentSectionIndex - 1, 0);
    this.scrollToSection(previousIndex);
  }

  private updateViewportState(): void {
    if (typeof window === 'undefined') {
      this.isMobileViewport = false;
      return;
    }

    this.isMobileViewport = window.innerWidth <= this.mobileBreakpoint;
    this.updateCurrentSectionIndex();
  }

  private observeSections(): void {
    this.updateSectionsMetrics();
    this.sectionElements?.changes.subscribe(() => this.updateSectionsMetrics());
  }

  private updateSectionsMetrics(): void {
    this.totalSections = this.sectionElements?.length ?? 0;
    this.updateCurrentSectionIndex();
    this.cdr.detectChanges();
  }

  private scrollToSection(index: number): void {
    const target = this.getSectionElement(index);
    if (!target) {
      return;
    }

    this.isProgrammaticScroll = true;
    this.targetSectionIndex = index;
    this.currentSectionIndex = index;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (this.programmaticScrollTimeout) {
      clearTimeout(this.programmaticScrollTimeout);
    }

    if (typeof window !== 'undefined') {
      this.programmaticScrollTimeout = window.setTimeout(() => {
        this.isProgrammaticScroll = false;
        this.targetSectionIndex = null;
        this.updateCurrentSectionIndex();
      }, 700);
    } else {
      this.isProgrammaticScroll = false;
      this.targetSectionIndex = null;
    }

    this.cdr.markForCheck();
  }

  private updateCurrentSectionIndex(): void {
    if (!this.sectionElements || typeof window === 'undefined') {
      return;
    }

    const viewportCenter = window.innerHeight / 2;
    let closestIndex = this.targetSectionIndex ?? this.currentSectionIndex;
    let smallestDistance = Number.POSITIVE_INFINITY;

    this.sectionElements.forEach((section, index) => {
      const rect = section.nativeElement.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== this.currentSectionIndex) {
      this.currentSectionIndex = closestIndex;
      this.cdr.markForCheck();
    }
  }

  private getSectionElement(index: number): HTMLElement | null {
    if (!this.sectionElements) {
      return null;
    }

    const sections = this.sectionElements.toArray();
    return sections[index]?.nativeElement ?? null;
  }
}
