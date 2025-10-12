export interface EnvironmentConfig {
  production: boolean;
  gaTrackingId: string;
  formspreeEndpoint: string;
  enableAnalytics: boolean;
  enableErrorTracking: boolean;
  sentryDsn: string;
  sentryTracesSampleRate: number;
}
