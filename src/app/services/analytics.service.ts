import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { EnvironmentConfig } from '../../environments/environment';
import { APP_ENVIRONMENT } from '../tokens/environment.token';

interface AnalyticsWindow extends Window {
  dataLayer: unknown[];
  gtag?: (...args: unknown[]) => void;
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly consentKeys = ['analytics-consent', 'cookie-consent', 'cookie_consent'];
  private isBootstrapped = false;

  constructor(
    @Inject(APP_ENVIRONMENT) private readonly environment: EnvironmentConfig,
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
  ) { }

  initialize(): void {
    if (!this.shouldBootstrapAnalytics()) {
      return;
    }

    const trackingId = this.environment.gaTrackingId;
    const win = this.documentRef.defaultView as AnalyticsWindow | null;
    if (!win) {
      return;
    }

    (win as Record<string, unknown>)[`ga-disable-${trackingId}`] = false;
    this.appendAnalyticsScript(trackingId);

    win.dataLayer = win.dataLayer || [];
    win.gtag = win.gtag || function gtag() {
      // eslint-disable-next-line prefer-rest-params
      (win.dataLayer as unknown[]).push(arguments);
    };

    win.gtag('js', new Date());
    win.gtag('config', trackingId);

    this.isBootstrapped = true;
  }

  destroy(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const trackingId = this.environment.gaTrackingId;
    const win = this.documentRef.defaultView as AnalyticsWindow | null;
    const disableKey = `ga-disable-${trackingId}`;

    if (win) {
      (win as Record<string, unknown>)[disableKey] = true;

      try {
        delete (win as Record<string, unknown>).gtag;
      } catch {
        (win as Record<string, unknown>).gtag = undefined;
      }

      if (Array.isArray(win.dataLayer)) {
        win.dataLayer.length = 0;
      }
    }

    const head = this.documentRef.head;
    if (head && trackingId) {
      const existing = head.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${trackingId}"]`);
      if (existing) {
        head.removeChild(existing);
      }
    }

    this.isBootstrapped = false;
  }

  trackPageView(url: string): void {
    if (!this.isBootstrapped) {
      return;
    }

    const win = this.documentRef.defaultView as AnalyticsWindow | null;
    if (!win?.gtag) {
      return;
    }

    win.gtag('config', this.environment.gaTrackingId, { page_path: url });
  }

  private shouldBootstrapAnalytics(): boolean {
    return (
      isPlatformBrowser(this.platformId) &&
      !!this.environment.enableAnalytics &&
      !!this.environment.gaTrackingId &&
      this.hasConsent() &&
      !this.isBootstrapped
    );
  }

  private hasConsent(): boolean {
    const win = this.documentRef.defaultView;
    if (!win) {
      return false;
    }

    try {
      for (const key of this.consentKeys) {
        const storedValue = win.localStorage?.getItem(key);
        if (storedValue && this.isAffirmative(storedValue)) {
          return true;
        }
      }
    } catch {
      // Access to storage might be blocked; ignore and fallback to cookies.
    }

    const cookies = this.documentRef.cookie?.split(';') ?? [];
    return cookies.some(cookie => {
      const [name, value] = cookie.trim().split('=');
      return this.consentKeys.includes(name) && value && this.isAffirmative(value);
    });
  }

  private isAffirmative(value: string): boolean {
    const normalised = value.trim().toLowerCase();
    return ['true', 'yes', 'granted', 'accepted', 'allow', 'allowed'].includes(normalised);
  }

  private appendAnalyticsScript(trackingId: string): void {
    const head = this.documentRef.head;
    if (!head || head.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${trackingId}"]`)) {
      return;
    }

    const script = this.documentRef.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    head.appendChild(script);
  }
}
