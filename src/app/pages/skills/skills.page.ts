import { Component } from '@angular/core';
import { SkillsComponent } from '../../components/skills/skills.component';
import { SectionPageShellComponent } from '../shared/section-page-shell.component';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [SectionPageShellComponent, SkillsComponent],
  templateUrl: './skills.page.html',
  styleUrls: ['./skills.page.scss']
})
export class SkillsPageComponent {
  readonly previousRoute = '/projects';
  readonly nextRoute = '/education';
}
