import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export type ConsentStatus = 'unknown' | 'accepted' | 'declined';

type StoredConsentValue = 'granted' | 'denied';

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private readonly storageKeys = ['analytics-consent', 'cookie-consent', 'cookie_consent'];
  private readonly isBrowser: boolean;
  private readonly consentStatusSubject: BehaviorSubject<ConsentStatus>;
  private readonly bannerVisibleSubject = new BehaviorSubject<boolean>(false);

  readonly consentStatus$: Observable<ConsentStatus>;
  readonly bannerVisible$: Observable<boolean> = this.bannerVisibleSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    @Inject(DOCUMENT) private readonly documentRef: Document,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const initialStatus = this.resolveInitialStatus();
    this.consentStatusSubject = new BehaviorSubject<ConsentStatus>(initialStatus);
    this.consentStatus$ = this.consentStatusSubject.asObservable();
    this.bannerVisibleSubject.next(initialStatus === 'unknown');
  }

  acceptAnalytics(): void {
    this.persistConsent('granted');
    this.bannerVisibleSubject.next(false);
    this.consentStatusSubject.next('accepted');
  }

  declineAnalytics(): void {
    this.persistConsent('denied');
    this.bannerVisibleSubject.next(false);
    this.consentStatusSubject.next('declined');
  }

  openPreferences(): void {
    if (!this.isBrowser) {
      return;
    }

    this.bannerVisibleSubject.next(true);
  }

  hideBanner(): void {
    if (!this.bannerVisibleSubject.value) {
      return;
    }

    this.bannerVisibleSubject.next(false);
  }

  private resolveInitialStatus(): ConsentStatus {
    const stored = this.readStoredConsent();

    if (!stored) {
      return 'unknown';
    }

    return this.isAffirmative(stored) ? 'accepted' : 'declined';
  }

  private readStoredConsent(): string | undefined {
    if (!this.isBrowser) {
      return undefined;
    }

    const win = this.documentRef.defaultView;
    if (!win) {
      return undefined;
    }

    for (const key of this.storageKeys) {
      try {
        const value = win.localStorage?.getItem(key);
        if (value) {
          return value;
        }
      } catch {
        // Access to localStorage might be blocked.
      }
    }

    const cookies = this.documentRef.cookie?.split(';') ?? [];
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (this.storageKeys.includes(name) && value) {
        return decodeURIComponent(value);
      }
    }

    return undefined;
  }

  private isAffirmative(value: string): boolean {
    const normalised = value.trim().toLowerCase();
    return ['true', 'yes', 'granted', 'accepted', 'allow', 'allowed'].includes(normalised);
  }

  private persistConsent(value: StoredConsentValue): void {
    if (!this.isBrowser) {
      return;
    }

    const win = this.documentRef.defaultView;
    const maxAge = 60 * 60 * 24 * 365; // 1 year

    for (const key of this.storageKeys) {
      try {
        win?.localStorage?.setItem(key, value);
      } catch {
        // Ignore storage quota or privacy errors.
      }

      this.documentRef.cookie = `${key}=${encodeURIComponent(value)};path=/;max-age=${maxAge};SameSite=Lax`;
    }
  }
}
