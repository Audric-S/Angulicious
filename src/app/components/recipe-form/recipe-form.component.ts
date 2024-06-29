import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Recipe } from '../../models/recipe.model';
import { IngredientRecipe } from '../../models/ingredient-recipe.model';
import { IngredientsInputComponent } from '../ingredients-input/ingredients-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    IngredientsInputComponent,
    CommonModule
  ],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent {
  @Output() addRecipeEvent = new EventEmitter<Recipe>();
  ingredientsRecipe: IngredientRecipe[] = [];
  displayedColumns: string[] = ['name', 'quantity', 'actions'];
  dataSource: MatTableDataSource<IngredientRecipe> = new MatTableDataSource<IngredientRecipe>();

  newRecipe: Recipe = { id: 0, name: '', imageUrl: '', description: '', ingredients: [] };

  recipeForm: FormGroup = new FormGroup({
    name: new FormControl(this.newRecipe.name, Validators.required),
    description: new FormControl(this.newRecipe.description, Validators.required),
  });

  addRecipe() {
    this.newRecipe = {
      ...this.recipeForm.value,
      ingredients: this.ingredientsRecipe
    };
    this.addRecipeEvent.emit(this.newRecipe);
    this.recipeForm.reset();
    this.ingredientsRecipe = [];
    this.dataSource.data = this.ingredientsRecipe;
  }

  addIngredient(event: IngredientRecipe) {
    this.ingredientsRecipe.push(event);
    this.dataSource.data = [...this.ingredientsRecipe];
  }

  removeIngredient(index: number) {
    if (index >= 0 && index < this.ingredientsRecipe.length) {
      this.ingredientsRecipe.splice(index, 1);
      this.dataSource.data = [...this.ingredientsRecipe];
    }
  }
}
