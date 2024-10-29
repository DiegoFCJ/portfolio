import { LOCALE_ID, enableProdMode, importProvidersFrom } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroupDirective } from '@angular/forms';
import localeIt from '@angular/common/locales/it';
import { routes } from './app/app-routing';
import { AppComponent } from './app/app.component';
import { AngularMaterialModule } from './app/utils';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
registerLocaleData(localeIt);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'it-IT' },
    { provide: FormGroupDirective },

    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule
    ),
    importProvidersFrom(AngularMaterialModule),

  ],
}).catch((err) => console.error(err));
