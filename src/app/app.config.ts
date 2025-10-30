import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  LOCALE_ID,
} from '@angular/core';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideAngularSvgIcon } from 'angular-svg-icon';

import { contentTypeInterceptor } from '@core/interceptor/contentType.interceptor';
import { routes } from './app.routes';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    // provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAngularSvgIcon(),
    provideHttpClient(withFetch(), withInterceptors([contentTypeInterceptor])),
    { provide: LOCALE_ID, useValue: 'es' },
  ],
};

// import { ApplicationConfig, importProvidersFrom } from '@angular/core';
// import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { provideClientHydration, BrowserModule } from '@angular/platform-browser';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { contentTypeInterceptor } from '@core/interceptor/contentType.interceptor';
// import { AppRoutingModule } from './app-routing.module';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     importProvidersFrom(BrowserModule, AppRoutingModule),
//     provideAnimations(),
//     provideClientHydration(),
//     provideHttpClient(withInterceptors([contentTypeInterceptor])),
//   ],
// };
