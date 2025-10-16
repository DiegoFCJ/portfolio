import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import * as Sentry from '@sentry/angular';
import { browserTracingIntegration } from '@sentry/angular';

const enableSentry = environment.enableErrorTracking && !!environment.sentryDsn;

if (enableSentry) {
  const tracesSampleRate = Math.min(Math.max(environment.sentryTracesSampleRate ?? 1, 0), 1);

  Sentry.init({
    dsn: environment.sentryDsn,
    integrations: [
      browserTracingIntegration(), 
    ],
    tracePropagationTargets: ['http://localhost:4200/', 'https://diegofcj.github.io/portfolio/'],
    sendDefaultPii: true,
    tracesSampleRate,
  });
}

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));