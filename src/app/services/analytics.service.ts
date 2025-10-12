import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

const MEASUREMENT_ID = 'G-5ZF8RBY109';
const SCRIPT_ID = 'ga-consent-managed';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly isBrowser: boolean;
  private scriptInjected = false;
  private bootstrapCompleted = false;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      (window as any)[`ga-disable-${MEASUREMENT_ID}`] = true;
    }
  }

  enableAnalytics(): void {
    if (!this.isBrowser) {
      return;
    }

    (window as any)[`ga-disable-${MEASUREMENT_ID}`] = false;

    this.ensureScriptInjected();
    this.ensureBootstrap();

    const gtag = (window as any).gtag as ((...args: unknown[]) => void) | undefined;
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
      gtag('config', MEASUREMENT_ID);
    }
  }

  disableAnalytics(): void {
    if (!this.isBrowser) {
      return;
    }

    (window as any)[`ga-disable-${MEASUREMENT_ID}`] = true;

    const gtag = (window as any).gtag as ((...args: unknown[]) => void) | undefined;
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: 'denied' });
    }
  }

  trackPageView(path: string): void {
    if (!this.isBrowser) {
      return;
    }

    if ((window as any)[`ga-disable-${MEASUREMENT_ID}`]) {
      return;
    }

    const gtag = (window as any).gtag as ((...args: unknown[]) => void) | undefined;
    if (typeof gtag === 'function') {
      gtag('config', MEASUREMENT_ID, { page_path: path });
    }
  }

  private ensureScriptInjected(): void {
    if (this.scriptInjected || !this.isBrowser) {
      return;
    }

    const existing = this.document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      this.scriptInjected = true;
      return;
    }

    const script = this.document.createElement('script');
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    this.document.head?.appendChild(script);
    this.scriptInjected = true;
  }

  private ensureBootstrap(): void {
    if (this.bootstrapCompleted || !this.isBrowser) {
      return;
    }

    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.gtag = w.gtag || function gtag(...args: unknown[]) {
      w.dataLayer.push(args);
    };
    w.gtag('js', new Date());
    this.bootstrapCompleted = true;
  }
}

