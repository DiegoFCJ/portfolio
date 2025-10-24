import { Component, OnInit, Inject, PLATFORM_ID, DestroyRef } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslationService } from './services/translation.service'; // Servizio per gestire la lingua
import { filter } from 'rxjs/operators';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LanguageCode } from './models/language-code.type';
import {
  PAGE_LANGUAGE_META_CONFIGURATION,
  type LanguageMetaConfig,
  type PageMetaKey,
} from './constants/meta.const';
import { AnalyticsService } from './services/analytics.service';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CookieConsentComponent, FooterComponent, TopbarComponent],
  template: `
    <app-cookie-consent (consentChange)="onConsentChange($event)"></app-cookie-consent>
    <app-topbar></app-topbar>
    <router-outlet />
    <app-footer></app-footer>
  `,
})
export class AppComponent implements OnInit {
  private currentMetaKey: PageMetaKey = 'home';
  private analyticsConsentGranted = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private translationService: TranslationService, // Servizio di traduzione
    private readonly titleService: Title,
    private readonly metaService: Meta,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly destroyRef: DestroyRef,
    private readonly analyticsService: AnalyticsService,
  ) { }

  ngOnInit() {
    this.currentMetaKey = this.resolveMetaKey(this.router.url);

    // Cambia il titolo dinamicamente in base alla lingua
    this.translationService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(language => {
        this.updatePageTitle(language);
        this.updateSeoTags(language);
      });

    if (isPlatformBrowser(this.platformId)) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects ?? event.url;
        this.currentMetaKey = this.resolveMetaKey(url);
        this.analyticsService.trackPageView(url);
        this.updatePageTitle(this.translationService.getCurrentLanguage());
        this.updateSeoTags(this.translationService.getCurrentLanguage());
      });
    }
  }

  onConsentChange(consentGranted: boolean): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.analyticsService.updateConsent(consentGranted);

    if (consentGranted && !this.analyticsConsentGranted) {
      this.analyticsService.initialize();
    }

    this.analyticsConsentGranted = consentGranted;
  }

  private updatePageTitle(language: LanguageCode): void {
    const configuration = this.getMetaConfiguration(language);
    this.titleService.setTitle(configuration.title);
  }

  private updateSeoTags(language: LanguageCode): void {
    const configuration = this.getMetaConfiguration(language);

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

  private resolveMetaKey(url: string): PageMetaKey {
    const normalized = (url ?? '').split('?')[0].split('#')[0] ?? '';
    const trimmed = normalized.replace(/^\/+/, '').replace(/\/+$/, '');

    if (!trimmed) {
      return 'home';
    }

    switch (trimmed) {
      case 'about':
        return 'about';
      case 'projects':
        return 'projects';
      case 'skills':
        return 'skills';
      case 'education':
        return 'education';
      case 'experiences':
        return 'experiences';
      case 'stats':
        return 'stats';
      case 'contact':
      case 'contacts':
        return 'contact';
      case 'privacy':
        return 'privacy';
      default:
        return 'home';
    }
  }

  private getMetaConfiguration(language: LanguageCode): LanguageMetaConfig {
    const dictionary = PAGE_LANGUAGE_META_CONFIGURATION[this.currentMetaKey]
      ?? PAGE_LANGUAGE_META_CONFIGURATION['home'];

    return dictionary[language] ?? dictionary['it'];
  }
}