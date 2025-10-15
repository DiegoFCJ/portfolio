import { EnvironmentConfig } from './environment.config';

export const environment: EnvironmentConfig = {
  production: true,
  gaTrackingId: '',
  formspreeEndpoint: '',
  enableAnalytics: false,
  enableErrorTracking: false,
  sentryDsn: '',
  sentryTracesSampleRate: 0,
};

export type { EnvironmentConfig } from './environment.config';
