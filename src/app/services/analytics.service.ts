import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { GOOGLE_ANALYTICS_ID } from '../constants/general.const';

type GtagArgs = [command: string, ...params: any[]];

interface AnalyticsWindow extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: any[]) => void;
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly scriptId = 'google-analytics-gtag';
  private readonly analyticsId = GOOGLE_ANALYTICS_ID;
  private readonly pendingPageViews: string[] = [];

  private isReady = false;
  private isLoading = false;
  private isConfigured = false;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  enableAnalytics(): void {
    if (!this.canRunInBrowser()) {
      return;
    }

    if (this.isReady || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.ensureGlobalObjects();
    this.configureGtag();

    const script = this.document.getElementById(this.scriptId) as HTMLScriptElement | null;
    if (!script) {
      const analyticsScript = this.document.createElement('script');
      analyticsScript.async = true;
      analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${this.analyticsId}`;
      analyticsScript.id = this.scriptId;
      analyticsScript.onload = () => {
        this.isReady = true;
        this.isLoading = false;
        this.flushPendingPageViews();
      };
      analyticsScript.onerror = () => {
        this.isLoading = false;
      };
      this.document.head.appendChild(analyticsScript);
    } else {
      this.isLoading = false;
      this.isReady = true;
    }
  }

  disableAnalytics(): void {
    if (!this.canRunInBrowser()) {
      return;
    }

    const existingScript = this.document.getElementById(this.scriptId);
    existingScript?.remove();

    const win = this.getWindow();
    if (win) {
      delete win.gtag;
      delete win.dataLayer;
    }

    this.isReady = false;
    this.isLoading = false;
    this.isConfigured = false;
    this.pendingPageViews.length = 0;
  }

  trackPageView(path: string): void {
    if (!this.canRunInBrowser()) {
      return;
    }

    if (!path) {
      return;
    }

    if (!this.isReady) {
      if (!this.isLoading) {
        // Ensure the script starts loading so the queued event can be flushed later.
        this.enableAnalytics();
      }
      this.pendingPageViews.push(path);
      return;
    }

    this.pushGtag(['config', this.analyticsId, { page_path: path }]);
  }

  private configureGtag(): void {
    if (this.isConfigured) {
      return;
    }

    this.pushGtag(['js', new Date()]);
    this.pushGtag(['config', this.analyticsId]);
    this.isConfigured = true;
  }

  private flushPendingPageViews(): void {
    if (!this.isReady || !this.pendingPageViews.length) {
      return;
    }

    const pending = [...this.pendingPageViews];
    this.pendingPageViews.length = 0;
    pending.forEach(path => this.pushGtag(['config', this.analyticsId, { page_path: path }]));
  }

  private ensureGlobalObjects(): void {
    const win = this.getWindow();
    if (!win) {
      return;
    }

    if (!Array.isArray(win.dataLayer)) {
      win.dataLayer = [];
    }

    if (!win.gtag) {
      win.gtag = (...args: unknown[]) => {
        win.dataLayer!.push(args);
      };
    }
  }

  private pushGtag(args: GtagArgs): void {
    const win = this.getWindow();
    if (!win?.gtag) {
      return;
    }

    win.gtag(...args);
  }

  private getWindow(): AnalyticsWindow | null {
    return this.document?.defaultView as AnalyticsWindow | null;
  }

  private canRunInBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
