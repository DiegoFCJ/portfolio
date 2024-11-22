import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  projects!: ProjectFull;
  isMobile = false;
  currentIndex = 0;
  maxChars = 150;

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.checkIfMobile();
    this.translationService.currentLanguage$.subscribe(language => {
      this.projects = this.translationService.getTranslatedData<ProjectFull>(projects);
    });
  }

  /**
   * Toggle the expanded state of a project description.
   * @param project The project whose description state will be toggled.
   */
  toggleExpand(project: any): void {
    project.expanded = !project.expanded;
  }

  /**
   * Truncates or returns the full description of a project.
   * @param project The project whose description is to be truncated.
   * @returns The truncated or full description based on the expansion state.
   */
  getTruncatedDescription(project: any): string {
    return project.expanded
      ? project.description
      : project.description.length > this.maxChars
        ? project.description.substring(0, this.maxChars) + '...'
        : project.description;
  }

  /**
   * Handles window resizing events to adjust mobile view state.
   * @param event The resize event.
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkIfMobile();
  }

  /**
   * Checks if the current window size is considered mobile (<= 768px).
   */
  checkIfMobile(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  /**
   * Moves to the next project in the carousel.
   */
  moveToNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.projects.projects.length;
  }

  /**
   * Moves to the previous project in the carousel.
   */
  moveToPrevious(): void {
    this.currentIndex = (this.currentIndex - 1 + this.projects.projects.length) % this.projects.projects.length;
  }
}
