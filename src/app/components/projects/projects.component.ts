import { Component, OnInit, HostListener, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
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
export class ProjectsComponent implements OnInit, OnDestroy {
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
  private peekStartTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private peekStopTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
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
            expanded: project.expanded ?? false
          }))
        };
        this.isLoading = false;
        if (this.isMobile && this.projects.projects.length > 1) {
          this.triggerPeekAnimation();
        }
      });
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
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      const wasMobile = this.isMobile;
      this.checkIfMobile();
      if (!wasMobile && this.isMobile && this.projects.projects.length > 1) {
        this.triggerPeekAnimation();
      }
    }
  }

  checkIfMobile(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleExpand(project: Project): void {
    project.expanded = !project.expanded;
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
    if (!isPlatformBrowser(this.platformId)) {
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
}
