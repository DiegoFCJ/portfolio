import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { TranslationService } from './services/translation.service'; // Servizio per gestire la lingua
import { APP_TITLE_en, APP_TITLE_it, APP_TITLE_de, APP_TITLE_es } from './constants/general.const';
import { filter } from 'rxjs/operators';
import { AnalyticsService } from './services/analytics.service';

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
    private translationService: TranslationService, // Servizio di traduzione
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit() {
    // Cambia il titolo dinamicamente in base alla lingua
    this.translationService.currentLanguage$.subscribe(language => {
      if (isPlatformBrowser(this.platformId)) {
        let appTitle = APP_TITLE_it;
        if (language === 'en') appTitle = APP_TITLE_en;
        else if (language === 'de') appTitle = APP_TITLE_de;
        else if (language === 'es') appTitle = APP_TITLE_es;
        document.title = appTitle;
      }
    });

    // Google Analytics configurazione
    if (isPlatformBrowser(this.platformId)) {
      this.analyticsService.init();
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
      ).subscribe((event: NavigationEnd) => {
        this.analyticsService.trackPageView(event.urlAfterRedirects);
      });
    }
  }
}