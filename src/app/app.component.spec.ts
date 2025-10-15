import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslationService } from './services/translation.service';
import { BehaviorSubject, of } from 'rxjs';
import { LanguageCode } from './models/language-code.type';
import { Meta } from '@angular/platform-browser';
import { AnalyticsService } from './services/analytics.service';

describe('AppComponent', () => {
  let mockTranslationService: Partial<TranslationService>;
  let languageSubject: BehaviorSubject<LanguageCode>;
  let metaService: Meta;
  let analyticsService: jasmine.SpyObj<AnalyticsService>;
  const consentKeys = ['analytics-consent', 'cookie-consent', 'cookie_consent'];

  const clearConsent = () => {
    consentKeys.forEach((key) => {
      window.localStorage.removeItem(key);
      document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
  };

  beforeEach(async () => {
    // Creiamo un BehaviorSubject per simulare il currentLanguage$
    languageSubject = new BehaviorSubject<LanguageCode>('it');
    mockTranslationService = {
      currentLanguage$: languageSubject.asObservable(),
      setLanguage: jasmine.createSpy('setLanguage').and.callFake((language: LanguageCode) => {
        languageSubject.next(language);
      }),
      getTranslatedData: jasmine.createSpy('getTranslatedData').and.returnValue(
        of({ message: '', accept: '', reject: '', privacy: '' })
      ),
    };

    analyticsService = jasmine.createSpyObj<AnalyticsService>('AnalyticsService', ['initialize', 'trackPageView']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: TranslationService, useValue: mockTranslationService },
        { provide: AnalyticsService, useValue: analyticsService },
      ],
    }).compileComponents();

    metaService = TestBed.inject(Meta);
    clearConsent();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should not initialize analytics without consent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(analyticsService.initialize).not.toHaveBeenCalled();
  });

  it('should initialize analytics when consent has been granted previously', () => {
    window.localStorage.setItem('analytics-consent', 'granted');

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(analyticsService.initialize).toHaveBeenCalled();
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

  it('should set the document title to "Diegos portefølje" for Norwegian', () => {
    languageSubject.next('no');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(document.title).toEqual('Diegos portefølje');
    expect(metaService.getTag("name='description'")?.content).toContain('fullstack-løsninger');
    expect(metaService.getTag("property='og:locale'")?.content).toBe('nb_NO');
  });

  it('should set the document title to "Портфолио Диего" for Russian', () => {
    languageSubject.next('ru');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(document.title).toEqual('Портфолио Диего');
    expect(metaService.getTag("property='og:description'")?.content).toContain('full-stack решения');
    expect(metaService.getTag("property='og:locale'")?.content).toBe('ru_RU');
  });
});
