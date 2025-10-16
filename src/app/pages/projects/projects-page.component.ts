import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { SectionPageShellComponent } from '../shared/section-page-shell/section-page-shell.component';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, SectionPageShellComponent, ProjectsComponent],
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent {}
