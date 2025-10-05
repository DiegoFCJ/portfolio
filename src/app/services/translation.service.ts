import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, map, of, tap, catchError } from 'rxjs';

type SupportedLanguage = 'en' | 'it' | 'de' | 'es';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly storageKey = 'translation-cache';
  private readonly cache = new Map<string, string>();
  private readonly storage: Storage | null;
  private currentLanguage = new BehaviorSubject<SupportedLanguage>('en');
  currentLanguage$ = this.currentLanguage.asObservable();

  constructor(private http: HttpClient) {
    this.storage = this.getStorage();
    this.restoreCache();
  }

  setLanguage(language: SupportedLanguage): void {
    if (this.currentLanguage.value !== language) {
      this.currentLanguage.next(language);
    }
  }

  getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage.value;
  }

  getTranslatedData<T>(data: { [key: string]: T }, sourceLang: SupportedLanguage = 'en'): Observable<T> {
    const targetLanguage = this.getCurrentLanguage();
    const existingTranslation = data[targetLanguage];
    if (existingTranslation) {
      return of(existingTranslation);
    }

    const sourceContent = data[sourceLang] ?? data.en ?? Object.values(data)[0];
    if (!sourceContent) {
      return of(existingTranslation as T);
    }

    return this.translateContent(sourceContent, sourceLang, targetLanguage);
  }

  translateContent<T>(content: T, source: SupportedLanguage = 'en', target: SupportedLanguage = this.getCurrentLanguage()): Observable<T> {
    if (source === target) {
      return of(content);
    }

    return this.translateValue(content, source, target) as Observable<T>;
  }

  translateText(text: string, source: SupportedLanguage, target: SupportedLanguage): Observable<string> {
    if (!text?.trim() || source === target) {
      return of(text);
    }

    const cacheKey = this.getCacheKey(source, target, text);
    const cachedValue = this.cache.get(cacheKey);
    if (cachedValue) {
      return of(cachedValue);
    }

    const encoded = encodeURIComponent(text);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encoded}`;

    return this.http.get<any>(url).pipe(
      map(response => this.extractTranslatedText(response) ?? text),
      tap(translated => this.storeTranslation(cacheKey, translated)),
      catchError(() => {
        this.storeTranslation(cacheKey, text);
        return of(text);
      })
    );
  }

  private translateValue(value: any, source: SupportedLanguage, target: SupportedLanguage): Observable<any> {
    if (typeof value === 'string') {
      return this.translateText(value, source, target);
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return of([]);
      }

      return forkJoin(value.map(item => this.translateValue(item, source, target)));
    }

    if (value && typeof value === 'object') {
      const entries = Object.entries(value);
      if (entries.length === 0) {
        return of({});
      }

      return forkJoin(
        entries.map(([key, entryValue]) =>
          this.translateValue(entryValue, source, target).pipe(map(translated => [key, translated] as [string, unknown]))
        )
      ).pipe(
        map(translatedEntries =>
          translatedEntries.reduce((acc, [key, translated]) => {
            (acc as Record<string, unknown>)[key] = translated;
            return acc;
          }, {} as Record<string, unknown>)
        )
      );
    }

    return of(value);
  }

  private extractTranslatedText(response: any): string | null {
    if (!Array.isArray(response) || !Array.isArray(response[0])) {
      return null;
    }

    return response[0]
      .map((segment: any[]) => (Array.isArray(segment) && typeof segment[0] === 'string' ? segment[0] : ''))
      .join('');
  }

  private getCacheKey(source: SupportedLanguage, target: SupportedLanguage, text: string): string {
    return `${source}:${target}:${text}`;
  }

  private getStorage(): Storage | null {
    try {
      if (typeof window !== 'undefined' && window?.localStorage) {
        return window.localStorage;
      }
    } catch {
      return null;
    }
    return null;
  }

  private restoreCache(): void {
    if (!this.storage) {
      return;
    }

    try {
      const stored = this.storage.getItem(this.storageKey);
      if (!stored) {
        return;
      }
      const parsed = JSON.parse(stored) as Record<string, string>;
      Object.entries(parsed).forEach(([key, value]) => this.cache.set(key, value));
    } catch {
      // ignore storage errors
    }
  }

  private storeTranslation(key: string, value: string): void {
    this.cache.set(key, value);
    if (!this.storage) {
      return;
    }

    try {
      const serialized = JSON.stringify(Object.fromEntries(this.cache.entries()));
      this.storage.setItem(this.storageKey, serialized);
    } catch {
      // ignore storage errors
    }
  }
}
