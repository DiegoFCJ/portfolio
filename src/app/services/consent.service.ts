import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type ConsentStatus = 'pending' | 'accepted' | 'declined';

@Injectable({
  providedIn: 'root',
})
export class ConsentService {
  private readonly storageKey = 'portfolio-cookie-consent';
  private readonly cookieName = 'portfolio_cookie_consent';
  private readonly consentSubject = new BehaviorSubject<ConsentStatus>('pending');
  private storage?: Storage;

  readonly consentStatus$ = this.consentSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeStorage();
      const storedStatus = this.readPersistedStatus();
      if (storedStatus) {
        this.consentSubject.next(storedStatus);
      }
    }
  }

  acceptConsent(): void {
    this.persistStatus('accepted');
    this.consentSubject.next('accepted');
  }

  declineConsent(): void {
    this.persistStatus('declined');
    this.consentSubject.next('declined');
  }

  revokeConsent(): void {
    this.clearPersistedStatus();
    this.consentSubject.next('pending');
  }

  hasConsented(): boolean {
    return this.consentSubject.value === 'accepted';
  }

  private initializeStorage(): void {
    try {
      this.storage = window.localStorage;
    } catch {
      this.storage = undefined;
    }
  }

  private persistStatus(status: ConsentStatus): void {
    if (this.storage) {
      this.storage.setItem(this.storageKey, status);
    }

    if (this.document) {
      const maxAge = 60 * 60 * 24 * 180; // 180 days
      this.document.cookie = `${this.cookieName}=${status};path=/;max-age=${maxAge};SameSite=Lax`;
    }
  }

  private readPersistedStatus(): ConsentStatus | null {
    const storageStatus = this.storage?.getItem(this.storageKey);
    if (storageStatus === 'accepted' || storageStatus === 'declined') {
      return storageStatus;
    }

    const cookieStatus = this.readCookie();
    if (cookieStatus === 'accepted' || cookieStatus === 'declined') {
      return cookieStatus;
    }

    return null;
  }

  private clearPersistedStatus(): void {
    this.storage?.removeItem(this.storageKey);

    if (this.document) {
      this.document.cookie = `${this.cookieName}=;path=/;max-age=0;SameSite=Lax`;
    }
  }

  private readCookie(): string | null {
    if (!this.document?.cookie) {
      return null;
    }

    const cookies = this.document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === this.cookieName) {
        return value;
      }
    }

    return null;
  }
}
