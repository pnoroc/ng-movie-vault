import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'genreNames' })
export class GenreNamesPipe implements PipeTransform {
  transform(ids: number[] | null | undefined, genres: ReadonlyMap<number, string>, sep = ', '): string {
    if (!ids?.length) return '';
    return ids.map(id => genres.get(id)).filter(Boolean).join(sep);
  }
}
