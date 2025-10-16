import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EducationComponent } from '../../components/education/education.component';
import { SectionPageShellComponent } from '../shared/section-page-shell/section-page-shell.component';

@Component({
  selector: 'app-education-page',
  standalone: true,
  imports: [CommonModule, SectionPageShellComponent, EducationComponent],
  templateUrl: './education-page.component.html',
  styleUrls: ['./education-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationPageComponent {}
