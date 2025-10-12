import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly scriptId = 'portfolio-google-analytics';
  private initialized = false;
  private readonly storage?: Storage;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        this.storage = window.localStorage;
      } catch {
        this.storage = undefined;
      }
    }
  }

  /**
   * Initializes Google Analytics when consent and configuration requirements are satisfied.
   */
  init(): void {
    if (!this.canActivate()) {
      return;
    }

    const trackingId = environment.analytics.gaTrackingId;
    this.ensureGlobalLayer();
    this.appendScript(trackingId);

    window.gtag?.('js', new Date());
    window.gtag?.('config', trackingId);

    this.initialized = true;
  }

  /**
   * Tracks a page view using the current configuration.
   */
  trackPageView(path: string): void {
    if (!this.initialized) {
      this.init();
    }

    if (!this.initialized || !this.canActivate()) {
      return;
    }

    window.gtag?.('config', environment.analytics.gaTrackingId, {
      page_path: path,
    });
  }

  private canActivate(): boolean {
    return (
      isPlatformBrowser(this.platformId) &&
      environment.analytics.enabled &&
      Boolean(environment.analytics.gaTrackingId) &&
      this.hasConsent()
    );
  }

  private hasConsent(): boolean {
    if (!environment.analytics.requireConsent) {
      return true;
    }

    if (!this.storage) {
      return false;
    }

    const key = environment.analytics.cookieConsentKey;
    if (!key) {
      return false;
    }

    const value = this.storage.getItem(key);
    return value === 'granted' || value === 'true';
  }

  private ensureGlobalLayer(): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    if (!window.gtag) {
      window.gtag = (...args: unknown[]) => {
        window.dataLayer?.push(args);
      };
    }
  }

  private appendScript(trackingId: string): void {
    if (this.document.getElementById(this.scriptId)) {
      return;
    }

    const head = this.document.head || this.document.getElementsByTagName('head')[0];
    if (!head) {
      return;
    }

    const script = this.document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    script.id = this.scriptId;
    head.appendChild(script);
  }
}
