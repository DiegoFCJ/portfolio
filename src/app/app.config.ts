import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { MAT_ICON_DEFAULT_OPTIONS } from '@angular/material/icon';
import { environment } from '../environments/environment';
import { APP_ENVIRONMENT } from './tokens/environment.token';
import { SentryErrorHandler } from './services/sentry-error-handler.service';

const errorTrackingProviders = (environment.enableErrorTracking && environment.sentryDsn)
  ? [{
    provide: ErrorHandler,
    useClass: SentryErrorHandler,
  }]
  : [];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: MAT_ICON_DEFAULT_OPTIONS,
      useValue: { fontSet: 'material-icons' }
    },
    { provide: APP_ENVIRONMENT, useValue: environment },
    ...errorTrackingProviders
  ]
};
