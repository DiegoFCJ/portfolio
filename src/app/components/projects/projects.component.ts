import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { projects } from '../../data/projects.data';
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
export class ProjectsComponent implements OnInit {
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

  constructor(
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkIfMobile();
    }

    this.translationService.currentLanguage$.subscribe(language => {
      this.projects = this.translationService.getTranslatedData<ProjectFull>(projects);
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
    project.expanded = !project.expanded;
  }

  moveToNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.projects.projects.length;
  }

  moveToPrevious(): void {
    this.currentIndex = (this.currentIndex - 1 + this.projects.projects.length) % this.projects.projects.length;
  }
}