import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { Recipe } from '../../models/recipe.model';
import { IngredientsInputComponent } from '../ingredients-input/ingredients-input.component';
import { IngredientRecipe } from '../../models/ingredient-recipe.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [ ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIcon, IngredientsInputComponent, CommonModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent {
  @Output() addRecipeEvent = new EventEmitter<Recipe>();
  ingredientsRecipe: IngredientRecipe[] = []

  newRecipe: Recipe = { id: 0, name: '', imageUrl:'', description: '', ingredients: [] }

  recipeForm: FormGroup = new FormGroup({
    name: new FormControl(this.newRecipe.name, Validators.required),
    description: new FormControl(this.newRecipe.description, Validators.required),
  });

  addRecipe() {
    this.newRecipe = this.recipeForm.value;
    this.addRecipeEvent.emit(this.newRecipe);
    this.recipeForm.reset();
  }

  addIngredient($event: IngredientRecipe){
   this.ingredientsRecipe.push($event);
  }
}



