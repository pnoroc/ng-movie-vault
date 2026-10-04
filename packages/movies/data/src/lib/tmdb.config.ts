import { InjectionToken } from '@angular/core';

export interface TmdbConfig { apiUrl: string; imageUrl: string; token: string; }
export const TMDB_CONFIG = new InjectionToken<TmdbConfig>('TMDB_CONFIG');
