import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrivacyContent, PRIVACY_CONTENT } from '../../data/privacy.data';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent {
  readonly content$: Observable<PrivacyContent>;

  constructor(private readonly translationService: TranslationService) {
    this.content$ = this.translationService
      .getTranslatedData<PrivacyContent>(PRIVACY_CONTENT, 'it')
      .pipe(map((content) => content ?? PRIVACY_CONTENT.it!));
  }
}
