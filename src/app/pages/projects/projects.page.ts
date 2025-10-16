import { Component } from '@angular/core';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { SectionPageShellComponent } from '../shared/section-page-shell.component';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [SectionPageShellComponent, ProjectsComponent],
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss']
})
export class ProjectsPageComponent {
  readonly previousRoute = '/about';
  readonly nextRoute = '/skills';
}
