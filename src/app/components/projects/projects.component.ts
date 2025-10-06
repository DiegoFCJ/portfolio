import { Component, OnInit, HostListener, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { projects as projectsData } from '../../data/projects.data';
import { ProjectFull } from '../../dtos/ProjectDTO';
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
    moreDesc: '',
    lessDesc: '',
    projects: []
  };

  currentLabels = this.resolveLabels('it');
  isMobile = false;
  currentIndex = 0;
  maxChars = 150;
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

    this.currentLabels = this.resolveLabels(this.translationService.getCurrentLanguage());

    this.translationService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe((lang) => {
        this.isLoading = true;
        this.currentLabels = this.resolveLabels(lang);
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

  toggleExpand(project: any): void {
    project.expanded = !project.expanded;
  }

  moveToNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.projects.projects.length;
  }

  moveToPrevious(): void {
    this.currentIndex = (this.currentIndex - 1 + this.projects.projects.length) % this.projects.projects.length;
  }

  private resolveLabels(language: string) {
    const labels = {
      en: {
        imageAlt: 'Project image',
        previous: 'Show previous project',
        next: 'Show next project'
      },
      it: {
        imageAlt: 'Immagine del progetto',
        previous: 'Mostra il progetto precedente',
        next: 'Mostra il progetto successivo'
      }
    };

    if (language in labels) {
      return labels[language as keyof typeof labels];
    }

    return labels.it;
  }
}
