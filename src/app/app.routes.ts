import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IngredientsPageComponent } from './components/ingredients-page/ingredients-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'ingredients', component: IngredientsPageComponent },
    { path: '**', redirectTo: '/home' }
];
