import { AfterViewInit, Component, DestroyRef, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { EducationComponent } from '../../components/education/education.component';
import { ExperiencesComponent } from '../../components/experiences/experiences.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { ContactMeComponent } from '../../components/contact-me/contact-me.component';
import { NavigatorComponent } from '../../components/navigator/navigator.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('homeSection', { read: ElementRef })
  private sectionElements?: QueryList<ElementRef<HTMLElement>>;

  isMobileViewport = false;
  totalSections = 0;
  currentSectionIndex = 0;

  private readonly mobileBreakpoint = 960;
  private readonly isBrowser: boolean;
  private scrollReleaseTimeoutId?: ReturnType<typeof setTimeout>;
  private programmaticScroll = false;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private readonly destroyRef: DestroyRef,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.updateViewportFlag();
  }

  ngAfterViewInit(): void {
    this.sectionElements?.changes
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.updateSectionMetrics();
      });

    this.updateSectionMetrics();
  }

  ngOnDestroy(): void {
    if (this.scrollReleaseTimeoutId) {
      clearTimeout(this.scrollReleaseTimeoutId);
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateViewportFlag();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.isBrowser || !this.isMobileViewport || this.programmaticScroll) {
      return;
    }

    this.updateCurrentSection();
  }

  onNavigateNext(): void {
    if (this.totalSections <= 0) {
      return;
    }

    const nextIndex = Math.min(this.currentSectionIndex + 1, this.totalSections - 1);
    this.scrollToSection(nextIndex);
  }

  onNavigatePrevious(): void {
    if (this.totalSections <= 0) {
      return;
    }

    const previousIndex = Math.max(this.currentSectionIndex - 1, 0);
    this.scrollToSection(previousIndex);
  }

  private updateViewportFlag(): void {
    if (!this.isBrowser) {
      this.isMobileViewport = false;
      return;
    }

    const nextIsMobile = window.innerWidth <= this.mobileBreakpoint;
    const changed = nextIsMobile !== this.isMobileViewport;

    this.isMobileViewport = nextIsMobile;

    if (changed && nextIsMobile) {
      requestAnimationFrame(() => this.updateCurrentSection());
    }
  }

  private updateSectionMetrics(): void {
    this.totalSections = this.sectionElements?.length ?? 0;
    if (!this.isBrowser) {
      return;
    }

    requestAnimationFrame(() => this.updateCurrentSection());
  }

  private updateCurrentSection(): void {
    const sections = this.sectionElements;
    if (!this.isBrowser || !sections || sections.length === 0) {
      return;
    }

    let closestIndex = this.currentSectionIndex;
    let minimumDistance = Number.POSITIVE_INFINITY;

    sections.forEach((sectionRef, index) => {
      const rect = sectionRef.nativeElement.getBoundingClientRect();
      const distance = Math.abs(rect.top);

      if (distance < minimumDistance) {
        minimumDistance = distance;
        closestIndex = index;
      }
    });

    this.currentSectionIndex = closestIndex;
  }

  private scrollToSection(index: number): void {
    const sections = this.sectionElements;
    if (!this.isBrowser || !sections) {
      return;
    }

    const target = sections.get(index)?.nativeElement;
    if (!target) {
      return;
    }

    this.programmaticScroll = true;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.currentSectionIndex = index;

    if (this.scrollReleaseTimeoutId) {
      clearTimeout(this.scrollReleaseTimeoutId);
    }

    this.scrollReleaseTimeoutId = window.setTimeout(() => {
      this.programmaticScroll = false;
      this.updateCurrentSection();
    }, 400);
  }
}
