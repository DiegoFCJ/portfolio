import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLanguage = new BehaviorSubject<'en' | 'it' | 'de' | 'es'>('en');
  currentLanguage$ = this.currentLanguage.asObservable();

  constructor() { }

  setLanguage(language: 'en' | 'it' | 'de' | 'es'): void {
    this.currentLanguage.next(language);
  }

  getTranslatedData<T>(data: { [key: string]: T }): T {
    const language = this.currentLanguage.value;
    return data[language];
  }

  /** Returns the current language string ('en', 'it', 'de' or 'es') */
  getCurrentLanguage(): 'en' | 'it' | 'de' | 'es' {
    return this.currentLanguage.value;
  }
}