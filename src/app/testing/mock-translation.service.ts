import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LanguageCode } from '../models/language-code.type';

@Injectable()
export class MockTranslationService {
  private readonly languageSubject = new BehaviorSubject<LanguageCode>('it');
  readonly currentLanguage$ = this.languageSubject.asObservable();

  setLanguage(language: LanguageCode): void {
    this.languageSubject.next(language);
  }

  getCurrentLanguage(): LanguageCode {
    return this.languageSubject.value;
  }

  translateText(
    text: string,
    _source: LanguageCode = 'it',
    _target?: LanguageCode
  ): Observable<string> {
    return of(text);
  }

  translateContent<T>(
    content: T,
    _source: LanguageCode = 'it',
    _target?: LanguageCode
  ): Observable<T> {
    return of(content);
  }

  getTranslatedData<T>(
    data: Partial<Record<LanguageCode, T>>,
    source: LanguageCode = 'it'
  ): Observable<T> {
    const { content } = this.resolveSourceContent(data, source);
    return of((content ?? ({} as T)) as T);
  }

  private resolveSourceContent<T>(
    data: Partial<Record<LanguageCode, T>>,
    preferred: LanguageCode
  ): { content: T | undefined; language: LanguageCode } {
    const preferredContent = data[preferred];
    if (preferredContent) {
      return { content: preferredContent, language: preferred };
    }

    const fallbackOrder: LanguageCode[] = ['it', 'en', 'de', 'es', 'no', 'ru'];
    for (const fallback of fallbackOrder) {
      if (fallback === preferred) {
        continue;
      }
      const content = data[fallback];
      if (content) {
        return { content, language: fallback };
      }
    }

    const firstEntry = Object.entries(data)[0];
    if (firstEntry) {
      return { content: firstEntry[1] as T, language: firstEntry[0] as LanguageCode };
    }

    return { content: undefined, language: preferred };
  }
}
