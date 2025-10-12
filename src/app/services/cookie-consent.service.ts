import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type CookieConsentStatus = 'unknown' | 'granted' | 'denied';

export interface CookieConsentState {
  status: CookieConsentStatus;
  analytics: boolean;
  updatedAt?: string;
}

interface StoredConsentState {
  analytics: boolean;
  updatedAt: string;
  version: number;
}

const CONSENT_VERSION = 1;
const STORAGE_KEY = 'cookie-consent-state';

@Injectable({
  providedIn: 'root',
})
export class CookieConsentService {
  private readonly consentState$ = new BehaviorSubject<CookieConsentState>({
    status: 'unknown',
    analytics: false,
  });

  private readonly bannerVisibility$ = new BehaviorSubject<boolean>(false);

  private readonly isBrowser: boolean;
  private storage?: Storage;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.initializeStorage();
      this.restoreState();
    }
  }

  /**
   * Emits the latest consent state.
   */
  get consent$() {
    return this.consentState$.asObservable();
  }

  /**
   * Emits whether the banner should currently be shown.
   */
  get bannerVisible$() {
    return this.bannerVisibility$.asObservable();
  }

  /**
   * Grants analytics consent and persists the decision.
   */
  acceptAnalytics(): void {
    this.updateState({ status: 'granted', analytics: true });
  }

  /**
   * Rejects analytics consent and persists the decision.
   */
  rejectAnalytics(): void {
    this.updateState({ status: 'denied', analytics: false });
  }

  /**
   * Opens the consent banner without changing the stored preference.
   */
  openPreferences(): void {
    if (!this.isBrowser) {
      return;
    }

    this.bannerVisibility$.next(true);
  }

  /**
   * Revokes a previously granted consent and reopens the banner.
   */
  revokeConsent(): void {
    if (!this.isBrowser) {
      return;
    }

    this.updateState({ status: 'denied', analytics: false }, { reopen: true });
  }

  private initializeStorage(): void {
    try {
      this.storage = window.localStorage;
    } catch {
      this.storage = undefined;
    }
  }

  private restoreState(): void {
    const stored = this.readStoredState();

    if (stored) {
      this.consentState$.next({
        status: stored.analytics ? 'granted' : 'denied',
        analytics: stored.analytics,
        updatedAt: stored.updatedAt,
      });
      this.bannerVisibility$.next(false);
      return;
    }

    this.bannerVisibility$.next(true);
  }

  private updateState(
    state: CookieConsentState,
    options: { reopen?: boolean } = {},
  ): void {
    this.consentState$.next(state);
    this.persistState(state);

    const shouldShowBanner = state.status === 'unknown' || options.reopen === true;
    this.bannerVisibility$.next(shouldShowBanner);
  }

  private persistState(state: CookieConsentState): void {
    if (!this.isBrowser) {
      return;
    }

    if (state.status === 'unknown') {
      this.removeStoredState();
      return;
    }

    const payload: StoredConsentState = {
      analytics: state.analytics,
      updatedAt: new Date().toISOString(),
      version: CONSENT_VERSION,
    };

    const serialized = JSON.stringify(payload);

    if (this.storage) {
      this.storage.setItem(STORAGE_KEY, serialized);
    } else {
      this.document.cookie = `${STORAGE_KEY}=${encodeURIComponent(serialized)};path=/;max-age=${60 * 60 * 24 * 365}`;
    }
  }

  private readStoredState(): StoredConsentState | null {
    if (!this.isBrowser) {
      return null;
    }

    const raw = this.storage?.getItem(STORAGE_KEY) ?? this.readCookie(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw) as StoredConsentState;
      if (parsed.version === CONSENT_VERSION) {
        return parsed;
      }
    } catch {
      this.removeStoredState();
    }

    return null;
  }

  private removeStoredState(): void {
    if (!this.isBrowser) {
      return;
    }

    if (this.storage) {
      this.storage.removeItem(STORAGE_KEY);
    }

    this.document.cookie = `${STORAGE_KEY}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }

  private readCookie(name: string): string | null {
    const pattern = `(?:^|; )${name}=([^;]*)`;
    const match = this.document?.cookie?.match(new RegExp(pattern));
    return match ? decodeURIComponent(match[1]) : null;
  }
}

