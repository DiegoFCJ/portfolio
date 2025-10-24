import { EnvironmentConfig } from './environment.config';

export const environment: EnvironmentConfig = {
  production: false,
  gaTrackingId: '',
  formspreeEndpoint: '',
  enableAnalytics: false,
};

export type { EnvironmentConfig } from './environment.config';
