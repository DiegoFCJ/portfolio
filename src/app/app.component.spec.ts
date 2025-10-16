import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslationService } from './services/translation.service';
import { BehaviorSubject, of } from 'rxjs';
import { LanguageCode } from './models/language-code.type';
import { Meta } from '@angular/platform-browser';
import { AnalyticsService } from './services/analytics.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ThemeService } from './services/theme.service';
import { ThemeKey } from './models/theme-key.type';
import { LanguageCode } from './models/language-code.type';

class MockThemeService {
  private readonly themeSubject = new BehaviorSubject<ThemeKey>('dark');
  readonly currentTheme$ = this.themeSubject.asObservable();

  getAvailableThemes(): ThemeKey[] {
    return ['light', 'dark', 'blue', 'green', 'red'];
  }

  getCurrentTheme(): ThemeKey {
    return this.themeSubject.value;
  }

  setTheme(theme: ThemeKey): void {
    this.themeSubject.next(theme);
  }

  getThemeLabel(_theme: ThemeKey, _language: LanguageCode): string {
    return 'Theme';
  }
}

describe('AppComponent', () => {
  let mockTranslationService: Partial<TranslationService>;
  let languageSubject: BehaviorSubject<LanguageCode>;
  let metaService: Meta;
  let analyticsService: jasmine.SpyObj<AnalyticsService>;

  beforeEach(async () => {
    ['analytics-consent', 'cookie-consent', 'cookie_consent'].forEach(key => {
      try {
        window.localStorage?.removeItem(key);
      } catch {
        // Ignore
      }
      document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });

    // Creiamo un BehaviorSubject per simulare il currentLanguage$
    languageSubject = new BehaviorSubject<LanguageCode>('it');
    const getTranslatedDataSpy = jasmine
      .createSpy('getTranslatedData')
      .and.callFake(<T>(data: Partial<Record<LanguageCode, T>>, source: LanguageCode = 'it') => {
        const fallback = (
          data[source] ?? Object.values(data).find((value): value is T => value !== undefined)
        ) as T | undefined;
        return of((fallback ?? ({} as T)) as T);
      });

    mockTranslationService = {
      currentLanguage$: languageSubject.asObservable(),
      setLanguage: jasmine.createSpy('setLanguage').and.callFake((language: LanguageCode) => {
        languageSubject.next(language);
      }),
      getTranslatedData: getTranslatedDataSpy as TranslationService['getTranslatedData'],
      getCurrentLanguage: jasmine.createSpy('getCurrentLanguage').and.callFake(() => languageSubject.value),
    };

    analyticsService = jasmine.createSpyObj<AnalyticsService>('AnalyticsService', ['initialize', 'trackPageView']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppComponent],
      providers: [
        { provide: TranslationService, useValue: mockTranslationService },
        { provide: ThemeService, useClass: MockThemeService },
        { provide: AnalyticsService, useValue: analyticsService },
      ],
    }).compileComponents();

    metaService = TestBed.inject(Meta);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should defer analytics initialization until consent is granted', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(analyticsService.initialize).not.toHaveBeenCalled();

    const app = fixture.componentInstance;
    app.onConsentChange(true);

    expect(analyticsService.initialize).toHaveBeenCalledTimes(1);

    app.onConsentChange(true);
    expect(analyticsService.initialize).toHaveBeenCalledTimes(1);

    app.onConsentChange(false);
    app.onConsentChange(true);
    expect(analyticsService.initialize).toHaveBeenCalledTimes(2);
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
