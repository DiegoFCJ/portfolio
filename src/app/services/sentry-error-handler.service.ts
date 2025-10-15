import { ErrorHandler, Inject, Injectable } from '@angular/core';
import * as Sentry from '@sentry/angular';
import { APP_ENVIRONMENT } from '../tokens/environment.token';
import { EnvironmentConfig } from '../../environments/environment';
import { getErrorTrackingConfiguration } from './error-tracking.config';

@Injectable()
export class SentryErrorHandler extends ErrorHandler {
  constructor(@Inject(APP_ENVIRONMENT) private readonly environment: EnvironmentConfig) {
    super();
  }

  override handleError(error: unknown): void {
    const config = getErrorTrackingConfiguration();
    const err = error instanceof Error ? error : new Error(typeof error === 'string' ? error : 'Unknown error');

    if (config.enabled) {
      if (typeof fetch === 'function' && config.endpoint && config.authHeader) {
        const payload = this.buildPayload(err);
        void fetch(config.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Sentry-Auth': config.authHeader,
          },
          body: JSON.stringify(payload),
        }).catch(() => {
          Sentry.captureException(err);
        });
      } else {
        Sentry.captureException(err);
      }
    }

    super.handleError(err);
  }

  private buildPayload(err: Error): Record<string, unknown> {
    const now = new Date().toISOString();
    const stack = err.stack;
    const eventId = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID().replace(/-/g, '')
      : undefined;

    const payload: Record<string, unknown> = {
      level: 'error',
      message: `${err.name}: ${err.message}`,
      timestamp: now,
      platform: 'javascript',
      tags: {
        framework: 'angular',
        environment: this.environment.production ? 'production' : 'development',
      },
      extra: {
        stack,
      },
    };

    if (eventId) {
      payload['event_id'] = eventId;
    }

    return payload;
  }
}
