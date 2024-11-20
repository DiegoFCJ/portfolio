import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExperienceFull } from '../../dtos/ExperienceDTO';
import { experiencesData } from '../../data/experiences.data';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss'
})
export class ExperiencesComponent {
  experiences: ExperienceFull = experiencesData;
}
