import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/film/movies.film';

@Component({
  selector: 'app-movie',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MovieComponent {
  @Input() movie!: Movie;
}
