import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

type SupportedLanguage = 'en' | 'it' | 'de' | 'es';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly currentLanguage = new BehaviorSubject<SupportedLanguage>('en');
  readonly currentLanguage$ = this.currentLanguage.asObservable();

  private readonly cache = new Map<string, string>();
  private readonly storageKey = 'translation-cache';
  private readonly isBrowser: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
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

  translateText(
    text: string,
    target: SupportedLanguage,
    source: SupportedLanguage = 'en'
  ): Observable<string> {
    if (target === source || this.shouldSkipTranslation(text)) {
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
      map((response) => this.extractTranslation(response, text)),
      tap((translation) => this.saveCacheEntry(cacheKey, translation)),
      catchError(() => of(text))
    );
  }

  getTranslatedData<T>(
    data: { [key: string]: T },
    source: SupportedLanguage = 'en'
  ): Observable<T> {
    return this.currentLanguage$.pipe(
      switchMap((targetLang) => {
        const existing = data[targetLang];
        if (existing) {
          return of(existing);
        }

        const sourceContent = data[source] ?? data.en ?? (Object.values(data)[0] as T);
        if (!sourceContent) {
          return of(sourceContent as T);
        }

        if (targetLang === source) {
          return of(sourceContent);
        }

        return this.translateValue(sourceContent, source, targetLang);
      })
    );
  }

  translateContent<T>(
    content: T,
    source: SupportedLanguage = 'en'
  ): Observable<T> {
    return this.currentLanguage$.pipe(
      switchMap((targetLang) => this.translateValue(content, source, targetLang))
    );
  }

  private translateValue<T>(
    value: T,
    source: SupportedLanguage,
    target: SupportedLanguage
  ): Observable<T> {
    if (target === source) {
      return of(value);
    }

    if (typeof value === 'string') {
      return this.translateText(value, target, source) as unknown as Observable<T>;
    }

    if (Array.isArray(value)) {
      const translated$ = value.map((item) => this.translateValue(item, source, target));
      return (translated$.length ? forkJoin(translated$) : of([])) as unknown as Observable<T>;
    }

    if (value !== null && typeof value === 'object') {
      const entries = Object.entries(value as Record<string, unknown>);
      if (!entries.length) {
        return of(value);
      }

      return forkJoin(
        entries.map(([key, entryValue]) =>
          this.translateValue(entryValue, source, target).pipe(
            map((translated) => [key, translated] as [string, unknown])
          )
        )
      ).pipe(
        map((translatedEntries) => {
          const result: Record<string, unknown> = {};
          for (const [key, translated] of translatedEntries) {
            result[key] = translated;
          }
          return result as T;
        })
      );
    }

    return of(value);
  }

  private getCacheKey(
    source: SupportedLanguage,
    target: SupportedLanguage,
    text: string
  ): string {
    return `${source}|${target}|${encodeURIComponent(text)}`;
  }

  private extractTranslation(response: any, fallback: string): string {
    if (!Array.isArray(response) || !Array.isArray(response[0])) {
      return fallback;
    }

    const segments = response[0];
    const translation = segments
      .map((segment: unknown) => (Array.isArray(segment) ? segment[0] : ''))
      .join('');

    return translation || fallback;
  }

  private saveCacheEntry(key: string, value: string): void {
    this.cache.set(key, value);
    this.persistCache();
  }

  private shouldSkipTranslation(text: string): boolean {
    if (!text) {
      return true;
    }

    const trimmed = text.trim();
    if (!trimmed) {
      return true;
    }

    return /^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith('mailto:');
  }

  private restoreCache(): void {
    if (!this.isBrowser) {
      return;
    }

    const stored = this.safeStorageGet(this.storageKey);
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as Record<string, string>;
      Object.entries(parsed).forEach(([key, value]) => {
        this.cache.set(key, value);
      });
    } catch {
      // Ignore malformed cache entries
    }
  }

  private persistCache(): void {
    if (!this.isBrowser) {
      return;
    }

    const entries = Object.fromEntries(this.cache.entries());
    this.safeStorageSet(this.storageKey, JSON.stringify(entries));
  }

  private safeStorageGet(key: string): string | null {
    if (!this.isBrowser) {
      return null;
    }

    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private safeStorageSet(key: string, value: string): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Ignore storage errors (e.g., quota exceeded)
    }
  }
}
