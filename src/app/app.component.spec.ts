import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslationService } from './services/translation.service';
import { BehaviorSubject, of } from 'rxjs';
import { LanguageCode } from './models/language-code.type';
import { Meta } from '@angular/platform-browser';
import { CookieConsentService, CookieConsentState } from './services/cookie-consent.service';
import { AnalyticsService } from './services/analytics.service';

describe('AppComponent', () => {
  let mockTranslationService: Partial<TranslationService>;
  let languageSubject: BehaviorSubject<LanguageCode>;
  let metaService: Meta;
  let consentSubject: BehaviorSubject<CookieConsentState>;
  let mockAnalytics: jasmine.SpyObj<AnalyticsService>;

  beforeEach(async () => {
    // Creiamo un BehaviorSubject per simulare il currentLanguage$
    languageSubject = new BehaviorSubject<LanguageCode>('it');
    consentSubject = new BehaviorSubject<CookieConsentState>({ status: 'denied', analytics: false });
    mockTranslationService = {
      currentLanguage$: languageSubject.asObservable(),
      setLanguage: jasmine.createSpy('setLanguage').and.callFake((language: LanguageCode) => {
        languageSubject.next(language);
      }),
      getTranslatedData: jasmine.createSpy('getTranslatedData').and.callFake((data: any) => {
        const fallback = data['it'] ?? data['en'] ?? {};
        return of(fallback);
      }),
    };

    const mockCookieConsentService: Partial<CookieConsentService> = {
      consent$: consentSubject.asObservable(),
      bannerVisible$: of(false),
      acceptAnalytics: jasmine.createSpy('acceptAnalytics'),
      rejectAnalytics: jasmine.createSpy('rejectAnalytics'),
      openPreferences: jasmine.createSpy('openPreferences'),
      revokeConsent: jasmine.createSpy('revokeConsent'),
    };

    mockAnalytics = jasmine.createSpyObj<AnalyticsService>('AnalyticsService', ['enableAnalytics', 'disableAnalytics', 'trackPageView']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: TranslationService, useValue: mockTranslationService },
        { provide: CookieConsentService, useValue: mockCookieConsentService },
        { provide: AnalyticsService, useValue: mockAnalytics },
      ],
    }).compileComponents();

    metaService = TestBed.inject(Meta);
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
    expect(metaService.getTag("name='description'")?.content).toContain('Sviluppatore software junior');
    expect(document.documentElement.getAttribute('lang')).toBe('it');
  });

  it('should set the document title to "Diego\'s Portfolio" for English', () => {
    languageSubject.next('en');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(document.title).toEqual("Diego's Portfolio");
    expect(metaService.getTag("property='og:locale'")?.content).toBe('en_GB');
  });

  it('should set the document title to "Diegos Portfolio" for German', () => {
    languageSubject.next('de');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(document.title).toEqual('Diegos Portfolio');
    expect(metaService.getTag("name='twitter:title'")?.content).toEqual('Diegos Portfolio');
  });

  it('should set the document title to "Portfolio de Diego" for Spanish', () => {
    languageSubject.next('es');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(document.title).toEqual('Portfolio de Diego');
    expect(metaService.getTag("name='twitter:card'")?.content).toBe('summary_large_image');
  });
});