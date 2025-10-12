export type MonitoringPlatform = 'browser' | 'server';

interface MonitoringConfig {
  enabled: boolean;
  dsn: string;
  sampleRate: number;
  environment: string;
  platform: MonitoringPlatform;
  release?: string;
}

interface ParsedDsn {
  protocol: string;
  host: string;
  projectId: string;
  publicKey: string;
  path: string;
}

interface CaptureContext {
  [key: string]: unknown;
}

interface EnvelopeHeaders {
  event_id: string;
  dsn: string;
  sent_at: string;
}

interface EnvelopeItemHeaders {
  type: string;
}

let config: MonitoringConfig | undefined;
let parsedDsn: ParsedDsn | undefined;

export function initializeMonitoring(monitoringConfig: MonitoringConfig): void {
  if (!monitoringConfig.enabled || !monitoringConfig.dsn) {
    config = undefined;
    parsedDsn = undefined;
    return;
  }

  const parsed = parseDsn(monitoringConfig.dsn);
  if (!parsed) {
    // eslint-disable-next-line no-console
    console.warn('[Monitoring] DSN non valido, monitoraggio disabilitato.');
    config = undefined;
    parsedDsn = undefined;
    return;
  }

  config = monitoringConfig;
  parsedDsn = parsed;
}

export function captureException(error: unknown, context: CaptureContext = {}): void {
  if (!config || !parsedDsn) {
    return;
  }

  const sampleRate = Number.isFinite(config.sampleRate) ? Math.max(0, Math.min(1, config.sampleRate)) : 1;
  if (sampleRate <= 0) {
    return;
  }

  if (Math.random() > sampleRate) {
    return;
  }

  const eventId = generateEventId();
  const timestamp = Date.now() / 1000;
  const normalized = normalizeError(error);
  const payload = {
    event_id: eventId,
    timestamp,
    level: 'error',
    platform: 'javascript',
    environment: config.environment,
    release: config.release,
    tags: {
      platform: config.platform,
    },
    exception: {
      values: [
        {
          type: normalized.name,
          value: normalized.message,
          stacktrace: normalized.stacktrace,
        },
      ],
    },
    extra: context,
  };

  const envelopeHeader: EnvelopeHeaders = {
    event_id: eventId,
    dsn: config.dsn,
    sent_at: new Date().toISOString(),
  };

  const itemHeader: EnvelopeItemHeaders = {
    type: 'event',
  };

  const envelope = `${JSON.stringify(envelopeHeader)}\n${JSON.stringify(itemHeader)}\n${JSON.stringify(payload)}`;

  sendEnvelope(parsedDsn, envelope);
}

function parseDsn(dsn: string): ParsedDsn | undefined {
  try {
    const url = new URL(dsn);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    const projectId = pathSegments.pop();
    if (!projectId) {
      return undefined;
    }

    const basePath = pathSegments.length ? `/${pathSegments.join('/')}` : '';

    return {
      protocol: url.protocol,
      host: url.host,
      projectId,
      publicKey: url.username,
      path: basePath,
    };
  } catch {
    return undefined;
  }
}

function sendEnvelope(dsn: ParsedDsn, envelope: string): void {
  const endpoint = `${dsn.protocol}//${dsn.host}${dsn.path}/api/${dsn.projectId}/envelope/`;

  try {
    const requestInit: RequestInit = {
      method: 'POST',
      body: envelope,
      headers: {
        'Content-Type': 'application/x-sentry-envelope',
      },
    };

    if (config?.platform === 'browser') {
      requestInit.keepalive = true;
    }

    fetch(endpoint, requestInit).catch((err) => {
      // eslint-disable-next-line no-console
      console.warn('[Monitoring] Impossibile inviare l\'errore a Sentry.', err);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[Monitoring] Errore durante l\'invio dell\'evento.', err);
  }
}

function normalizeError(error: unknown): {
  name: string;
  message: string;
  stacktrace?: { frames: Array<Record<string, unknown>> };
} {
  if (error instanceof Error) {
    return {
      name: error.name || 'Error',
      message: error.message || error.toString(),
      stacktrace: parseStack(error.stack),
    };
  }

  if (typeof error === 'string') {
    return {
      name: 'Error',
      message: error,
    };
  }

  return {
    name: 'Error',
    message: JSON.stringify(error),
  };
}

function parseStack(stack?: string): { frames: Array<Record<string, unknown>> } | undefined {
  if (!stack) {
    return undefined;
  }

  const lines = stack.split('\n').slice(1);
  if (!lines.length) {
    return undefined;
  }

  const frames = lines
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const frame: Record<string, unknown> = {};
      const withAt = line.startsWith('at ') ? line.slice(3) : line;
      const [func, location] = withAt.split(' (');
      if (location) {
        frame['function'] = func;
        const cleaned = location.replace(/\)$/g, '');
        const locationMatch = cleaned.match(/^(.*):(\d+):(\d+)$/);
        if (locationMatch) {
          frame['filename'] = locationMatch[1];
          frame['lineno'] = Number(locationMatch[2]);
          frame['colno'] = Number(locationMatch[3]);
        } else {
          frame['filename'] = cleaned;
        }
      } else {
        frame['function'] = withAt;
      }
      return frame;
    })
    .reverse();

  return { frames };
}

function generateEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID().replace(/-/g, '');
  }

  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
    const r = Math.random() * 16 | 0;
    return r.toString(16);
  });
}
