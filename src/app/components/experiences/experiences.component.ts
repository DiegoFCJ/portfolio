import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExperienceFull } from '../../dtos/ExperienceDTO';
import { experiencesData } from '../../data/experiences.data';

/**
 * Component for displaying a list of professional experiences.
 */
@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent {
  // Data containing the list of professional experiences
  experiences: ExperienceFull = experiencesData;
}
