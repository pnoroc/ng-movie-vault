import { Component, input, InputSignal, model } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '@org/movies-models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'mv-feature-movie-details',
  imports: [RouterLink, DatePipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent {
  movie: InputSignal<Movie | undefined> = input<Movie | undefined>();
  protected readonly model = model;
}
