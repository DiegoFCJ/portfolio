import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { AboutComponent } from '../../components/about/about.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { NavigatorComponent } from '../../components/navigator/navigator.component';
import { EducationComponent } from '../../components/education/education.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { ContactMeComponent } from '../../components/contact-me/contact-me.component';
import { ExperiencesComponent } from '../../components/experiences/experiences.component';

/**
 * Component that serves as the main container for the home page of the application.
 * It includes navigation between different sections and dynamic scrolling functionality.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProjectsComponent,
    AboutComponent,
    HeroComponent,
    SkillsComponent,
    NavigatorComponent,
    EducationComponent,
    StatsComponent,
    ContactMeComponent,
    ExperiencesComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentSectionIndex = 0;

  /**
   * List of section elements in the home page.
   * Dynamically queried using the `#section` template reference variable.
   */
  @ViewChildren('section') sections!: QueryList<ElementRef>;

  /**
   * Constructor for injecting dependencies.
   * @param cdr The ChangeDetectorRef instance for handling view updates.
   */
  constructor(private cdr: ChangeDetectorRef) { }

  /**
   * Navigates to the next section, if available.
   * Updates the `currentSectionIndex` and scrolls to the target section.
   */
  navigateNext() {
    if (this.sections && this.currentSectionIndex < this.sections.length - 1) {
      this.currentSectionIndex++;
      this.scrollToSection(this.currentSectionIndex);
    }
  }

  /**
   * Navigates to the previous section, if available.
   * Updates the `currentSectionIndex` and scrolls to the target section.
   */
  navigatePrevious() {
    if (this.sections && this.currentSectionIndex > 0) {
      this.currentSectionIndex--;
      this.scrollToSection(this.currentSectionIndex);
    }
  }

  /**
   * Smoothly scrolls the viewport to the specified section.
   * @param index Index of the target section in the `sections` list.
   */
  scrollToSection(index: number) {
    const section = this.sections.toArray()[index].nativeElement;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}