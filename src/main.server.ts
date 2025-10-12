import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { environment } from './environments/environment';
import { configureErrorTracking } from './app/services/error-tracking.config';

configureErrorTracking(environment);

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
