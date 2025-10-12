import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { TranslationService } from './services/translation.service';
import { APP_TITLE_en, APP_TITLE_it, APP_TITLE_de, APP_TITLE_es } from './constants/general.const';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { LegalFooterComponent } from './components/legal-footer/legal-footer.component';
import { CookieConsentService, AnalyticsConsentStatus } from './services/cookie-consent.service';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CookieBannerComponent, LegalFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly analyticsTrackingId = 'G-5ZF8RBY109';
  private readonly analyticsScriptId = 'ga4-consent-script';
  private readonly isBrowser: boolean;

  private languageSubscription?: Subscription;
  private consentSubscription?: Subscription;
  private navigationSubscription?: Subscription;
  private analyticsInitialized = false;
  private analyticsEnabled = false;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private readonly router: Router,
    private readonly translationService: TranslationService,
    private readonly cookieConsentService: CookieConsentService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.languageSubscription = this.translationService.currentLanguage$.subscribe((language) => {
      if (!this.isBrowser) {
        return;
      }

      let appTitle = APP_TITLE_it;
      if (language === 'en') appTitle = APP_TITLE_en;
      else if (language === 'de') appTitle = APP_TITLE_de;
      else if (language === 'es') appTitle = APP_TITLE_es;
      document.title = appTitle;
    });

    if (this.isBrowser) {
      this.consentSubscription = this.cookieConsentService.analyticsConsentChanges.subscribe((status) =>
        this.handleConsentChange(status)
      );

      this.navigationSubscription = this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe((event) => {
          if (this.analyticsEnabled) {
            this.trackPage(event.urlAfterRedirects);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.languageSubscription?.unsubscribe();
    this.consentSubscription?.unsubscribe();
    this.navigationSubscription?.unsubscribe();
  }

  private handleConsentChange(status: AnalyticsConsentStatus): void {
    if (!this.isBrowser) {
      return;
    }

    if (status === 'granted') {
      this.enableAnalytics();
    } else {
      this.disableAnalytics();
    }
  }

  private enableAnalytics(): void {
    if (!this.isBrowser) {
      return;
    }

    if (!this.analyticsInitialized) {
      this.initializeAnalyticsGlobals();
      this.appendAnalyticsScript();
      this.analyticsInitialized = true;
    }

    this.analyticsEnabled = true;
    this.trackPage(this.router.url);
  }

  private disableAnalytics(): void {
    if (!this.isBrowser) {
      return;
    }

    this.analyticsEnabled = false;

    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }

    const script = document.getElementById(this.analyticsScriptId);
    if (script) {
      script.remove();
    }

    if (window.dataLayer) {
      window.dataLayer.length = 0;
    }

    window.gtag = undefined;
    this.analyticsInitialized = false;
  }

  private initializeAnalyticsGlobals(): void {
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };

    window.gtag('js', new Date());
    window.gtag('consent', 'update', {
      analytics_storage: 'granted'
    });
  }

  private appendAnalyticsScript(): void {
    if (document.getElementById(this.analyticsScriptId)) {
      return;
    }

    const script = document.createElement('script');
    script.id = this.analyticsScriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.analyticsTrackingId}`;
    document.head.appendChild(script);
  }

  private trackPage(path: string): void {
    if (!this.analyticsEnabled || typeof window.gtag !== 'function') {
      return;
    }

    window.gtag('config', this.analyticsTrackingId, {
      page_path: path,
      anonymize_ip: true
    });
  }
}