import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IngredientsPageComponent } from './components/ingredients-page/ingredients-page.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'ingredients', component: IngredientsPageComponent, canActivate: [AuthGuard] },
    { path: 'add-recipe', component: RecipeFormComponent },
    { path: 'recipe/:id', component: RecipeDetailComponent },
    { path: '**', redirectTo: '/home' }
];
