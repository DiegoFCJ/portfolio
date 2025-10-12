import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initializeMonitoring } from './app/monitoring/monitoring';
import { environment } from './environments/environment';

initializeMonitoring({
  enabled: environment.monitoring.enabled,
  dsn: environment.monitoring.sentryDsn,
  sampleRate: environment.monitoring.tracesSampleRate,
  environment: environment.production ? 'production' : 'development',
  platform: 'browser',
});

bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
