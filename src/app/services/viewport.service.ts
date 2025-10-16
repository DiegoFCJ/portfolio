import { Inject, Injectable, PLATFORM_ID, DestroyRef, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly isMobileSubject = new BehaviorSubject<boolean>(false);
  private readonly query = '(max-width: 960px)';

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (typeof window.matchMedia !== 'function') {
      this.isMobileSubject.next(false);
      return;
    }

    const mediaQuery = window.matchMedia(this.query);
    this.isMobileSubject.next(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      this.isMobileSubject.next(event.matches);
    };

    mediaQuery.addEventListener('change', listener);
    this.destroyRef.onDestroy(() => mediaQuery.removeEventListener('change', listener));
  }

  get isMobile$(): Observable<boolean> {
    return this.isMobileSubject.asObservable();
  }

  isMobile(): boolean {
    return this.isMobileSubject.value;
  }
}
