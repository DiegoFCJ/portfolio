# Environment configuration

This document centralises the steps required to keep analytics, the contact form and error tracking configured across local development and CI builds.

## Available keys

Both `src/environments/environment.ts` (development) and `src/environments/environment.prod.ts` (production) expose the same interface:

- `gaTrackingId` – Google Analytics 4 tracking identifier (the measurement ID is public and ships with the client bundle).
- `formspreeEndpoint` – Formspree endpoint consumed by `EmailService` (public value; safe to expose but you may keep it outside git for convenience).
- `enableAnalytics` – Enables Google Analytics initialisation.
- `enableErrorTracking` – Activates Sentry error handlers.
- `sentryDsn` – Sentry DSN.
- `sentryTracesSampleRate` – Sampling rate applied to traces. Set this to `0` to disable tracing without affecting error reporting.

## Local development

1. Keep `enableAnalytics` and `enableErrorTracking` disabled while developing unless you want to interact with the real services.
2. When testing integrations locally, temporarily set the desired IDs in `environment.ts` or export them while running the generator:
   ```bash
   NG_APP_FORMSPREE_ENDPOINT="https://formspree.io/f/your-form" \
   NG_APP_GA_TRACKING_ID="G-XXXXXXX" \
   npm run configure:env:prod
   ```
   The script overwrites `environment.prod.ts`, so commit any changes only when updating the defaults.
   It also recognises the unprefixed variants (`FORMSPREE_ENDPOINT`, `GA_TRACKING_ID`, etc.) so you can reuse provider-specific environment names if you prefer.
3. The `EmailService` will fall back to a logged message when `formspreeEndpoint` is empty, allowing front-end validation to be tested without a live backend.

## Continuous integration

Provide the analytics and Sentry secrets as encrypted values in the CI system (for GitHub Actions use **Settings → Secrets and variables**). Although both identifiers are public once the site is deployed, keeping them in secrets ensures the repository stays environment-agnostic. Generate the production file during the build with `npm run configure:env:prod`:

```yaml
- name: Configure Angular environment
  run: npm run configure:env:prod
  env:
    NG_APP_GA_TRACKING_ID: ${{ secrets.GA_TRACKING_ID }}
    NG_APP_FORMSPREE_ENDPOINT: ${{ secrets.FORMSPREE_ENDPOINT }}
    NG_APP_ENABLE_ANALYTICS: 'true'
    NG_APP_ENABLE_ERROR_TRACKING: 'true'
    NG_APP_SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
    NG_APP_SENTRY_TRACES_SAMPLE_RATE: '0.5'
```

Adjust the sampling rate and toggles as needed per environment. You can swap the variables for the unprefixed equivalents (for example `GA_TRACKING_ID` or `SENTRY_DSN`) when your CI already exposes them with those names. Store the secrets in your CI system (Formspree can live there even if it is public) so each build writes a fresh `environment.prod.ts` without committing the real identifiers to git.
