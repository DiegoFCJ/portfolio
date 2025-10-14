# Environment configuration

This document centralises the steps required to keep analytics, the contact form and error tracking configured across local development and CI builds.

## Available keys

Both `src/environments/environment.ts` (development) and `src/environments/environment.prod.ts` (production) expose the same interface:

- `gaTrackingId` – Google Analytics 4 tracking identifier.
- `formspreeEndpoint` – Formspree endpoint consumed by `EmailService` (public value tracked in git).
- `enableAnalytics` – Enables Google Analytics initialisation.
- `enableErrorTracking` – Activates Sentry error handlers.
- `sentryDsn` – Sentry DSN.
- `sentryTracesSampleRate` – Sampling rate applied to traces (0 disables tracing).

## Local development

1. Keep `enableAnalytics` and `enableErrorTracking` disabled while developing unless you want to interact with the real services.
2. When testing integrations locally, temporarily set the desired IDs in `environment.ts`. Avoid committing those secrets.
3. The `EmailService` will fall back to a logged message when `formspreeEndpoint` is empty, allowing front-end validation to be tested without a live backend.

## Continuous integration

Provide the analytics and Sentry secrets as encrypted values in the CI system (for GitHub Actions use **Settings → Secrets and variables**). The Formspree endpoint is public and already stored in `environment.prod.ts` so the static bundle can reach the production form without extra configuration. If you need to regenerate the production file during CI, keep the same endpoint and only replace the private keys:

```yaml
- name: Configure Angular environment
  run: |
    cat <<'EOF' > src/environments/environment.prod.ts
    import { EnvironmentConfig } from './environment';

    export const environment: EnvironmentConfig = {
      production: true,
      gaTrackingId: '${{ secrets.GA_TRACKING_ID }}',
      formspreeEndpoint: 'https://formspree.io/f/xrbgldjz',
      enableAnalytics: true,
      enableErrorTracking: true,
      sentryDsn: '${{ secrets.SENTRY_DSN }}',
      sentryTracesSampleRate: 0.5,
    };
    EOF
```

Adjust the sampling rate and toggles as needed per environment. Keep private credentials (analytics, Sentry) out of version control while leaving the public Formspree endpoint available so contact submissions work immediately after deployment.
