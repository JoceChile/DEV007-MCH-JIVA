import { Component, Input, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Movie } from './film/movies.film';
import { OmdbService } from './services/omdb.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Moviepedia';
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchTerm = new FormControl('');
  selectedMovie: Movie | undefined;
  movieTitles: string[] = [];
  genres: string[] = []; //aqui defino array de generos
  selectedGenre: string | null = null;
  currentPage: number = 1; //contador de pagina

  @ViewChild('genreMenu') genreMenu!: MatMenuTrigger;

  constructor(private http: HttpClient, private omdbService: OmdbService) {
    this.initGenres();
  }

  initGenres() {
    this.genres = [
      'Adventure, Family, Fantasy',
      'Action',
      'Adventure',
      'Comedy',
      'Romance',
    ];
  }

  filterByGenre(genre: string | null) {
    const searchTerm = this.searchTerm.value;
    this.selectedGenre = genre;
    if (genre === 'all') {
      this.movies = []; //limpiar resultados si se selecciona all
    } else {
      this.currentPage = 1; // Reiniciar el contador de página
      this.loadMoviesByGenre(); //cargar peliculas del genero que selecciono
    }
  }

  loadMoviesByGenre() {
    if (this.selectedGenre === null) {
      return; // No hay género seleccionado, no cargar películas
    }
    this.http
      .get<any>(
        `http://www.omdbapi.com/?apikey=c57c4b67&s=${this.selectedGenre}&page=${this.currentPage}`
      )
      .subscribe((data) => {
        if (data.Search) {
          this.movies = data.Search;
        }
      });
  }
  loadNextPage() {
    this.currentPage++; // Incrementar el contador de página
    this.loadMoviesByGenre(); // Cargar películas de la siguiente página
  }

  onSearchInput() {
    this.selectedMovie = undefined; //borra la data
    this.movies = []; //limpiar busqueda
    if (!this.searchTerm.value?.trim()) {
      this.movies = []; //limpiar busqueda
    }
  }
  searchMovies() {
    const searchTerm = this.searchTerm.value;
    // console.log('Search term:', searchTerm);
    if (searchTerm) {
      this.http
        .get<any>(`http://www.omdbapi.com/?apikey=c57c4b67&t=${searchTerm}`)
        .subscribe((data) => {
          console.log('API response:', data);
          this.movies = [data];
          // this.movies = data.Search || [];
          console.log('Number of movies:', this.movies.length);
        });
    }
  }
  selectMovie(movie: Movie) {
    console.log('Selected movie:', movie);
    this.selectedMovie = movie;
  }

  onSearch(event: any) {
    const searchTerm = event.term;
    this.omdbService.getMovieByTitle(searchTerm).subscribe((title) => {
      this.movieTitles = title;
    });
  }

  openGenreMenu() {
    this.genreMenu.openMenu();
  }
}
