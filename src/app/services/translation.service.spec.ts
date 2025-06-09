import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have "en" as the default language', (done: DoneFn) => {
    service.currentLanguage$.subscribe((language) => {
      expect(language).toBe('en');
      done();
    });
  });

  it('should update the language when setLanguage is called', (done: DoneFn) => {
    service.setLanguage('it');
    service.currentLanguage$.subscribe((language) => {
      expect(language).toBe('it');
      done();
    });
  });

  it('should support german and spanish languages', (done: DoneFn) => {
    service.setLanguage('de');
    service.currentLanguage$.subscribe(lang => {
      expect(lang).toBe('de');
      service.setLanguage('es');
      service.currentLanguage$.subscribe(lang2 => {
        expect(lang2).toBe('es');
        done();
      });
    });
  });

  it('should return the correct translated data for the current language', () => {
    const mockData = {
      en: 'Hello',
      it: 'Ciao',
    };

    // Test default language (en)
    expect(service.getTranslatedData(mockData)).toBe('Hello');

    // Change language to 'it' and test
    service.setLanguage('it');
    expect(service.getTranslatedData(mockData)).toBe('Ciao');
  });

  it('should handle missing keys in getTranslatedData gracefully', () => {
    const mockData = {
      en: 'Hello',
    };

    // Test for a missing key ('it') in the provided data
    service.setLanguage('it');
    expect(service.getTranslatedData(mockData)).toBeUndefined();
  });
});