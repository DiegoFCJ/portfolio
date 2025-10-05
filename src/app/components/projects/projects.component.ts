import { Component, OnDestroy, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { projects } from '../../data/projects.data';
import { ProjectFull } from '../../dtos/ProjectDTO';
import { TranslationService } from '../../services/translation.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

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
    title: "",
    button: "",
    moreDesc: "",
    lessDesc: "",
    projects: [{
      title: "",
      description: "",
      technologies: [],
      status: "",
      image: "",
      link: "",
      expanded: false
    }]
  };

  isMobile = false;
  currentIndex = 0;
  maxChars = 150;
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor(
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkIfMobile();
    }

    this.translationService.currentLanguage$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.isLoading = true),
        switchMap(() => this.translationService.getTranslatedData<ProjectFull>(projects))
      )
      .subscribe(translated => {
        this.projects = translated;
        this.isLoading = false;
      });
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
    if (this.isLoading) {
      return;
    }
    project.expanded = !project.expanded;
  }

  getTruncatedDescription(project: any): string {
    return project.expanded
      ? project.description
      : project.description.length > this.maxChars
        ? project.description.substring(0, this.maxChars) + '...'
        : project.description;
  }

  moveToNext(): void {
    if (this.isLoading) {
      return;
    }
    this.currentIndex = (this.currentIndex + 1) % this.projects.projects.length;
  }

  moveToPrevious(): void {
    if (this.isLoading) {
      return;
    }
    this.currentIndex = (this.currentIndex - 1 + this.projects.projects.length) % this.projects.projects.length;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}