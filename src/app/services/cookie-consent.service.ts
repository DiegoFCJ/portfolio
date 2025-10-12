import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type AnalyticsConsentStatus = 'unknown' | 'granted' | 'denied';

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  private readonly storageKey = 'portfolio-analytics-consent';
  private readonly cookieName = 'portfolio_analytics_consent';
  private readonly analyticsConsent$ = new BehaviorSubject<AnalyticsConsentStatus>('unknown');
  private readonly bannerVisible$ = new BehaviorSubject<boolean>(false);
  private storage?: Storage;
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.initStorage();
      const stored = this.getStoredConsent();
      if (stored) {
        this.analyticsConsent$.next(stored);
        this.bannerVisible$.next(false);
      } else {
        this.bannerVisible$.next(true);
      }
    }
  }

  get analyticsConsentChanges() {
    return this.analyticsConsent$.asObservable();
  }

  get bannerVisibilityChanges() {
    return this.bannerVisible$.asObservable();
  }

  acceptAnalytics(): void {
    this.setConsent('granted');
  }

  declineAnalytics(): void {
    this.setConsent('denied');
  }

  revokeConsent(): void {
    if (!this.isBrowser) {
      return;
    }
    this.clearStoredConsent();
    this.analyticsConsent$.next('unknown');
    this.bannerVisible$.next(true);
  }

  openPreferences(): void {
    if (!this.isBrowser) {
      return;
    }
    this.bannerVisible$.next(true);
  }

  private setConsent(status: Exclude<AnalyticsConsentStatus, 'unknown'>): void {
    if (!this.isBrowser) {
      return;
    }

    this.persistConsent(status);
    this.analyticsConsent$.next(status);
    this.bannerVisible$.next(false);
  }

  private initStorage(): void {
    try {
      this.storage = window.localStorage;
    } catch {
      this.storage = undefined;
    }
  }

  private getStoredConsent(): AnalyticsConsentStatus | undefined {
    if (!this.isBrowser) {
      return undefined;
    }

    const fromStorage = this.storage?.getItem(this.storageKey);
    if (fromStorage === 'granted' || fromStorage === 'denied') {
      return fromStorage;
    }

    const fromCookie = this.readCookie();
    if (fromCookie === 'granted' || fromCookie === 'denied') {
      return fromCookie;
    }

    return undefined;
  }

  private persistConsent(value: 'granted' | 'denied'): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      this.storage?.setItem(this.storageKey, value);
    } catch {
      // Ignore storage errors
    }

    const maxAge = 365 * 24 * 60 * 60; // one year
    document.cookie = `${this.cookieName}=${value};path=/;max-age=${maxAge}`;
  }

  private clearStoredConsent(): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      this.storage?.removeItem(this.storageKey);
    } catch {
      // Ignore
    }

    document.cookie = `${this.cookieName}=;path=/;max-age=0`;
  }

  private readCookie(): string | undefined {
    if (!this.isBrowser) {
      return undefined;
    }

    const cookies = document.cookie?.split(';') ?? [];
    for (const raw of cookies) {
      const [name, ...rest] = raw.trim().split('=');
      if (name === this.cookieName) {
        return rest.join('=');
      }
    }

    return undefined;
  }
}
