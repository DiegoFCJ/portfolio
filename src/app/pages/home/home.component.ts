import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { EducationComponent } from '../../components/education/education.component';
import { ExperiencesComponent } from '../../components/experiences/experiences.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { ContactMeComponent } from '../../components/contact-me/contact-me.component';
import { NavigatorComponent } from '../../components/navigator/navigator.component';
import { AssistantComponent } from '../../components/assistant/assistant.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    SkillsComponent,
    EducationComponent,
    ExperiencesComponent,
    StatsComponent,
    ContactMeComponent,
    NavigatorComponent,
    AssistantComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly mobileBreakpoint = 960;
  isMobileViewport = false;

  ngOnInit(): void {
    this.updateViewportState();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateViewportState();
  }

  private updateViewportState(): void {
    if (typeof window === 'undefined') {
      this.isMobileViewport = false;
      return;
    }

    this.isMobileViewport = window.innerWidth <= this.mobileBreakpoint;
  }
}
