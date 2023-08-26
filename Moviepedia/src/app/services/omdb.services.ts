import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OmdbService {
  private apiUrl = 'http://www.omdbapi.com/';
  private apiKey = 'c57c4b67';

  constructor(private http: HttpClient) {}

  getMovieByTitle(Title: string): Observable<any> {
    const params = new HttpParams().set('apikey', this.apiKey).set('t', Title);

    return this.http.get(this.apiUrl, { params });
  }
}
