import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Movie } from 'src/app/film/movies.film';
import { OmdbService } from 'src/app/services/omdb.services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  title = 'Moviepedia';
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchTerm = new FormControl('');
  selectedMovie: Movie | undefined;
  movieTitles: string[] = [];
  selectedGenre: string | null = null;
  selectedDirector: string | null = null;
  selectedYear: number | null = null;
  searchError: string | null = null;

  constructor(private http: HttpClient, private omdbService: OmdbService) {}

  onSearchInput() {
    this.selectedMovie = undefined; //borra la data
    this.searchError = null;
    this.movies = []; //limpiar busqueda
    if (!this.searchTerm.value?.trim()) {
      this.movies = []; //limpiar busqueda
    }
  }

  performSearch() {
    const searchText = this.searchTerm.value;
    if (searchText) {
      this.searchMovies();
    }
  }

  searchMovies() {
    const searchTerm = this.searchTerm.value;
    if (searchTerm) {
      this.http
        .get<any>(`http://www.omdbapi.com/?apikey=c57c4b67&t=${searchTerm}`)
        .subscribe((data) => {
          console.log('API response:', data);
          if (data.Error) {
            this.searchError = 'Not found.';
            this.movies = [];
          } else {
            this.searchError = null;
            this.movies = [data];
          }
        });
    }
  }

  selectMovie(movie: Movie) {
    console.log('Selected movie:', movie);
    this.selectedMovie = movie;
  }
}
