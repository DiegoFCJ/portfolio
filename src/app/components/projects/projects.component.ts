import { Component, OnInit, HostListener, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { projects as projectsData } from '../../data/projects.data';
import { ProjectFull, Project } from '../../dtos/ProjectDTO';
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
      tags: {} as ProjectFull['statusLegend']['tags']
    },
    projects: []
  };

  isMobile = false;
  currentIndex = 0;
  isLoading = true;
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
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkIfMobile();
    }
  }

  checkIfMobile(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleExpand(project: Project): void {
    project.expanded = !project.expanded;
  }

  moveToNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.projects.projects.length;
  }

  moveToPrevious(): void {
    this.currentIndex = (this.currentIndex - 1 + this.projects.projects.length) % this.projects.projects.length;
  }
}
