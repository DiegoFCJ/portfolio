import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { initializeMonitoring } from './app/monitoring/monitoring';
import { environment } from './environments/environment';

initializeMonitoring({
  enabled: environment.monitoring.enabled,
  dsn: environment.monitoring.sentryDsn,
  sampleRate: environment.monitoring.tracesSampleRate,
  environment: environment.production ? 'production' : 'development',
  platform: 'server',
});

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
