import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment';
import { TMDB_CONFIG, tmdbInterceptor } from '@org/mv-movies-data';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([tmdbInterceptor])),
    {
      provide: TMDB_CONFIG,
      useValue: {
        token: environment.tmdbToken,
        apiUrl: environment.tmdbApiUrl,
        imageUrl: environment.tmdbImageUrl,
        apiKey: environment.apiKey,
      },
    },
  ],
};
