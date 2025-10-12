import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TermsContent } from '../../dtos/TermsDTO';
import { termsData } from '../../data/terms.data';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent {
  readonly terms$: Observable<TermsContent> = this.translationService
    .getTranslatedData<TermsContent>(termsData);

  constructor(private readonly translationService: TranslationService) {}
}
