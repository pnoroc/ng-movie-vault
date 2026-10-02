import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { TMDB_CONFIG, TmdbConfig } from '../tmdb.config';

export const tmdbInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const tmdbConfig: TmdbConfig = inject(TMDB_CONFIG);

  if (!req.url.startsWith(tmdbConfig.apiUrl)) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: { Authorization: `Bearer ${tmdbConfig.token}` },
    }),
  );
};
