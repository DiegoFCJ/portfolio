import { Component, OnInit, HostListener, PLATFORM_ID, Inject, OnDestroy, AfterViewInit, ElementRef, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { projects as projectsData } from '../../data/projects.data';
import { ProjectFull, Project, ProjectStatusLevel, ProjectStatusTag } from '../../dtos/ProjectDTO';
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
    projects: []
  };

  isMobile = false;
  isLoading = true;
  shouldPeek = false;
  @ViewChildren('descriptionContent') private descriptionContents!: QueryList<ElementRef<HTMLDivElement>>;
  private peekStartTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private peekStopTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private scrollComputationTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private scrollComputationPending = false;
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
        if (this.isMobile && this.projects.projects.length > 1) {
          this.triggerPeekAnimation();
        }
        this.scheduleScrollComputation();
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
  }

  ngOnDestroy(): void {
    if (this.peekStartTimeoutId) {
      clearTimeout(this.peekStartTimeoutId);
      this.peekStartTimeoutId = null;
    }
    if (this.peekStopTimeoutId) {
      clearTimeout(this.peekStopTimeoutId);
      this.peekStopTimeoutId = null;
    }
    if (this.scrollComputationTimeoutId) {
      clearTimeout(this.scrollComputationTimeoutId);
      this.scrollComputationTimeoutId = null;
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      const wasMobile = this.isMobile;
      this.checkIfMobile();
      if (!wasMobile && this.isMobile && this.projects.projects.length > 1) {
        this.triggerPeekAnimation();
      }
      this.scheduleScrollComputation();
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
    if (this.peekStartTimeoutId) {
      clearTimeout(this.peekStartTimeoutId);
      this.peekStartTimeoutId = null;
    }

    if (this.peekStopTimeoutId) {
      clearTimeout(this.peekStopTimeoutId);
      this.peekStopTimeoutId = null;
    }

    if (this.shouldPeek) {
      this.shouldPeek = false;
    }
  }

  getStatusLevelLabel(level: ProjectStatusLevel): string {
    return this.projects.statusLegend.levels[level] ?? level;
  }

  getStatusTagLabel(tag: ProjectStatusTag): string {
    return this.projects.statusLegend.tags[tag] ?? tag;
  }

  private triggerPeekAnimation(): void {
    if (!this.isBrowser) {
      return;
    }

    if (this.peekStartTimeoutId) {
      clearTimeout(this.peekStartTimeoutId);
    }
    if (this.peekStopTimeoutId) {
      clearTimeout(this.peekStopTimeoutId);
    }

    this.shouldPeek = false;

    this.peekStartTimeoutId = setTimeout(() => {
      this.shouldPeek = true;

      this.peekStopTimeoutId = setTimeout(() => {
        this.shouldPeek = false;
        this.peekStopTimeoutId = null;
      }, 4200);

      this.peekStartTimeoutId = null;
    }, 250);
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
