import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IngredientsPageComponent } from './components/ingredients-page/ingredients-page.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'ingredients', component: IngredientsPageComponent },
    { path: 'add-recipe', component: RecipeFormComponent },
    { path: '**', redirectTo: '/home' }
];
