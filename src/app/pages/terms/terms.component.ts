import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TERMS_CONTENT } from '../../data/legal.data';
import { LegalDocumentContent, LegalDocumentSection } from '../../models/legal-document.model';
import { TranslationService } from '../../services/translation.service';
import { LanguageCode } from '../../models/language-code.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsComponent {
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
    return TERMS_CONTENT[language] ?? TERMS_CONTENT.it!;
  }
}
