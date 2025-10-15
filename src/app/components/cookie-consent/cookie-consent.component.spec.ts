import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieConsentComponent } from './cookie-consent.component';
import { TranslationService } from '../../services/translation.service';
import { of } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';

describe('CookieConsentComponent', () => {
  let fixture: ComponentFixture<CookieConsentComponent>;
  let component: CookieConsentComponent;
  let documentRef: Document;

  const createComponent = (detect = true) => {
    fixture = TestBed.createComponent(CookieConsentComponent);
    component = fixture.componentInstance;
    if (detect) {
      fixture.detectChanges();
    }
  };

  const clearStorage = () => {
    const keys = ['analytics-consent', 'cookie-consent', 'cookie_consent'];
    keys.forEach((key) => {
      window.localStorage.removeItem(key);
      documentRef.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookieConsentComponent],
      providers: [
        {
          provide: TranslationService,
          useValue: {
            getTranslatedData: () =>
              of({
                message: 'message',
                accept: 'accept',
                reject: 'reject',
                privacy: 'privacy',
              }),
          },
        },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    documentRef = TestBed.inject(DOCUMENT);
    clearStorage();
    createComponent();
  });

  afterEach(() => {
    clearStorage();
    if (fixture) {
      fixture.destroy();
    }
  });

  it('should display the banner when no previous choice exists', () => {
    expect(component.isVisible).toBeTrue();
  });

  it('should persist acceptance across storage mechanisms', () => {
    const spy = spyOn(component.consentChange, 'emit');

    component.accept();

    expect(component.isVisible).toBeFalse();
    expect(spy).toHaveBeenCalledOnceWith(true);
    expect(window.localStorage.getItem('analytics-consent')).toBe('granted');
    expect(window.localStorage.getItem('cookie-consent')).toBe('granted');
    expect(window.localStorage.getItem('cookie_consent')).toBe('granted');
    expect(documentRef.cookie).toContain('analytics-consent=granted');
    expect(documentRef.cookie).toContain('cookie-consent=granted');
    expect(documentRef.cookie).toContain('cookie_consent=granted');
  });

  it('should persist rejection and keep the banner hidden when repeated', () => {
    const spy = spyOn(component.consentChange, 'emit');

    component.reject();
    component.reject();

    expect(spy).toHaveBeenCalledOnceWith(false);
    expect(component.isVisible).toBeFalse();
    expect(window.localStorage.getItem('analytics-consent')).toBe('denied');
  });

  it('should emit stored consent on init and keep the banner hidden', () => {
    component.accept();
    fixture.destroy();

    createComponent(false);
    const emitSpy = spyOn(component.consentChange, 'emit');

    fixture.detectChanges();

    expect(component.isVisible).toBeFalse();
    expect(emitSpy).toHaveBeenCalledOnceWith(true);
  });

  it('should emit stored rejection on init and avoid showing the banner', () => {
    component.reject();
    fixture.destroy();

    createComponent(false);
    const emitSpy = spyOn(component.consentChange, 'emit');

    fixture.detectChanges();

    expect(component.isVisible).toBeFalse();
    expect(emitSpy).toHaveBeenCalledOnceWith(false);
  });
});
