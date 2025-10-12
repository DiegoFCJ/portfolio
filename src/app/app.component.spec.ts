import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslationService } from './services/translation.service';
import { BehaviorSubject } from 'rxjs';
import { LanguageCode } from './models/language-code.type';
import { Meta } from '@angular/platform-browser';
import { AnalyticsService } from './services/analytics.service';
import { CookieConsentService, ConsentStatus } from './services/cookie-consent.service';

describe('AppComponent', () => {
  let mockTranslationService: Partial<TranslationService>;
  let languageSubject: BehaviorSubject<LanguageCode>;
  let metaService: Meta;
  let analyticsService: jasmine.SpyObj<AnalyticsService>;
  let consentStatusSubject: BehaviorSubject<ConsentStatus>;
  let bannerVisibleSubject: BehaviorSubject<boolean>;
  let cookieConsentService: Partial<CookieConsentService>;

  beforeEach(async () => {
    // Creiamo un BehaviorSubject per simulare il currentLanguage$
    languageSubject = new BehaviorSubject<LanguageCode>('it');
    mockTranslationService = {
      currentLanguage$: languageSubject.asObservable(),
      setLanguage: jasmine.createSpy('setLanguage').and.callFake((language: LanguageCode) => {
        languageSubject.next(language);
      }),
    };

    analyticsService = jasmine.createSpyObj<AnalyticsService>('AnalyticsService', ['initialize', 'trackPageView', 'destroy']);

    consentStatusSubject = new BehaviorSubject<ConsentStatus>('accepted');
    bannerVisibleSubject = new BehaviorSubject<boolean>(false);
    cookieConsentService = {
      consentStatus$: consentStatusSubject.asObservable(),
      bannerVisible$: bannerVisibleSubject.asObservable(),
      acceptAnalytics: jasmine.createSpy('acceptAnalytics'),
      declineAnalytics: jasmine.createSpy('declineAnalytics'),
      openPreferences: jasmine.createSpy('openPreferences'),
      hideBanner: jasmine.createSpy('hideBanner'),
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: TranslationService, useValue: mockTranslationService },
        { provide: AnalyticsService, useValue: analyticsService },
        { provide: CookieConsentService, useValue: cookieConsentService },
      ],
    }).compileComponents();

    metaService = TestBed.inject(Meta);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize analytics on bootstrap', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(analyticsService.initialize).toHaveBeenCalled();
  });

  it('should destroy analytics when consent becomes declined', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    consentStatusSubject.next('declined');
    expect(analyticsService.destroy).toHaveBeenCalled();
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