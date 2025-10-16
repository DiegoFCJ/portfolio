import { EnvironmentConfig } from './environment.config';

export const environment: EnvironmentConfig = {
  production: false,
  gaTrackingId: '',
  formspreeEndpoint: '',
  enableAnalytics: false,
  enableErrorTracking: true,
  sentryDsn: 'https://3c44deecd427ceb15fc38b0dae3f2c15@o4510193552719872.ingest.de.sentry.io/4510193574281296',
  sentryTracesSampleRate: 1,
};

export type { EnvironmentConfig } from './environment.config';
