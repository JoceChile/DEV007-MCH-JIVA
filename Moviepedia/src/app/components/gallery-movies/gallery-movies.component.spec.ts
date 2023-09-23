import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryMoviesComponent } from './gallery-movies.component';

describe('GalleryMoviesComponent', () => {
  let component: GalleryMoviesComponent;
  let fixture: ComponentFixture<GalleryMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryMoviesComponent]
    });
    fixture = TestBed.createComponent(GalleryMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
