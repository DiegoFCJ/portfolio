import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

import { TranslationService } from '../../services/translation.service';
import { privacyPolicyContent } from '../../data/privacy-policy.data';
import { LegalContentSection, LegalPageContent } from '../../models/legal-content.model';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyPolicyComponent {
  readonly content$: Observable<LegalPageContent>;

  constructor(private readonly translationService: TranslationService) {
    this.content$ = this.translationService.getTranslatedData<LegalPageContent>(privacyPolicyContent, 'it');
  }

  trackBySection(_: number, section: LegalContentSection): string {
    return section.id;
  }

  trackByParagraph(_: number, paragraph: string): string {
    return paragraph;
  }
}
