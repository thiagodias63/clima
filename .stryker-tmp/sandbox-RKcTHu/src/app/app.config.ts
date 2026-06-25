// @ts-nocheck
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNgBrutalism } from '@ng-brutalism/ui';
import { routes } from './app.routes';
import { mockCityInterceptor } from './interceptors/mock-city.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([mockCityInterceptor])),
    provideNgBrutalism({
      theme: {
        radius: '0px',

        borderWidth: '3px',
      },
    }),
  ],
};
