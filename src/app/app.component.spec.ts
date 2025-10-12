import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { TranslationService } from './services/translation.service';
import { LanguageCode } from './models/language-code.type';
import { CookieConsentService, AnalyticsConsentStatus } from './services/cookie-consent.service';

class MockCookieConsentService {
  analyticsSubject = new BehaviorSubject<AnalyticsConsentStatus>('unknown');
  bannerSubject = new BehaviorSubject<boolean>(false);

  get analyticsConsentChanges() {
    return this.analyticsSubject.asObservable();
  }

  get bannerVisibilityChanges() {
    return this.bannerSubject.asObservable();
  }

  acceptAnalytics = jasmine.createSpy('acceptAnalytics');
  declineAnalytics = jasmine.createSpy('declineAnalytics');
  revokeConsent = jasmine.createSpy('revokeConsent');
  openPreferences = jasmine.createSpy('openPreferences');
}

describe('AppComponent', () => {
  let mockTranslationService: Partial<TranslationService>;
  let languageSubject: BehaviorSubject<LanguageCode>;
  let mockCookieConsentService: MockCookieConsentService;

  beforeEach(async () => {
    // Creiamo un BehaviorSubject per simulare il currentLanguage$
    languageSubject = new BehaviorSubject<LanguageCode>('it');
    mockTranslationService = {
      currentLanguage$: languageSubject.asObservable(),
      setLanguage: jasmine.createSpy('setLanguage').and.callFake((language: LanguageCode) => {
        languageSubject.next(language);
      }),
    };

    mockCookieConsentService = new MockCookieConsentService();

    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
      providers: [
        { provide: TranslationService, useValue: mockTranslationService },
        { provide: CookieConsentService, useValue: mockCookieConsentService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set the document title to "Portfolio di Diego" for Italian', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(document.title).toEqual('Portfolio di Diego');
  });

  it('should set the document title to "Diego\'s Portfolio" for English', () => {
    languageSubject.next('en');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(document.title).toEqual("Diego's Portfolio");
  });

  it('should set the document title to "Diegos Portfolio" for German', () => {
    languageSubject.next('de');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(document.title).toEqual('Diegos Portfolio');
  });

  it('should set the document title to "Portfolio de Diego" for Spanish', () => {
    languageSubject.next('es');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(document.title).toEqual('Portfolio de Diego');
  });
});