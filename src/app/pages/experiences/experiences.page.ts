import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperiencesComponent } from '../../components/experiences/experiences.component';

@Component({
  selector: 'app-experiences-page',
  standalone: true,
  imports: [CommonModule, ExperiencesComponent],
  templateUrl: './experiences.page.html',
  styleUrls: ['./experiences.page.scss']
})
export class ExperiencesPageComponent { }
