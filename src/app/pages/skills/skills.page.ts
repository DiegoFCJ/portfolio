import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from '../../components/skills/skills.component';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [CommonModule, SkillsComponent],
  templateUrl: './skills.page.html',
  styleUrls: ['./skills.page.scss']
})
export class SkillsPageComponent { }
