import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SkillsComponent } from '../../components/skills/skills.component';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [CommonModule, SkillsComponent],
  templateUrl: './skills.page.html',
  styleUrls: ['./skills.page.scss'],
})
export class SkillsPage {
  readonly title$: Observable<string>;

  constructor(private readonly translationService: TranslationService) {
    this.title$ = this.translationService.getTranslatedData(
      {
        it: 'Competenze',
        en: 'Skills',
        de: 'Kompetenzen',
        es: 'Competencias',
        no: 'Kompetanser',
        ru: 'Навыки',
      },
      'it',
    );
  }
}
