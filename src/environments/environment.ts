export interface EnvironmentConfig {
  production: boolean;
  gaTrackingId: string;
  formspreeEndpoint: string;
  enableAnalytics: boolean;
  enableErrorTracking: boolean;
  sentryDsn: string;
  sentryTracesSampleRate: number;
}

export const environment: EnvironmentConfig = {
  production: false,
  gaTrackingId: '',
  formspreeEndpoint: '',
  enableAnalytics: false,
  enableErrorTracking: false,
  sentryDsn: '',
  sentryTracesSampleRate: 0,
};
