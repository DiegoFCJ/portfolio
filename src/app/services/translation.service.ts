import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LanguageCode } from '../models/language-code.type';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly currentLanguage = new BehaviorSubject<LanguageCode>('it');
  readonly currentLanguage$ = this.currentLanguage.asObservable();

  private readonly cache = new Map<string, string>();
  private readonly storageKey = 'translation-cache';
  private storage?: Storage;

  constructor(
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID) private readonly platformId: object
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

  translateText(text: string, source: LanguageCode = 'it', target?: LanguageCode): Observable<string> {
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
      map((response) => {
        const translated = this.extractTranslatedText(response, original);
        this.setCache(cacheKey, translated);
        return translated;
      }),
      catchError(() => of(original))
    );
  }

  getTranslatedData<T>(data: Partial<Record<LanguageCode, T>>, source: LanguageCode = 'it'): Observable<T> {
    return this.currentLanguage$.pipe(
      switchMap((targetLanguage) => {
        const { content: base, language: resolvedSource } = this.resolveSourceContent(
          data,
          source
        );

        if (!base) {
          return of(base as T);
        }

        if (targetLanguage === resolvedSource) {
          return of(base);
        }

        const existing = data[targetLanguage];
        if (existing) {
          return of(existing);
        }

        return this.translateContent(base, resolvedSource, targetLanguage);
      })
    );
  }

  translateContent<T>(content: T, source: LanguageCode = 'it', target?: LanguageCode): Observable<T> {
    const targetLanguage = target ?? this.currentLanguage.value;

    if (targetLanguage === source) {
      return of(content);
    }

    return this.translateValue(content, source, targetLanguage).pipe(
      map((translated) => translated as T)
    );
  }

  private resolveSourceContent<T>(
    data: Partial<Record<LanguageCode, T>>,
    preferredSource: LanguageCode
  ): { content: T | undefined; language: LanguageCode } {
    const preferred = data[preferredSource];
    if (preferred) {
      return { content: preferred, language: preferredSource };
    }

    const fallbackOrder: LanguageCode[] = ['it', 'en', 'de', 'es'];
    const fallback = fallbackOrder
      .filter((lang) => lang !== preferredSource)
      .map((lang) => ({ lang, content: data[lang] }))
      .find((entry) => Boolean(entry.content));

    if (fallback) {
      return { content: fallback.content as T, language: fallback.lang };
    }

    const firstEntry = Object.entries(data)[0];
    if (firstEntry) {
      return { content: firstEntry[1] as T, language: firstEntry[0] as LanguageCode };
    }

    return { content: undefined, language: preferredSource };
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

  private extractTranslatedText(response: unknown, fallback: string): string {
    if (!Array.isArray(response)) {
      return fallback;
    }

    const firstEntry = response[0];
    if (!Array.isArray(firstEntry)) {
      return fallback;
    }

    const segments = firstEntry
      .filter((segment): segment is [string, ...unknown[]] => Array.isArray(segment) && typeof segment[0] === 'string')
      .map(segment => segment[0])
      .join('');

    return segments || fallback;
  }
}
