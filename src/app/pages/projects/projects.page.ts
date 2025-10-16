import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectsComponent } from '../../components/projects/projects.component';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, ProjectsComponent],
  template: `
    <section class="page-section">
      <app-projects></app-projects>
    </section>
  `,
  styles: [
    `:host { display: block; }`
  ],
})
export class ProjectsPageComponent { }
