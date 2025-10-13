import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { CookieConsentService } from '../../services/cookie-consent.service';
import { TranslationService } from '../../services/translation.service';
import { LanguageCode } from '../../models/language-code.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface CookieBannerCopy {
  title: string;
  message: string;
  reviewMessage: string;
  linkLabel: string;
  accept: string;
  decline: string;
}

@Component({
  selector: 'app-cookie-consent-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cookie-consent-banner.component.html',
  styleUrls: ['./cookie-consent-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsentBannerComponent {
  readonly visible$: Observable<boolean>;
  readonly reviewMode$: Observable<boolean>;

  copy: CookieBannerCopy;

  private readonly copyMap: Record<LanguageCode, CookieBannerCopy> = {
    it: {
      title: 'Preferenze cookie',
      message:
        'Utilizziamo cookie tecnici e, previo consenso, Google Analytics per misurare in forma aggregata l’utilizzo del sito. Puoi scegliere se abilitare gli strumenti statistici.',
      reviewMessage:
        'Hai già espresso una preferenza. Aggiorna la tua scelta o chiudi il banner per mantenerla invariata.',
      linkLabel: 'Leggi l’informativa completa sui cookie',
      accept: 'Accetta tutti',
      decline: 'Continua senza accettare',
    },
    en: {
      title: 'Cookie preferences',
      message:
        'We use strictly necessary cookies and, with your consent, Google Analytics to collect aggregated usage statistics. Decide whether to enable analytics tools.',
      reviewMessage:
        'A previous choice is already saved. Update your preference or close the banner to keep it unchanged.',
      linkLabel: 'Read the full cookie notice',
      accept: 'Accept all',
      decline: 'Continue without analytics',
    },
    de: {
      title: 'Cookie-Einstellungen',
      message:
        'Wir verwenden unbedingt erforderliche Cookies und – mit deiner Einwilligung – Google Analytics, um aggregierte Nutzungsstatistiken zu erheben. Entscheide, ob Analyse-Tools aktiviert werden sollen.',
      reviewMessage:
        'Eine frühere Auswahl ist bereits gespeichert. Aktualisiere deine Präferenz oder schließe den Banner, um sie beizubehalten.',
      linkLabel: 'Zur vollständigen Cookie-Information',
      accept: 'Alle akzeptieren',
      decline: 'Ohne Analyse fortfahren',
    },
    es: {
      title: 'Preferencias de cookies',
      message:
        'Utilizamos cookies estrictamente necesarias y, con tu consentimiento, Google Analytics para obtener estadísticas agregadas. Decide si quieres habilitar las herramientas analíticas.',
      reviewMessage:
        'Ya existe una preferencia guardada. Actualízala o cierra el banner para mantenerla sin cambios.',
      linkLabel: 'Lee el aviso completo sobre cookies',
      accept: 'Aceptar todo',
      decline: 'Continuar sin analíticas',
    },
  };

  constructor(
    private readonly cookieConsentService: CookieConsentService,
    private readonly translationService: TranslationService,
    private readonly destroyRef: DestroyRef,
  ) {
    this.visible$ = this.cookieConsentService.bannerVisible$;
    this.reviewMode$ = combineLatest([
      this.visible$,
      this.cookieConsentService.consentStatus$,
    ]).pipe(map(([visible, status]) => visible && status === 'accepted'));

    this.copy = this.copyMap.it;
    this.translationService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((language) => {
        this.copy = this.copyMap[language] ?? this.copyMap.it;
      });
  }

  accept(): void {
    this.cookieConsentService.acceptAnalytics();
  }

  decline(): void {
    this.cookieConsentService.declineAnalytics();
  }
}
