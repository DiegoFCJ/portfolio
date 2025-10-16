import { EnvironmentConfig } from './environment.config';

export const environment: EnvironmentConfig = {
  production: true,
  gaTrackingId: '',
  formspreeEndpoint: '',
  enableAnalytics: false,
  enableErrorTracking: true,
  sentryDsn: 'https://49717dbbe605ee8999979f2b47166584@o4510193552719872.ingest.de.sentry.io/4510197906538576',
  sentryTracesSampleRate: 1,
};

export type { EnvironmentConfig } from './environment.config';
