import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsMoviesComponent } from './components/details-movies/details-movies.component';
import { FooterComponent } from './components/footer/footer.component';
import { GalleryMoviesComponent } from './components/gallery-movies/gallery-movies.component';
import { MenuComponent } from './components/menu/menu.component';
import { MovieComponent } from './components/movies/movies.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: 'details-movies', component: DetailsMoviesComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'gallery-movies', component: GalleryMoviesComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'movies', component: MovieComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
