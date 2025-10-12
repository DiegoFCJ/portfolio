import { Component, OnInit, Inject, PLATFORM_ID, DestroyRef } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslationService } from './services/translation.service'; // Servizio per gestire la lingua
import { APP_TITLE_en, APP_TITLE_it, APP_TITLE_de, APP_TITLE_es } from './constants/general.const';
import { filter } from 'rxjs/operators';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LanguageCode } from './models/language-code.type';
import { LANGUAGE_META_CONFIGURATION } from './constants/meta.const';
import { CookieConsentService } from './services/cookie-consent.service';
import { AnalyticsService } from './services/analytics.service';
import { CookieConsentBannerComponent } from './components/cookie-consent-banner/cookie-consent-banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CookieConsentBannerComponent],
  template: `
    <app-cookie-consent-banner></app-cookie-consent-banner>
    <router-outlet />
  `,
})
export class AppComponent implements OnInit {
  private readonly isBrowser: boolean;
  private analyticsEnabled = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private translationService: TranslationService, // Servizio di traduzione
    private readonly titleService: Title,
    private readonly metaService: Meta,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly destroyRef: DestroyRef,
    private readonly cookieConsentService: CookieConsentService,
    private readonly analyticsService: AnalyticsService,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // Cambia il titolo dinamicamente in base alla lingua
    this.translationService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(language => {
        this.updatePageTitle(language);
        this.updateSeoTags(language);
      });

    this.cookieConsentService.consent$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        if (state.status === 'granted' && state.analytics) {
          this.analyticsEnabled = true;
          this.analyticsService.enableAnalytics();
          if (this.isBrowser) {
            this.analyticsService.trackPageView(this.router.url ?? '/');
          }
        } else {
          this.analyticsEnabled = false;
          this.analyticsService.disableAnalytics();
        }
      });

    // Google Analytics configurazione
    if (this.isBrowser) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
      ).subscribe((event: NavigationEnd) => {
        if (this.analyticsEnabled) {
          this.analyticsService.trackPageView(event.urlAfterRedirects);
        }
      });
    }
  }

  private updatePageTitle(language: LanguageCode): void {
    let appTitle = APP_TITLE_it;
    if (language === 'en') appTitle = APP_TITLE_en;
    else if (language === 'de') appTitle = APP_TITLE_de;
    else if (language === 'es') appTitle = APP_TITLE_es;

    this.titleService.setTitle(appTitle);
  }

  private updateSeoTags(language: LanguageCode): void {
    const configuration = LANGUAGE_META_CONFIGURATION[language] ?? LANGUAGE_META_CONFIGURATION['it'];

    this.setDocumentLanguage(configuration.lang, configuration.direction ?? 'ltr');

    const metaDefinitions: MetaDefinition[] = [
      { name: 'description', content: configuration.description },
      { name: 'keywords', content: configuration.keywords },
      { property: 'og:title', content: configuration.title },
      { property: 'og:description', content: configuration.description },
      { property: 'og:locale', content: configuration.ogLocale },
      { property: 'og:type', content: configuration.ogType ?? 'website' },
      { property: 'og:site_name', content: configuration.siteName },
      { property: 'og:url', content: configuration.url },
      { property: 'og:image', content: configuration.image },
      { property: 'og:image:alt', content: configuration.imageAlt },
      { name: 'twitter:card', content: configuration.twitterCard },
      { name: 'twitter:title', content: configuration.title },
      { name: 'twitter:description', content: configuration.description },
      { name: 'twitter:image', content: configuration.image },
    ];

    if (configuration.twitterCreator) {
      metaDefinitions.push({ name: 'twitter:creator', content: configuration.twitterCreator });
    }

    metaDefinitions
      .filter(definition => !!definition.content)
      .forEach(definition =>
        this.metaService.updateTag(definition, this.getMetaSelector(definition))
      );
  }

  private getMetaSelector(definition: MetaDefinition): string {
    return definition.name ? `name='${definition.name}'` : `property='${definition.property}'`;
  }

  private setDocumentLanguage(lang: string, direction: 'ltr' | 'rtl'): void {
    const root = this.document?.documentElement;
    if (!root) {
      return;
    }

    root.setAttribute('lang', lang);
    root.setAttribute('dir', direction);
  }
}