import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TranslationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have "en" as the default language', (done: DoneFn) => {
    service.currentLanguage$.subscribe(language => {
      expect(language).toBe('en');
      done();
    });
  });

  it('should update the language when setLanguage is called', (done: DoneFn) => {
    service.setLanguage('it');
    service.currentLanguage$.subscribe(language => {
      expect(language).toBe('it');
      done();
    });
  });

  it('should fetch translations from the API on cache miss and reuse them on subsequent calls', async () => {
    const translation$ = service.translateText('Hello', 'en', 'it');
    const request = httpMock.expectOne(req => req.url.includes('translate.googleapis.com'));
    expect(request.request.method).toBe('GET');
    request.flush([[['Ciao', 'Hello']]]);

    const translated = await firstValueFrom(translation$);
    expect(translated).toBe('Ciao');

    const cachedTranslation = await firstValueFrom(service.translateText('Hello', 'en', 'it'));
    expect(cachedTranslation).toBe('Ciao');
    httpMock.expectNone(req => req.url.includes('translate.googleapis.com'));
  });

  it('should fall back to the original text when the translation request fails', async () => {
    const translation$ = service.translateText('Hello', 'en', 'it');
    const request = httpMock.expectOne(req => req.url.includes('translate.googleapis.com'));
    request.flush('Error', { status: 500, statusText: 'Server Error' });

    const translated = await firstValueFrom(translation$);
    expect(translated).toBe('Hello');

    const cachedTranslation = await firstValueFrom(service.translateText('Hello', 'en', 'it'));
    expect(cachedTranslation).toBe('Hello');
    httpMock.expectNone(req => req.url.includes('translate.googleapis.com'));
  });

  it('should resolve getTranslatedData using the base language when no translation is available', async () => {
    const mockData = {
      en: { message: 'Hello' }
    };

    const result = await firstValueFrom(service.getTranslatedData(mockData));
    expect(result).toEqual(mockData.en);
  });
});
