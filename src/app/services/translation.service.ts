import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export type LanguageCode = 'en' | 'it' | 'de' | 'es';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly currentLanguage = new BehaviorSubject<LanguageCode>('en');
  readonly currentLanguage$ = this.currentLanguage.asObservable();

  private readonly cache = new Map<string, string>();
  private readonly storageKey = 'translation-cache';
  private storage?: Storage;

  constructor(
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        this.storage = window.localStorage;
        this.restoreCache();
      } catch {
        this.storage = undefined;
      }
    }
  }

  setLanguage(language: LanguageCode): void {
    this.currentLanguage.next(language);
  }

  getCurrentLanguage(): LanguageCode {
    return this.currentLanguage.value;
  }

  translateText(text: string, source: LanguageCode = 'en', target?: LanguageCode): Observable<string> {
    const targetLanguage = target ?? this.currentLanguage.value;
    const original = text ?? '';

    if (!original.trim() || targetLanguage === source) {
      return of(original);
    }

    const cacheKey = this.getCacheKey(source, targetLanguage, original);
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return of(cached);
    }

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(original)}`;

    return this.http.get<unknown>(url).pipe(
      map((response: any) => {
        const translated = Array.isArray(response?.[0])
          ? response[0].map((item: any[]) => item[0]).join('')
          : original;
        this.setCache(cacheKey, translated);
        return translated;
      }),
      catchError(() => of(original))
    );
  }

  getTranslatedData<T>(data: Partial<Record<LanguageCode, T>>, source: LanguageCode = 'en'): Observable<T> {
    return this.currentLanguage$.pipe(
      switchMap((targetLanguage) => {
        const base = data[source];
        if (!base) {
          return of((data[targetLanguage] ?? base) as T);
        }

        if (targetLanguage === source) {
          return of(base);
        }

        const existing = data[targetLanguage];
        if (existing) {
          return of(existing);
        }

        return this.translateContent(base, source, targetLanguage);
      })
    );
  }

  translateContent<T>(content: T, source: LanguageCode = 'en', target?: LanguageCode): Observable<T> {
    const targetLanguage = target ?? this.currentLanguage.value;

    if (targetLanguage === source) {
      return of(content);
    }

    return this.translateValue(content, source, targetLanguage).pipe(
      map((translated) => translated as T)
    );
  }

  private translateValue(value: unknown, source: LanguageCode, target: LanguageCode): Observable<unknown> {
    if (value === null || value === undefined) {
      return of(value as unknown);
    }

    if (typeof value === 'string') {
      return this.translateText(value, source, target);
    }

    if (Array.isArray(value)) {
      if (!value.length) {
        return of([]);
      }

      return forkJoin(value.map((item) => this.translateValue(item, source, target)));
    }

    if (typeof value === 'object') {
      const entries = Object.entries(value as Record<string, unknown>);
      if (!entries.length) {
        return of({});
      }

      return forkJoin(
        entries.map(([key, val]) =>
          this.translateValue(val, source, target).pipe(
            map((translated) => [key, translated] as const)
          )
        )
      ).pipe(
        map((translatedEntries) => {
          const translatedObject: Record<string, unknown> = {};
          for (const [key, translated] of translatedEntries) {
            translatedObject[key] = translated;
          }
          return translatedObject;
        })
      );
    }

    return of(value);
  }

  private getCacheKey(source: string, target: string, text: string): string {
    return `${source}:${target}:${text}`;
  }

  private setCache(key: string, value: string): void {
    this.cache.set(key, value);
    this.persistCache();
  }

  private restoreCache(): void {
    if (!this.storage) {
      return;
    }

    const raw = this.storage.getItem(this.storageKey);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as Record<string, string>;
      Object.entries(parsed).forEach(([key, value]) => this.cache.set(key, value));
    } catch {
      this.storage.removeItem(this.storageKey);
    }
  }

  private persistCache(): void {
    if (!this.storage) {
      return;
    }

    try {
      const entries = Array.from(this.cache.entries());
      this.storage.setItem(this.storageKey, JSON.stringify(Object.fromEntries(entries)));
    } catch {
      // ignore persistence errors
    }
  }
}
