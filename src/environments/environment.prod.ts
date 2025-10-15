import { EnvironmentConfig } from './environment.config';

export const environment: EnvironmentConfig = {
  production: true,
  gaTrackingId: '',
  formspreeEndpoint: '',
  enableAnalytics: false,
  enableErrorTracking: false,
  sentryDsn: '',
  sentryTracesSampleRate: 0, // Disable traces by default; error reporting stays enabled separately
};

export type { EnvironmentConfig } from './environment.config';
