import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { map, Observable } from 'rxjs';

import { TranslationService } from '../../services/translation.service';
import { CookieConsentService } from '../../services/cookie-consent.service';
import { LanguageCode } from '../../models/language-code.type';

interface FooterLabels {
  readonly privacy: string;
  readonly terms: string;
  readonly manageCookies: string;
}

const FOOTER_LABELS: Record<LanguageCode, FooterLabels> = {
  it: {
    privacy: 'Privacy Policy',
    terms: 'Termini e Condizioni',
    manageCookies: 'Gestisci preferenze cookie'
  },
  en: {
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    manageCookies: 'Manage cookie preferences'
  },
  de: {
    privacy: 'Datenschutzerklärung',
    terms: 'Nutzungsbedingungen',
    manageCookies: 'Cookie-Einstellungen verwalten'
  },
  es: {
    privacy: 'Política de Privacidad',
    terms: 'Términos de Uso',
    manageCookies: 'Gestionar preferencias de cookies'
  }
};

interface FooterViewModel {
  readonly labels: FooterLabels;
}

@Component({
  selector: 'app-legal-footer',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf],
  templateUrl: './legal-footer.component.html',
  styleUrl: './legal-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegalFooterComponent {
  readonly viewModel$: Observable<FooterViewModel>;

  constructor(
    private readonly translationService: TranslationService,
    private readonly cookieConsentService: CookieConsentService
  ) {
    this.viewModel$ = this.translationService.currentLanguage$.pipe(
      map((language) => ({
        labels: FOOTER_LABELS[language] ?? FOOTER_LABELS.it
      }))
    );
  }

  onManageCookies(): void {
    this.cookieConsentService.openPreferences();
  }
}
