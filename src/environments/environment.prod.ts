import { EnvironmentConfig } from './environment.config';

export const environment: EnvironmentConfig = {
  production: false,
  gaTrackingId: '',
  formspreeEndpoint: '',
  enableAnalytics: false,
  enableErrorTracking: true,
  sentryDsn: 'https://dfe186d21a11e5397b5baf0c88109a28@o4510193552719872.ingest.de.sentry.io/4510198684713040',
  sentryTracesSampleRate: 1,
};

export type { EnvironmentConfig } from './environment.config';
