import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withXsrfConfiguration } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(MatIconModule),
    provideHttpClient(
      withFetch(), // Opcional, usa fetch em vez de XHR
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',  // Nome do cookie gerado pelo Laravel Sanctum
        headerName: 'X-XSRF-TOKEN' // Header que o Laravel espera
      })
    )
  ]
};
