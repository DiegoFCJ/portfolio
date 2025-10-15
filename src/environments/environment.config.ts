export interface EnvironmentConfig {
  production: boolean;
  gaTrackingId: string;
  formspreeEndpoint: string;
  enableAnalytics: boolean;
  enableErrorTracking: boolean;
  sentryDsn: string;
  /** Sampling rate for performance traces. Errors are always reported when tracking is enabled. */
  sentryTracesSampleRate: number;
}
