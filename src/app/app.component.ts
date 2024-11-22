import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { TranslationService } from './services/translation.service'; // Servizio per gestire la lingua
import { filter } from 'rxjs/operators';

declare var gtag: Function | undefined;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private translationService: TranslationService // Servizio di traduzione
  ) { }

  ngOnInit() {
    // Cambia il titolo dinamicamente in base alla lingua
    this.translationService.currentLanguage$.subscribe(language => {
      if (isPlatformBrowser(this.platformId)) {
        const appTitle = language === 'it' ? "Portfolio di Diego" : "Diego's Portfolio";
        document.title = appTitle;
      }
    });

    // Google Analytics configurazione
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
      ).subscribe((event: NavigationEnd) => {
        if (typeof gtag === 'function') {
          gtag('config', 'G-5ZF8RBY109', {
            page_path: event.urlAfterRedirects,
          });
        }
      });
    }
  }
}