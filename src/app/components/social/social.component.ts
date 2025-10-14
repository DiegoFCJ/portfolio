import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Social } from '../../dtos/SocialDTO';
import { socialsByLanguage } from '../../data/socials.data';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { LanguageCode } from '../../models/language-code.type';

/**
 * Displays a list of social media links with icons.
 */
@Component({
  selector: 'app-social',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent {
  private readonly translationService = inject(TranslationService);

  readonly socials$: Observable<Social[]> = this.translationService.currentLanguage$.pipe(
    map((language) => this.resolveSocials(language))
  );

  private resolveSocials(language: LanguageCode): Social[] {
    return (
      socialsByLanguage[language] ??
      socialsByLanguage.en ??
      socialsByLanguage.it ??
      []
    );
  }
}
