# Environment configuration

This document centralises the steps required to keep analytics, the contact form and error tracking configured across local development and CI builds.

## Available keys

Both `src/environments/environment.ts` (development) and `src/environments/environment.prod.ts` (production) expose the same interface:

- `gaTrackingId` – Google Analytics 4 tracking identifier.
- `formspreeEndpoint` – Formspree endpoint consumed by `EmailService`.
- `enableAnalytics` – Enables Google Analytics initialisation.
- `enableErrorTracking` – Activates Sentry error handlers.
- `sentryDsn` – Sentry DSN.
- `sentryTracesSampleRate` – Sampling rate applied to traces (0 disables tracing).

## Local development

1. Keep `enableAnalytics` and `enableErrorTracking` disabled while developing unless you want to interact with the real services.
2. When testing integrations locally, temporarily set the desired IDs in `environment.ts`. Avoid committing those secrets.
3. The `EmailService` will fall back to a logged message when `formspreeEndpoint` is empty, allowing front-end validation to be tested without a live backend.

## Continuous integration

Provide the secrets as encrypted values in the CI system (for GitHub Actions use **Settings → Secrets and variables**). Before running `npm run build`, overwrite the production environment file:

```yaml
- name: Configure Angular environment
  run: |
    cat <<'EOF' > src/environments/environment.prod.ts
    import { EnvironmentConfig } from './environment';

    export const environment: EnvironmentConfig = {
      production: true,
      gaTrackingId: '${{ secrets.GA_TRACKING_ID }}',
      formspreeEndpoint: '${{ secrets.FORMSPREE_ENDPOINT }}',
      enableAnalytics: true,
      enableErrorTracking: true,
      sentryDsn: '${{ secrets.SENTRY_DSN }}',
      sentryTracesSampleRate: 0.5,
    };
    EOF
```

Adjust the sampling rate and toggles as needed per environment. Always keep the tracked `environment.prod.ts` file free from real credentials.
