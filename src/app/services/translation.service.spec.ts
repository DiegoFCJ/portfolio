import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TranslationService } from './translation.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const TRANSLATION_URL = (source: string, target: string, text: string) =>
  `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;

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
    window.localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    window.localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have "en" as the default language', async () => {
    const language = await firstValueFrom(service.currentLanguage$);
    expect(language).toBe('en');
  });

  it('should update the language when setLanguage is called', async () => {
    service.setLanguage('it');
    const language = await firstValueFrom(service.currentLanguage$);
    expect(language).toBe('it');
  });

  it('should request translations on cache miss', async () => {
    const text = 'Hello';
    const request$ = firstValueFrom(service.translateText(text, 'it'));

    const req = httpMock.expectOne(TRANSLATION_URL('en', 'it', text));
    req.flush([[['Ciao', text]]]);

    await expectAsync(request$).toBeResolvedTo('Ciao');
  });

  it('should reuse cached translations without new HTTP calls', async () => {
    const text = 'Developer';
    const url = TRANSLATION_URL('en', 'de', text);

    const firstCall = firstValueFrom(service.translateText(text, 'de'));
    httpMock.expectOne(url).flush([[['Entwickler', text]]]);
    await expectAsync(firstCall).toBeResolvedTo('Entwickler');

    const secondCall = firstValueFrom(service.translateText(text, 'de'));
    httpMock.expectNone(url);
    await expectAsync(secondCall).toBeResolvedTo('Entwickler');
  });

  it('should fall back to original content when translating the source language', async () => {
    const data = { en: { message: 'Welcome' } };
    const translated = await firstValueFrom(service.getTranslatedData(data));
    expect(translated).toEqual(data.en);
  });
});
