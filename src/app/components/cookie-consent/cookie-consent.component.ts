import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslationService } from '../../services/translation.service';
import { COOKIE_CONSENT_CONTENT, CookieConsentContent } from '../../data/cookie-consent.data';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent implements OnInit {
  @Output() consentChange = new EventEmitter<boolean>();

  content: CookieConsentContent = {
    message: '',
    acceptLabel: '',
    rejectLabel: '',
    privacyLinkLabel: '',
  };

  isVisible = false;

  private readonly consentKeys = ['analytics-consent', 'cookie-consent', 'cookie_consent'];
  private readonly affirmativeValues = ['true', 'yes', 'granted', 'accepted', 'allow', 'allowed'];
  private readonly negativeValues = ['false', 'no', 'denied', 'rejected', 'declined'];

  constructor(
    private readonly translationService: TranslationService,
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly destroyRef: DestroyRef,
  ) { }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.translationService.getTranslatedData(COOKIE_CONSENT_CONTENT, 'it')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(content => {
        this.content = content ?? this.content;
      });

    const storedConsent = this.restoreConsent();
    if (storedConsent === null) {
      this.isVisible = true;
      return;
    }

    this.isVisible = false;
    if (storedConsent) {
      // Emit asynchronously to allow parent components to react (e.g., initialise analytics)
      Promise.resolve().then(() => this.consentChange.emit(true));
    }
  }

  accept(): void {
    this.persistConsent(true);
    this.hideAndEmit(true);
  }

  reject(): void {
    this.persistConsent(false);
    this.hideAndEmit(false);
  }

  private hideAndEmit(consent: boolean): void {
    this.isVisible = false;
    this.consentChange.emit(consent);
  }

  private persistConsent(consent: boolean): void {
    const value = consent ? 'granted' : 'denied';
    const maxAge = 60 * 60 * 24 * 365; // 1 year
    const win = this.documentRef.defaultView;

    for (const key of this.consentKeys) {
      try {
        win?.localStorage?.setItem(key, value);
      } catch {
        // Access to storage might be denied. Ignore to avoid breaking the flow.
      }

      this.documentRef.cookie = `${key}=${value};path=/;max-age=${maxAge}`;
    }
  }

  private restoreConsent(): boolean | null {
    const win = this.documentRef.defaultView;
    if (!win) {
      return null;
    }

    try {
      for (const key of this.consentKeys) {
        const storedValue = win.localStorage?.getItem(key);
        if (storedValue) {
          const parsed = this.normalise(storedValue);
          if (this.affirmativeValues.includes(parsed)) {
            return true;
          }
          if (this.negativeValues.includes(parsed)) {
            return false;
          }
        }
      }
    } catch {
      // Ignore storage errors and fallback to cookies.
    }

    const cookies = this.documentRef.cookie?.split(';') ?? [];
    for (const entry of cookies) {
      const [name, rawValue] = entry.trim().split('=');
      if (!name || !rawValue || !this.consentKeys.includes(name)) {
        continue;
      }

      const value = this.normalise(rawValue);
      if (this.affirmativeValues.includes(value)) {
        return true;
      }
      if (this.negativeValues.includes(value)) {
        return false;
      }
    }

    return null;
  }

  private normalise(value: string): string {
    return value?.trim().toLowerCase() ?? '';
  }
}
