import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkillsComponent } from '../../components/skills/skills.component';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [CommonModule, SkillsComponent],
  template: `
    <section class="page-section">
      <app-skills></app-skills>
    </section>
  `,
  styles: [
    `:host { display: block; }`
  ],
})
export class SkillsPageComponent { }
