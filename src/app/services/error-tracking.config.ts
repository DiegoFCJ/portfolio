import { EnvironmentConfig } from '../../environments/environment';

type ErrorTrackingConfiguration = {
  enabled: boolean;
  endpoint?: string;
  authHeader?: string;
  sampleRate: number;
};

let currentConfig: ErrorTrackingConfiguration = {
  enabled: false,
  sampleRate: 0,
};

export function configureErrorTracking(environment: EnvironmentConfig): void {
  const { enableErrorTracking, sentryDsn, sentryTracesSampleRate } = environment;
  if (!enableErrorTracking || !sentryDsn) {
    currentConfig = { enabled: false, sampleRate: 0 };
    return;
  }

  try {
    const url = new URL(sentryDsn);
    const projectId = url.pathname.replace(/^\//, '');
    if (!projectId || !url.username) {
      currentConfig = { enabled: false, sampleRate: 0 };
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

    currentConfig = {
      enabled: true,
      endpoint,
      authHeader: parts.join(', '),
      sampleRate: Math.max(0, Math.min(1, sentryTracesSampleRate ?? 0)),
    };
  } catch {
    currentConfig = { enabled: false, sampleRate: 0 };
  }
}

export function getErrorTrackingConfiguration(): ErrorTrackingConfiguration {
  return currentConfig;
}
