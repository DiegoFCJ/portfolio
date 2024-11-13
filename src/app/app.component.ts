import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { APP_TITLE } from './constants/general'; // Import title constant
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';

declare var gtag: Function | undefined;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}

  ngOnInit() {
    // Set the document title only in the browser
    if (isPlatformBrowser(this.platformId)) {
      document.title = APP_TITLE;
      
      // Subscribe to navigation events for Google Analytics only if in the browser
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
