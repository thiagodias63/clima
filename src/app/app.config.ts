import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgBrutalism } from '@ng-brutalism/ui';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideNgBrutalism({
			theme: {
				radius: '0px',

				borderWidth: '3px',
			},
		}),
	],
};
