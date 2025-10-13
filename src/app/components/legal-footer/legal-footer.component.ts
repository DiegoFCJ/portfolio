import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { LanguageCode } from '../../models/language-code.type';
import { CookieConsentService } from '../../services/cookie-consent.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface LegalFooterCopy {
  notice: string;
  privacy: string;
  terms: string;
  manageCookies: string;
}

@Component({
  selector: 'app-legal-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './legal-footer.component.html',
  styleUrls: ['./legal-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalFooterComponent {
  copy: LegalFooterCopy;

  private readonly copyMap: Record<LanguageCode, LegalFooterCopy> = {
    it: {
      notice: '© 2024 Diego Gualtierotti. Tutti i diritti riservati.',
      privacy: 'Privacy Policy',
      terms: 'Termini d’uso',
      manageCookies: 'Gestisci cookie',
    },
    en: {
      notice: '© 2024 Diego Gualtierotti. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      manageCookies: 'Manage cookies',
    },
    de: {
      notice: '© 2024 Diego Gualtierotti. Alle Rechte vorbehalten.',
      privacy: 'Datenschutzerklärung',
      terms: 'Nutzungsbedingungen',
      manageCookies: 'Cookies verwalten',
    },
    es: {
      notice: '© 2024 Diego Gualtierotti. Todos los derechos reservados.',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Uso',
      manageCookies: 'Gestionar cookies',
    },
  };

  constructor(
    private readonly translationService: TranslationService,
    private readonly cookieConsentService: CookieConsentService,
    private readonly destroyRef: DestroyRef,
  ) {
    this.copy = this.copyMap.it;
    this.translationService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((language) => {
        this.copy = this.copyMap[language] ?? this.copyMap.it;
      });
  }

  openPreferences(): void {
    this.cookieConsentService.openPreferences();
  }
}
