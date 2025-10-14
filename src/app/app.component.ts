import { Component, OnInit, Inject, PLATFORM_ID, DestroyRef } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslationService } from './services/translation.service'; // Servizio per gestire la lingua
import { filter } from 'rxjs/operators';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LanguageCode } from './models/language-code.type';
import { LANGUAGE_META_CONFIGURATION, LanguageMetaConfig } from './constants/meta.const';
import { AnalyticsService } from './services/analytics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent implements OnInit {
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
    // Cambia il titolo dinamicamente in base alla lingua
    this.translationService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(language => {
        this.updatePageTitle(language);
        this.updateSeoTags(language);
      });

    if (isPlatformBrowser(this.platformId)) {
      this.analyticsService.initialize();

      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
      ).subscribe((event: NavigationEnd) => {
        this.analyticsService.trackPageView(event.urlAfterRedirects);
      });
    }
  }

  private updatePageTitle(language: LanguageCode): void {
    const configuration = this.resolveMetaConfiguration(language);
    this.titleService.setTitle(configuration.title);
  }

  private updateSeoTags(language: LanguageCode): void {
    const configuration = this.resolveMetaConfiguration(language);

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

  private resolveMetaConfiguration(language: LanguageCode): LanguageMetaConfig {
    const directMatch = LANGUAGE_META_CONFIGURATION[language];
    if (directMatch) {
      return directMatch;
    }

    const fallbackOrder: LanguageCode[] = ['it', 'en'];
    for (const fallback of fallbackOrder) {
      const configuration = LANGUAGE_META_CONFIGURATION[fallback];
      if (configuration) {
        return configuration;
      }
    }

    const firstAvailable = Object.values(LANGUAGE_META_CONFIGURATION).find(
      (config): config is LanguageMetaConfig => Boolean(config)
    );

    if (!firstAvailable) {
      throw new Error('Missing language meta configuration');
    }

    return firstAvailable;
  }
}
