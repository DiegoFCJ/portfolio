import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationService } from '../../services/translation.service';
import { cookieConsentContent } from '../../data/cookie-consent.data';

interface CookieConsentViewModel {
  message: string;
  accept: string;
  reject: string;
  privacy: string;
}

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
})
export class CookieConsentComponent implements OnInit {
  @Output() readonly consentChange = new EventEmitter<boolean>();

  readonly content$: Observable<CookieConsentViewModel> = this.translationService.getTranslatedData(
    cookieConsentContent,
  );

  isVisible = false;

  private readonly consentKeys = ['analytics-consent', 'cookie-consent', 'cookie_consent'];
  private currentChoice: boolean | null = null;

  constructor(
    private readonly translationService: TranslationService,
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.currentChoice = this.getStoredConsent();

    if (this.currentChoice !== null) {
      this.consentChange.emit(this.currentChoice);
      return;
    }

    this.isVisible = true;
  }

  accept(): void {
    this.setConsent(true);
  }

  reject(): void {
    this.setConsent(false);
  }

  private setConsent(value: boolean): void {
    if (!isPlatformBrowser(this.platformId) || this.currentChoice === value) {
      return;
    }

    this.currentChoice = value;
    this.isVisible = false;
    this.persistConsent(value);
    this.consentChange.emit(value);
  }

  private persistConsent(value: boolean): void {
    const win = this.documentRef.defaultView;
    const storageValue = value ? 'granted' : 'denied';

    try {
      const storage = win?.localStorage;
      this.consentKeys.forEach((key) => storage?.setItem(key, storageValue));
    } catch {
      // Ignore storage errors.
    }

    const maxAge = 60 * 60 * 24 * 365; // One year
    this.consentKeys.forEach((key) => {
      this.documentRef.cookie = `${key}=${storageValue};path=/;max-age=${maxAge}`;
    });
  }

  private getStoredConsent(): boolean | null {
    const win = this.documentRef.defaultView;

    try {
      const storage = win?.localStorage;
      for (const key of this.consentKeys) {
        const value = storage?.getItem(key);
        if (value) {
          return this.normaliseConsent(value);
        }
      }
    } catch {
      // Ignore storage errors and fallback to cookies.
    }

    const cookies = this.documentRef.cookie?.split(';') ?? [];
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (this.consentKeys.includes(name) && value) {
        return this.normaliseConsent(value);
      }
    }

    return null;
  }

  private normaliseConsent(value: string): boolean {
    const normalised = value.trim().toLowerCase();
    const affirmative = ['true', 'yes', 'granted', 'accepted', 'allow', 'allowed'];
    if (affirmative.includes(normalised)) {
      return true;
    }
    return false;
  }
}
