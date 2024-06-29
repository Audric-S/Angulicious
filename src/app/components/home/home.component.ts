import { Component } from '@angular/core';
import { RecipesListComponent } from '../recipes-list/recipes-list.component';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipesListComponent,
    RecipeFormComponent,
    CommonModule,
    MatIcon
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showForm: boolean = false;
  currentRecipeOrder: Recipe[] = []

  eventsSubject: Subject<void> = new Subject<void>();

  emitEventToChild() {
    this.eventsSubject.next();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
  
  addToCart(recipe: Recipe){
    this.currentRecipeOrder.push(recipe)
  }

  addRecipe(): void {
    this.toggleForm();
    this.emitEventToChild();
  }

  

  get itemCount(): number {
    return this.currentRecipeOrder.length;
  }
}
