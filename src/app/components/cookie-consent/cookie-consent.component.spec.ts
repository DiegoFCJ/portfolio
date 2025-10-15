import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { CookieConsentComponent } from './cookie-consent.component';
import { TranslationService } from '../../services/translation.service';
import { MockTranslationService } from '../../testing/mock-translation.service';

const CONSENT_KEYS = ['analytics-consent', 'cookie-consent', 'cookie_consent'];

const clearStorage = (documentRef: Document): void => {
  CONSENT_KEYS.forEach(key => {
    try {
      window.localStorage?.removeItem(key);
    } catch {
      // Ignore
    }

    documentRef.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });
};

const getCookieValue = (documentRef: Document, key: string): string | undefined => {
  const cookies = documentRef.cookie?.split(';') ?? [];
  for (const entry of cookies) {
    const [name, value] = entry.trim().split('=');
    if (name === key) {
      return value;
    }
  }
  return undefined;
};


describe('CookieConsentComponent', () => {
  let documentRef: Document;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookieConsentComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    }).compileComponents();

    documentRef = TestBed.inject(DOCUMENT);
    clearStorage(documentRef);
  });

  afterEach(() => {
    clearStorage(documentRef);
  });

  const createComponent = (): ComponentFixture<CookieConsentComponent> => {
    const fixture = TestBed.createComponent(CookieConsentComponent);
    return fixture;
  };

  it('should display the banner when no consent is stored', () => {
    const fixture = createComponent();
    fixture.detectChanges();

    const banner = fixture.nativeElement.querySelector('[data-testid="cookie-consent-banner"]');
    expect(fixture.componentInstance.isVisible).toBeTrue();
    expect(banner).not.toBeNull();
  });

  it('should persist acceptance and emit the event', () => {
    const fixture = createComponent();
    fixture.detectChanges();

    const component = fixture.componentInstance;
    const events: boolean[] = [];
    component.consentChange.subscribe(value => events.push(value));

    component.accept();

    expect(component.isVisible).toBeFalse();
    expect(events).toEqual([true]);

    CONSENT_KEYS.forEach(key => {
      expect(window.localStorage?.getItem(key)).toBe('granted');
      expect(getCookieValue(documentRef, key)).toBe('granted');
    });
  });

  it('should persist rejection and emit the event', () => {
    const fixture = createComponent();
    fixture.detectChanges();

    const component = fixture.componentInstance;
    const events: boolean[] = [];
    component.consentChange.subscribe(value => events.push(value));

    component.reject();

    expect(component.isVisible).toBeFalse();
    expect(events).toEqual([false]);

    CONSENT_KEYS.forEach(key => {
      expect(window.localStorage?.getItem(key)).toBe('denied');
      expect(getCookieValue(documentRef, key)).toBe('denied');
    });
  });

  it('should restore a previous acceptance on init and emit consent once', fakeAsync(() => {
    const fixture = createComponent();
    fixture.detectChanges();
    fixture.componentInstance.accept();
    fixture.destroy();

    const secondFixture = createComponent();
    const events: boolean[] = [];
    secondFixture.componentInstance.consentChange.subscribe(value => events.push(value));
    secondFixture.detectChanges();

    flushMicrotasks();

    expect(secondFixture.componentInstance.isVisible).toBeFalse();
    expect(events).toEqual([true]);
  }));

  it('should keep the banner hidden after a stored rejection', () => {
    const fixture = createComponent();
    fixture.detectChanges();
    fixture.componentInstance.reject();
    fixture.destroy();

    const secondFixture = createComponent();
    const events: boolean[] = [];
    secondFixture.componentInstance.consentChange.subscribe(value => events.push(value));
    secondFixture.detectChanges();

    expect(secondFixture.componentInstance.isVisible).toBeFalse();
    expect(events).toEqual([]);
  });
});
