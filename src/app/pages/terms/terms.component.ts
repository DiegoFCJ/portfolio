import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { TranslationService } from '../../services/translation.service';
import { termsContent } from '../../data/terms.data';
import { LegalContentSection, LegalPageContent } from '../../models/legal-content.model';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsComponent {
  readonly content$ = this.translationService.getTranslatedData<LegalPageContent>(termsContent, 'it');

  constructor(private readonly translationService: TranslationService) {}

  trackBySection(_: number, section: LegalContentSection): string {
    return section.id;
  }

  trackByParagraph(_: number, paragraph: string): string {
    return paragraph;
  }
}
