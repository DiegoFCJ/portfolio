import { Component, OnInit, HostListener, PLATFORM_ID, Inject, OnDestroy, AfterViewInit, ElementRef, QueryList, ViewChildren, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { projects as projectsData } from '../../data/projects.data';
import { ProjectFull, Project, ProjectLinkDetail, ProjectStatusLevel, ProjectStatusTag } from '../../dtos/ProjectDTO';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: [
    './projects.component.scss',
    './projects.carousel.component.scss'
  ]
})
export class ProjectsComponent implements OnInit, OnDestroy, AfterViewInit {
  projects: ProjectFull = {
    title: '',
    button: '',
    toggle: { expand: '', collapse: '' },
    navigation: { previous: '', next: '' },
    statusLegend: {
      prefix: '',
      levels: {
        active: '',
        publicBeta: '',
        inDevelopment: ''
      },
      tags: {
        openSource: '',
        release2024: ''
      }
    },
    linksLegend: {
      code: {
        label: '',
        privateLabel: '',
        comingSoonLabel: '',
        unavailableLabel: ''
      },
      preview: {
        label: '',
        comingSoonLabel: '',
        unavailableLabel: ''
      }
    },
    projects: []
  };

  isMobile = false;
  isLoading = true;
  shouldPeek = false;
  @ViewChildren('descriptionContent') private descriptionContents!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('projectsSection')
  set projectsSectionRef(ref: ElementRef<HTMLElement> | undefined) {
    this.projectsSection = ref ?? null;
    this.setupPeekObserver();
  }
  private peekStartTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private peekStopTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private scrollComputationTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private scrollComputationPending = false;
  private projectsSection: ElementRef<HTMLElement> | null = null;
  private peekObserver: IntersectionObserver | null = null;
  private lastPeekTimestamp = 0;
  private readonly peekAnimationDuration = 2000;
  private readonly isBrowser: boolean;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.checkIfMobile();
    }

    this.translationService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isLoading = true;
      });

    this.translationService.getTranslatedData<ProjectFull>(projectsData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.projects = {
          ...data,
          projects: data.projects.map(project => ({
            ...project,
            isScrollable: false,
            isAtEnd: true
          }))
        };
        this.isLoading = false;
        this.scheduleScrollComputation();
        this.setupPeekObserver();
      });
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.descriptionContents.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.scheduleScrollComputation());

    this.scheduleScrollComputation();
    this.setupPeekObserver();
  }

  ngOnDestroy(): void {
    this.clearPeekTimers();
    if (this.scrollComputationTimeoutId) {
      clearTimeout(this.scrollComputationTimeoutId);
      this.scrollComputationTimeoutId = null;
    }
    if (this.peekObserver) {
      this.peekObserver.disconnect();
      this.peekObserver = null;
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.checkIfMobile();
      this.scheduleScrollComputation();
      this.setupPeekObserver();
    }
  }

  checkIfMobile(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  onDescriptionScroll(project: Project, event: Event): void {
    if (!this.isBrowser) {
      return;
    }

    const target = event.target as HTMLElement;
    const atEnd = target.scrollTop + target.clientHeight >= target.scrollHeight - 1;
    project.isAtEnd = atEnd;
  }

  handleCarouselInteraction(): void {
    this.clearPeekTimers();

    if (this.shouldPeek) {
      this.shouldPeek = false;
    }

    this.lastPeekTimestamp = Date.now();
  }

  getStatusLevelLabel(level: ProjectStatusLevel): string {
    const label = this.projects.statusLegend.levels[level];
    return label?.trim() ? label : level;
  }

  getStatusTagLabel(tag: ProjectStatusTag): string {
    const label = this.projects.statusLegend.tags[tag];
    return label?.trim() ? label : tag;
  }

  private triggerPeekAnimation(): void {
    if (!this.isBrowser || !this.isMobile || (this.projects.projects?.length ?? 0) <= 1) {
      return;
    }

    const now = Date.now();
    if (this.shouldPeek || now - this.lastPeekTimestamp < this.peekAnimationDuration) {
      return;
    }

    this.clearPeekTimers();
    this.shouldPeek = false;

    this.peekStartTimeoutId = setTimeout(() => {
      this.shouldPeek = true;
      this.lastPeekTimestamp = Date.now();

      this.peekStopTimeoutId = setTimeout(() => {
        this.shouldPeek = false;
        this.peekStopTimeoutId = null;
      }, this.peekAnimationDuration);

      this.peekStartTimeoutId = null;
    }, 120);
  }

  private clearPeekTimers(): void {
    if (this.peekStartTimeoutId) {
      clearTimeout(this.peekStartTimeoutId);
      this.peekStartTimeoutId = null;
    }

    if (this.peekStopTimeoutId) {
      clearTimeout(this.peekStopTimeoutId);
      this.peekStopTimeoutId = null;
    }
  }

  isLinkAvailable(link?: ProjectLinkDetail | null): boolean {
    return !!link?.url;
  }

  isLinkPrivate(link?: ProjectLinkDetail | null): boolean {
    return !!link?.isPrivate;
  }

  isLinkComingSoon(link?: ProjectLinkDetail | null): boolean {
    return !!link?.isComingSoon;
  }

  isLinkUnavailable(link?: ProjectLinkDetail | null): boolean {
    if (!link) {
      return true;
    }
    return !link.url && !link.isPrivate && !link.isComingSoon;
  }

  private setupPeekObserver(): void {
    if (!this.isBrowser) {
      return;
    }

    if (this.peekObserver) {
      this.peekObserver.disconnect();
      this.peekObserver = null;
    }

    const sectionRef = this.projectsSection;
    const hasMultipleProjects = (this.projects.projects?.length ?? 0) > 1;

    if (!sectionRef || !this.isMobile || !hasMultipleProjects) {
      this.clearPeekTimers();
      if (this.shouldPeek) {
        this.shouldPeek = false;
      }
      return;
    }

    this.peekObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerPeekAnimation();
        }
      });
    }, { threshold: 0.4 });

    this.peekObserver.observe(sectionRef.nativeElement);
  }

  private scheduleScrollComputation(): void {
    if (!this.isBrowser) {
      return;
    }

    if (this.scrollComputationPending && this.scrollComputationTimeoutId) {
      return;
    }

    this.scrollComputationPending = true;
    this.scrollComputationTimeoutId = setTimeout(() => {
      this.scrollComputationPending = false;
      this.scrollComputationTimeoutId = null;
      this.computeScrollableStates();
    });
  }

  private computeScrollableStates(): void {
    if (!this.isBrowser || !this.descriptionContents) {
      return;
    }

    const projects = this.projects.projects ?? [];
    this.descriptionContents.forEach((ref, index) => {
      const element = ref.nativeElement;
      const project = projects[index];

      if (!project) {
        return;
      }

      const scrollable = element.scrollHeight - element.clientHeight > 2;
      const atEnd = !scrollable || element.scrollTop + element.clientHeight >= element.scrollHeight - 1;

      if (project.isScrollable !== scrollable || project.isAtEnd !== atEnd) {
        project.isScrollable = scrollable;
        project.isAtEnd = atEnd;
      }
    });

    this.cdr.markForCheck();
  }
}
