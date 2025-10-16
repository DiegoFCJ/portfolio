import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExperiencesComponent } from '../../components/experiences/experiences.component';
import { SectionPageShellComponent } from '../shared/section-page-shell/section-page-shell.component';

@Component({
  selector: 'app-experiences-page',
  standalone: true,
  imports: [CommonModule, SectionPageShellComponent, ExperiencesComponent],
  templateUrl: './experiences-page.component.html',
  styleUrls: ['./experiences-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperiencesPageComponent {}
