import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

type LanguageCode = 'en' | 'it' | 'de' | 'es';

@Injectable()
export class MockTranslationService {
  private readonly languageSubject = new BehaviorSubject<LanguageCode>('en');
  readonly currentLanguage$ = this.languageSubject.asObservable();

  setLanguage(language: LanguageCode): void {
    this.languageSubject.next(language);
  }

  getCurrentLanguage(): LanguageCode {
    return this.languageSubject.value;
  }

  translateText(
    text: string,
    _source: LanguageCode = 'en',
    _target?: LanguageCode
  ): Observable<string> {
    return of(text);
  }

  translateContent<T>(
    content: T,
    _source: LanguageCode = 'en',
    _target?: LanguageCode
  ): Observable<T> {
    return of(content);
  }

  getTranslatedData<T>(
    data: Partial<Record<LanguageCode, T>>,
    source: LanguageCode = 'en'
  ): Observable<T> {
    const preferred = data[source] ?? data[this.languageSubject.value];
    const fallback = preferred ?? Object.values(data)[0];
    return of((fallback ?? ({} as T)) as T);
  }
}
