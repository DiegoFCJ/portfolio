import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }]
    });
    service = TestBed.inject(TranslationService);
    httpMock = TestBed.inject(HttpTestingController);

    const internals = service as unknown as {
      cache?: Map<string, string>;
      storage?: Storage;
    };

    internals.cache?.clear();
    internals.storage?.removeItem('translation-cache');
    service.setLanguage('it');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have "it" as the default language', async () => {
    const language = await firstValueFrom(service.currentLanguage$);
    expect(language).toBe('it');
  });

  it('should update the language when setLanguage is called', () => {
    service.setLanguage('it');
    expect(service.getCurrentLanguage()).toBe('it');
  });

  it('should perform a translation on cache miss', () => {
    const text = 'Hello';
    const expectedUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=it&dt=t&q=${encodeURIComponent(text)}`;

    service.translateText(text, 'en', 'it').subscribe(result => {
      expect(result).toBe('Ciao');
    });

    const req = httpMock.expectOne(expectedUrl);
    req.flush([[['Ciao', 'Hello']]]);
  });

  it('should return cached translation without additional HTTP requests', () => {
    const text = 'Hello';
    const expectedUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=it&dt=t&q=${encodeURIComponent(text)}`;

    service.translateText(text, 'en', 'it').subscribe();
    const req = httpMock.expectOne(expectedUrl);
    req.flush([[['Ciao', 'Hello']]]);

    service.translateText(text, 'en', 'it').subscribe(result => {
      expect(result).toBe('Ciao');
    });

    httpMock.expectNone(expectedUrl);
  });

  it('should fall back to the original text when the HTTP call fails', () => {
    const text = 'Hello';
    const expectedUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=de&dt=t&q=${encodeURIComponent(text)}`;

    service.translateText(text, 'en', 'de').subscribe(result => {
      expect(result).toBe(text);
    });

    const req = httpMock.expectOne(expectedUrl);
    req.flush('error', { status: 500, statusText: 'Server Error' });
  });

  it('should return handcrafted German content without requesting auto-translation', async () => {
    service.setLanguage('de');
    const data = {
      en: { message: 'Hello' },
      de: { message: 'Hallo' }
    };

    const result = await firstValueFrom(service.getTranslatedData(data, 'en'));

    expect(result).toEqual(data.de);
    httpMock.expectNone(() => true);
  });

  it('should return handcrafted Spanish content without requesting auto-translation', async () => {
    service.setLanguage('es');
    const data = {
      it: { message: 'Ciao' },
      es: { message: 'Hola' }
    };

    const result = await firstValueFrom(service.getTranslatedData(data, 'it'));

    expect(result).toEqual(data.es);
    httpMock.expectNone(() => true);
  });
});
