import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { OmdbService } from 'src/app/services/omdb.services';
import { Movie } from 'src/app/film/movies.film';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  filteredMovies: Movie[] = [];
  searchTerm = new FormControl('');
  selectedMovie: Movie | undefined;
  movieTitles: string[] = [];
  genres: string[] = []; //aqui defino array de generos
  selectedGenre: string | null = null;
  currentPage: number = 1; //contador de pagina
  directors: string[] = [];
  years: number[] = [];
  movies: Movie[] = [];
  selectedDirector: string | null = null;
  selectedYear: number | null = null;

  @ViewChild('genreMenu') genreMenu!: MatMenuTrigger;

  constructor(private http: HttpClient, private omdbService: OmdbService) {
    this.initGenres();
    this.initDirectors();
    this.initYears();
  }

  initGenres() {
    this.genres = [
      'Action',
      'Adventure',
      'Comedy',
      'Family',
      'Fantasy',
      'Romance',
    ];
  }
  initDirectors() {
    this.directors = ['Sofia Copolla', 'Tarantino'];
  }
  initYears() {
    this.years = [2023, 2022, 2021, 2020];
  }

  filterByGenre(genre: string | null) {
    const searchTerm = this.searchTerm.value;
    this.selectedGenre = genre;
    if (genre === 'all') {
      this.movies = []; //limpiar resultados si se selecciona all
      this.searchTerm.setValue(''); //borra la data de busqueda
    } else {
      this.currentPage = 1; // Reiniciar el contador de página
      this.loadMoviesByFilter(); //cargar peliculas del genero que selecciono
    }
  }

  filterByDirector(director: string) {
    this.selectedDirector = director;
    this.currentPage = 1;
    this.loadMoviesByFilter();
  }

  filterByYear(year: number) {
    this.selectedYear = year;
    this.currentPage = 1;
    this.loadMoviesByFilter();
  }

  loadMoviesByFilter() {
    this.movies = []; //limpiar busqueda

    if (!this.selectedGenre && !this.selectedDirector && this.selectedYear) {
      //si no se seleccionada nada
      return;
    }

    let apiUrl = 'http://www.omdbapi.com/?apikey=c57c4b67';
    if (this.selectedGenre) {
      apiUrl += `&s=${this.selectedGenre}&page=${this.currentPage}`;
    } else if (this.selectedDirector) {
      apiUrl += `&director=${this.selectedDirector}&page=${this.currentPage}`;
    } else if (this.selectedYear) {
      apiUrl += `&y=${this.selectedYear}&page=${this.currentPage}`;
    }

    this.http.get<any>(apiUrl).subscribe((data) => {
      if (data.Search) {
        this.movies = data.Search;
      }
    });
  }

  loadNextPage() {
    this.currentPage++; // Incrementar el contador de página
    this.loadMoviesByFilter(); // Cargar películas de la siguiente página
  }

  onSearchInput() {
    this.selectedMovie = undefined; //borra la data
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
    // console.log('Search term:', searchTerm);
    if (searchTerm) {
      this.http
        .get<any>(`http://www.omdbapi.com/?apikey=c57c4b67&t=${searchTerm}`)
        .subscribe((data) => {
          console.log('API response:', data);
          this.movies = [data];
          // this.movies = data.Search || [];
          // console.log('Number of movies:', this.movies.length);
        });
    }
  }
  selectMovie(movie: Movie) {
    console.log('Selected movie:', movie);
    this.selectedMovie = movie;
  }

  openGenreMenu() {
    this.clearAllData();
    this.genreMenu.closeMenu();
  }

  clearAllData() {
    this.searchTerm.setValue(''); //borro la busqueda
    this.selectedMovie = undefined; //borro la pelicula seleccionada
    this.movies = []; //borro los resultados de búsqueda
    this.selectedGenre = null; //borro seleccion genre
    this.selectedDirector = null; //borro seleccion director
    this.selectedYear = null; //borro selection year
  }
}
