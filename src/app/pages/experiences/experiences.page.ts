import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ExperiencesComponent } from '../../components/experiences/experiences.component';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-experiences-page',
  standalone: true,
  imports: [CommonModule, ExperiencesComponent],
  templateUrl: './experiences.page.html',
  styleUrls: ['./experiences.page.scss'],
})
export class ExperiencesPage {
  readonly title$: Observable<string>;

  constructor(private readonly translationService: TranslationService) {
    this.title$ = this.translationService.getTranslatedData(
      {
        it: 'Esperienze',
        en: 'Experiences',
        de: 'Erfahrungen',
        es: 'Experiencias',
        no: 'Erfaringer',
        ru: 'Опыт',
      },
      'it',
    );
  }
}
