import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRIVACY_POLICY_CONTENT } from '../../data/legal.data';
import { LegalDocumentContent, LegalDocumentSection } from '../../models/legal-document.model';
import { TranslationService } from '../../services/translation.service';
import { LanguageCode } from '../../models/language-code.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyComponent {
  content: LegalDocumentContent = this.resolveContent('it');

  constructor(
    private readonly translationService: TranslationService,
    private readonly destroyRef: DestroyRef,
  ) {
    this.translationService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((language) => {
        this.content = this.resolveContent(language);
      });
  }

  trackBySection(_index: number, section: LegalDocumentSection): string {
    return section.id;
  }

  private resolveContent(language: LanguageCode): LegalDocumentContent {
    return PRIVACY_POLICY_CONTENT[language] ?? PRIVACY_POLICY_CONTENT.it!;
  }
}
