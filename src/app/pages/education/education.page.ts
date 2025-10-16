import { Component } from '@angular/core';
import { EducationComponent } from '../../components/education/education.component';
import { SectionPageShellComponent } from '../shared/section-page-shell.component';

@Component({
  selector: 'app-education-page',
  standalone: true,
  imports: [SectionPageShellComponent, EducationComponent],
  templateUrl: './education.page.html',
  styleUrls: ['./education.page.scss']
})
export class EducationPageComponent {
  readonly previousRoute = '/skills';
  readonly nextRoute = '/experiences';
}
