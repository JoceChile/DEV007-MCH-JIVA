import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [AppComponent],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Moviepedia'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Moviepedia');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('h1');
    expect(titleElement?.textContent).toContain('Welcome to Moviepedia');
  });

  it('should fetch and display movie details', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const fakeResponse = {
      Title: 'The Goonies',
      Year: 1985,
      Rated: 'PG',
    };

    app.searchTerm.setValue('The%20Goonies');
    app.searchMovies();

    const req = httpTestingController.expectOne(
      `http://www.omdbapi.com/?apikey=c57c4b67&t=The%20Goonies`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(fakeResponse);

    expect(app.movies.length).toBe(1);
    expect(app.movies[0].Year).toBe(1985);
  });
});
