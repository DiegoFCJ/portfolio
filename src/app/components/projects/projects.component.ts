import { Component, OnInit, HostListener, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { projects as projectsData } from '../../data/projects.data';
import { ProjectFull } from '../../dtos/ProjectDTO';
import { TranslationService } from '../../services/translation.service';
import { Subscription } from 'rxjs';

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
  projects: ProjectFull = projectsData.en;
  isMobile = false;
  currentIndex = 0;
  maxChars = 150;
  isLoading = true;
  private readonly subscriptions = new Subscription();

  constructor(
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkIfMobile();
    }

    this.subscriptions.add(
      this.translationService.currentLanguage$.subscribe(() => {
        this.isLoading = true;
      })
    );

    this.subscriptions.add(
      this.translationService.getTranslatedData<ProjectFull>(projectsData).subscribe((data) => {
        this.projects = data;
        this.isLoading = false;
        this.currentIndex = 0;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
    if (this.isLoading) {
      return '...';
    }
    return project.expanded
      ? project.description
      : project.description.length > this.maxChars
        ? project.description.substring(0, this.maxChars) + '...'
        : project.description;
  }

  moveToNext(): void {
    if (this.isLoading || !this.projects.projects.length) {
      return;
    }
    this.currentIndex = (this.currentIndex + 1) % this.projects.projects.length;
  }

  moveToPrevious(): void {
    if (this.isLoading || !this.projects.projects.length) {
      return;
    }
    this.currentIndex = (this.currentIndex - 1 + this.projects.projects.length) % this.projects.projects.length;
  }
}
