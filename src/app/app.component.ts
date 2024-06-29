import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { CommonModule } from '@angular/common';
import { Recipe } from './models/recipe.model';
import { LocalService } from './services/local.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    RecipesListComponent,
    NavbarComponent,
    CommonModule,
    RecipeFormComponent
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angulicious';
  showForm: boolean = false;

  constructor(
    private readonly localService: LocalService
  ){

  }


  toggleForm() {
    this.showForm = !this.showForm;
  }

  addRecipe($event: Recipe): void {
    console.log($event)
    this.localService.saveRecipeData('recipes', $event)
    this.toggleForm();
  }
}
