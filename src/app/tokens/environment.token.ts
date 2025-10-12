import { InjectionToken } from '@angular/core';
import { EnvironmentConfig } from '../../environments/environment';

export const APP_ENVIRONMENT = new InjectionToken<EnvironmentConfig>('APP_ENVIRONMENT');
