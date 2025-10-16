import { Component } from '@angular/core';
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
import { ViewportService } from '../../services/viewport.service';
import { Observable } from 'rxjs';

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
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  protected readonly isMobileViewport$: Observable<boolean>;

  constructor(private readonly viewportService: ViewportService) {
    this.isMobileViewport$ = this.viewportService.isMobile$;
  }
}
