import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, ProjectsComponent],
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage {
  readonly title$: Observable<string>;

  constructor(private readonly translationService: TranslationService) {
    this.title$ = this.translationService.getTranslatedData(
      {
        it: 'Progetti',
        en: 'Projects',
        de: 'Projekte',
        es: 'Proyectos',
        no: 'Prosjekter',
        ru: 'Проекты',
      },
      'it',
    );
  }
}
