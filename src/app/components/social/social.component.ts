import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Social } from '../../dtos/SocialDTO';
import { socials } from '../../data/socials.data';
import { TranslationService } from '../../services/translation.service';

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
  readonly socials$: Observable<Social[]>;

  constructor(private readonly translationService: TranslationService) {
    this.socials$ = this.translationService.currentLanguage$.pipe(
      switchMap(() => this.translationService.translateContent<Social[]>(socials, 'en'))
    );
  }
}
