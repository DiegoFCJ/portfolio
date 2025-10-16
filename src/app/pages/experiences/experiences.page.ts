import { Component } from '@angular/core';
import { ExperiencesComponent } from '../../components/experiences/experiences.component';
import { SectionPageShellComponent } from '../shared/section-page-shell.component';

@Component({
  selector: 'app-experiences-page',
  standalone: true,
  imports: [SectionPageShellComponent, ExperiencesComponent],
  templateUrl: './experiences.page.html',
  styleUrls: ['./experiences.page.scss']
})
export class ExperiencesPageComponent {
  readonly previousRoute = '/education';
  readonly nextRoute = '/stats';
}
