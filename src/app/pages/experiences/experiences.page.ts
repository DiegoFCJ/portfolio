import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExperiencesComponent } from '../../components/experiences/experiences.component';

@Component({
  selector: 'app-experiences-page',
  standalone: true,
  imports: [CommonModule, ExperiencesComponent],
  template: `
    <section class="page-section">
      <app-experiences></app-experiences>
    </section>
  `,
  styles: [
    `:host { display: block; }`
  ],
})
export class ExperiencesPageComponent { }
