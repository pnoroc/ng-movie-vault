import { Component, input, output } from '@angular/core';
import { Movie } from '@org/movies-models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'mv-movies-list-item',
  imports: [DatePipe],
  templateUrl: './movies-list-card.component.html',
  styleUrl: './movies-list-card.component.scss',
})
export class MoviesListCardComponent {
  movie = input<Movie>();
  cardClick = output<void>();
}
