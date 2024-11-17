import { Component } from '@angular/core';
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
    ExperiencesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  sections = [
    'hero',
    'about',
    'projects',
    'skills',
    'education',
    'experiences',
    'stats',
    'contact',
  ];

  currentSectionIndex = 0;

  navigateNext(): void {
    if (this.currentSectionIndex < this.sections.length - 1) {
      this.currentSectionIndex++;
    }
  }

  navigatePrevious(): void {
    if (this.currentSectionIndex > 0) {
      this.currentSectionIndex--;
    }
  }
}