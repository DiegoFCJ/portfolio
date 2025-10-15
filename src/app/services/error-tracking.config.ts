import * as Sentry from "@sentry/angular";
import { EnvironmentConfig } from '../../environments/environment';

type ErrorTrackingConfiguration = {
  enabled: boolean;
  endpoint?: string;
  authHeader?: string;
};

let currentConfig: ErrorTrackingConfiguration = {
  enabled: false,
};

function normaliseSampleRate(rate: number | undefined | null): number {
  if (typeof rate !== 'number' || !Number.isFinite(rate)) {
    return 0;
  }

  if (rate <= 0) {
    return 0;
  }

  if (rate >= 1) {
    return 1;
  }

  return rate;
}

export function configureErrorTracking(environment: EnvironmentConfig): void {
  const { enableErrorTracking, sentryDsn, sentryTracesSampleRate } = environment;
  if (!enableErrorTracking || !sentryDsn) {
    currentConfig = { enabled: false };
    return;
  }

  try {
    const url = new URL(sentryDsn);
    const projectId = url.pathname.replace(/^\//, '');
    if (!projectId || !url.username) {
      currentConfig = { enabled: false };
      return;
    }

    const endpoint = `${url.protocol}//${url.host}/api/${projectId}/store/`;
    const parts = [
      'Sentry sentry_version=7',
      'sentry_client=portfolio/1.0',
      `sentry_key=${url.username}`,
    ];
    if (url.password) {
      parts.push(`sentry_secret=${url.password}`);
    }

    const tracesRate = normaliseSampleRate(sentryTracesSampleRate);

    Sentry.init({
      dsn: sentryDsn,
      enabled: true,
      // Setting this option to true will send default PII data to Sentry.
      // For example, automatic IP address collection on events
      sendDefaultPii: true,
      sampleRate: 1,
      tracesSampleRate: tracesRate,
      environment: environment.production ? 'production' : 'development',
    });

    currentConfig = {
      enabled: true,
      endpoint,
      authHeader: parts.join(', '),
    };
  } catch {
    currentConfig = { enabled: false };
  }
}

export function getErrorTrackingConfiguration(): ErrorTrackingConfiguration {
  return currentConfig;
}
