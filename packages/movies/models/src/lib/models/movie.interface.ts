import { MovieGenre } from './movie-genre.interface';

export interface Movie {
  id: number;
  description?: string;
  favorite_count?: number;
  item_count?: number;
  iso_639_1?: string;
  list_type?: string;
  name?: string;
  poster_path?: string;
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  genres?: MovieGenre[];
}
