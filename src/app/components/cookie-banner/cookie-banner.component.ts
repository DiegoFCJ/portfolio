import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CookieBannerContent } from '../../dtos/CookieBannerDTO';
import { cookieBannerData } from '../../data/cookie-banner.data';
import { ConsentService, ConsentStatus } from '../../services/consent.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss']
})
export class CookieBannerComponent {
  readonly content$: Observable<CookieBannerContent> = this.translationService
    .getTranslatedData<CookieBannerContent>(cookieBannerData);

  readonly visible$: Observable<boolean> = this.consentService.consentStatus$
    .pipe(map((status: ConsentStatus) => status === 'pending'));

  constructor(
    private readonly consentService: ConsentService,
    private readonly translationService: TranslationService,
  ) {}

  onAccept(): void {
    this.consentService.acceptConsent();
  }

  onDecline(): void {
    this.consentService.declineConsent();
  }
}
