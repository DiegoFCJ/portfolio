import { EnvironmentConfig } from './environment.config';

export const environment: EnvironmentConfig = {
  production: true,
  gaTrackingId: 'G-XXXXXXXXXX',
  formspreeEndpoint: 'https://formspree.io/f/xrbgldjz',
  enableAnalytics: true,
  enableErrorTracking: true,
  sentryDsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
  sentryTracesSampleRate: 1.0,
};

export type { EnvironmentConfig } from './environment.config';
