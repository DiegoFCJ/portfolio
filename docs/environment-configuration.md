# Environment configuration

This document summarises how analytics, the contact form and monitoring are configured across environments.

## Files

| File | Description |
| --- | --- |
| `src/environments/environment.ts` | Local defaults used by `ng serve` and unit tests. |
| `src/environments/environment.prod.ts` | Values applied automatically by `ng build --configuration production`. |

## Available options

```ts
export const environment = {
  production: false,
  formspreeEndpoint: '',
  analytics: {
    enabled: false,
    gaTrackingId: '',
    requireConsent: true,
    cookieConsentKey: 'portfolio-cookie-consent',
  },
  monitoring: {
    enabled: false,
    sentryDsn: '',
    tracesSampleRate: 0,
  },
};
```

- **`formspreeEndpoint`** – POST endpoint used by `EmailService`. Leave blank in development to log payloads instead of submitting them.
- **`analytics`** – Controls Google Analytics script injection. The service loads the tracking library only when `enabled` is `true`, a `gaTrackingId` is configured and the cookie consent stored under `cookieConsentKey` is either `granted` or `true`.
- **`monitoring`** – Enables Sentry reporting. `tracesSampleRate` represents the fraction of events to forward (from `0` to `1`).

## Local development

1. Copy the default file if you need a dedicated configuration:
   ```bash
   cp src/environments/environment.ts src/environments/environment.local.ts
   ```
2. Point the Angular CLI to your custom file when necessary:
   ```bash
   ng serve --configuration development --file-replacements '{"src/environments/environment.ts":"src/environments/environment.local.ts"}'
   ```

## CI/CD pipelines

Store secrets (Formspree token, GA measurement ID, Sentry DSN) as repository or organisation secrets. Before calling `ng build --configuration production`, patch `src/environments/environment.prod.ts`, for example:

```bash
cat <<'ENV' > src/environments/environment.prod.ts
export const environment = {
  production: true,
  formspreeEndpoint: "$FORMSPREE_ENDPOINT",
  analytics: {
    enabled: true,
    gaTrackingId: "$GA_TRACKING_ID",
    requireConsent: true,
    cookieConsentKey: "portfolio-cookie-consent",
  },
  monitoring: {
    enabled: true,
    sentryDsn: "$SENTRY_DSN",
    tracesSampleRate: 0.2,
  },
};
ENV
```

This can be implemented as a dedicated step in the GitHub Actions workflow before the build or deploy jobs run.
