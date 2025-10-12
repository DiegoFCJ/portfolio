import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';

import { CookieConsentService } from '../../services/cookie-consent.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageCode } from '../../models/language-code.type';

interface CookieBannerContent {
  readonly message: string;
  readonly privacyLinkLabel: string;
  readonly acceptLabel: string;
  readonly declineLabel: string;
}

const BANNER_TEXT: Record<LanguageCode, CookieBannerContent> = {
  it: {
    message: 'Utilizziamo cookie analitici facoltativi per capire come viene utilizzato il sito e migliorare i contenuti.',
    privacyLinkLabel: 'Leggi la Privacy Policy',
    acceptLabel: 'Accetta',
    declineLabel: 'Rifiuta'
  },
  en: {
    message: 'We use optional analytics cookies to understand how the website is used and to improve its contents.',
    privacyLinkLabel: 'Read the Privacy Policy',
    acceptLabel: 'Accept',
    declineLabel: 'Reject'
  },
  de: {
    message: 'Wir verwenden optionale Analyse-Cookies, um die Nutzung der Website zu verstehen und die Inhalte zu verbessern.',
    privacyLinkLabel: 'Datenschutzerklärung lesen',
    acceptLabel: 'Akzeptieren',
    declineLabel: 'Ablehnen'
  },
  es: {
    message: 'Utilizamos cookies analíticas opcionales para entender cómo se usa el sitio y mejorar su contenido.',
    privacyLinkLabel: 'Leer la Política de Privacidad',
    acceptLabel: 'Aceptar',
    declineLabel: 'Rechazar'
  }
};

interface CookieBannerViewModel {
  readonly visible: boolean;
  readonly content: CookieBannerContent;
}

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [NgIf, RouterLink, AsyncPipe],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CookieBannerComponent {
  readonly viewModel$: Observable<CookieBannerViewModel> = combineLatest([
    this.cookieConsentService.bannerVisibilityChanges,
    this.translationService.currentLanguage$
  ]).pipe(
    map(([visible, language]) => ({
      visible,
      content: BANNER_TEXT[language] ?? BANNER_TEXT.it
    }))
  );

  constructor(
    private readonly cookieConsentService: CookieConsentService,
    private readonly translationService: TranslationService
  ) {}

  onAccept(): void {
    this.cookieConsentService.acceptAnalytics();
  }

  onDecline(): void {
    this.cookieConsentService.declineAnalytics();
  }
}
