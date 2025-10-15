#!/usr/bin/env node
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const targetPath = resolve(__dirname, '../src/environments/environment.prod.ts');

const escapeForTs = (value) => value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

const parseBoolean = (value, fallback) => {
  if (value === undefined) {
    return fallback;
  }

  if (typeof value === 'string') {
    return ['true', '1', 'yes', 'y', 'on'].includes(value.trim().toLowerCase());
  }

  return Boolean(value);
};

const parseNumber = (value, fallback) => {
  if (value === undefined || value === '') {
    return fallback;
  }

  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const readEnv = (...keys) => keys.map((key) => process.env[key]).find((value) => value !== undefined);

const gaTrackingId = readEnv('NG_APP_GA_TRACKING_ID', 'GA_TRACKING_ID') ?? '';
const formspreeEndpoint = readEnv('NG_APP_FORMSPREE_ENDPOINT', 'FORMSPREE_ENDPOINT') ?? '';
const sentryDsn = readEnv('NG_APP_SENTRY_DSN', 'SENTRY_DSN') ?? '';

const enableAnalytics = parseBoolean(
  readEnv('NG_APP_ENABLE_ANALYTICS', 'ENABLE_ANALYTICS'),
  gaTrackingId.length > 0,
);
const enableErrorTracking = parseBoolean(
  readEnv('NG_APP_ENABLE_ERROR_TRACKING', 'ENABLE_ERROR_TRACKING'),
  sentryDsn.length > 0,
);
const sentryTracesSampleRate = parseNumber(
  readEnv('NG_APP_SENTRY_TRACES_SAMPLE_RATE', 'SENTRY_TRACES_SAMPLE_RATE'),
  enableErrorTracking ? 1 : 0,
);

const content = `import { EnvironmentConfig } from './environment.config';

export const environment: EnvironmentConfig = {
  production: true,
  gaTrackingId: '${escapeForTs(gaTrackingId)}',
  formspreeEndpoint: '${escapeForTs(formspreeEndpoint)}',
  enableAnalytics: ${enableAnalytics},
  enableErrorTracking: ${enableErrorTracking},
  sentryDsn: '${escapeForTs(sentryDsn)}',
  sentryTracesSampleRate: ${sentryTracesSampleRate},
};

export type { EnvironmentConfig } from './environment.config';
`;

writeFileSync(targetPath, content, { encoding: 'utf8' });

console.log(`Written production environment to ${targetPath}`);
