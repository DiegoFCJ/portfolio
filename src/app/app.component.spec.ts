import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslationService } from './services/translation.service';
import { BehaviorSubject } from 'rxjs';

describe('AppComponent', () => {
  let mockTranslationService: Partial<TranslationService>;
  let languageSubject: BehaviorSubject<'en' | 'it'>;

  beforeEach(async () => {
    // Creiamo un BehaviorSubject per simulare il currentLanguage$
    languageSubject = new BehaviorSubject<'en' | 'it'>('en');
    mockTranslationService = {
      currentLanguage$: languageSubject.asObservable(),
      setLanguage: jasmine.createSpy('setLanguage').and.callFake((language: 'en' | 'it') => {
        languageSubject.next(language);
      }),
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: TranslationService, useValue: mockTranslationService }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set the document title to "Diego\'s Portfolio" for English', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(document.title).toEqual("Diego's Portfolio");
  });

  it('should set the document title to "Portfolio di Diego" for Italian', () => {
    languageSubject.next('it'); // Cambia la lingua simulata in italiano
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(document.title).toEqual('Portfolio di Diego');
  });
});