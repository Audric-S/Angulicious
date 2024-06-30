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
import * as uuid from 'uuid';
import { LocalService } from '../../services/local.service';
import { ingredientsValidator } from '../../validators/ingredientsValidator';

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
    CommonModule,
  ],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent {
  @Output() addRecipeEvent = new EventEmitter<Recipe>();
  ingredientsRecipe: IngredientRecipe[] = [];
  displayedColumns: string[] = ['name', 'quantity', 'actions'];
  dataSource: MatTableDataSource<IngredientRecipe> = new MatTableDataSource<IngredientRecipe>();
  idForNewRecipe: string = uuid.v4();
  defaultImageUrl: string = 'https://placehold.co/600x400?text=Hello+World';

  newRecipe: Recipe = { id: '', name: '', imageUrl: '', description: '', ingredients: [] };

  recipeForm: FormGroup = new FormGroup({
    name: new FormControl(this.newRecipe.name, Validators.required),
    description: new FormControl(this.newRecipe.description, Validators.required),
    id: new FormControl(this.idForNewRecipe)
  }, { validators: ingredientsValidator(this.ingredientsRecipe) });

  constructor(
    protected localService: LocalService
  ){}

  addRecipe() {
    this.newRecipe = {
      ...this.recipeForm.value,
      imageUrl: this.newRecipe.imageUrl || this.defaultImageUrl,
      ingredients: this.ingredientsRecipe
    };
    this.localService.addRecipe('recipes', this.newRecipe);

    this.addRecipeEvent.emit(this.newRecipe);
    this.recipeForm.reset();
    this.ingredientsRecipe = [];
    this.dataSource.data = this.ingredientsRecipe;
    this.newRecipe.imageUrl = '';
  }

  addIngredient(event: IngredientRecipe) {
    const existingIngredientIndex = this.ingredientsRecipe.findIndex(
      ing => ing.ingredient.id === event.ingredient.id
    );

    if (existingIngredientIndex !== -1) {
      this.ingredientsRecipe[existingIngredientIndex].quantity += event.quantity;
    } else {
      this.ingredientsRecipe.push(event);
    }

    this.dataSource.data = [...this.ingredientsRecipe];
    this.recipeForm.updateValueAndValidity();
  }

  removeIngredient(index: number) {
    if (index >= 0 && index < this.ingredientsRecipe.length) {
      this.ingredientsRecipe.splice(index, 1);
      this.dataSource.data = [...this.ingredientsRecipe];
      this.recipeForm.updateValueAndValidity();
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newRecipe.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
