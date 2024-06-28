import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { IngredientsService } from '../../services/ingredients.service';
import { Ingredient } from '../../models/ingredient.model';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IngredientRecipe } from '../../models/ingredient-recipe.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingredients-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './ingredients-input.component.html',
  styleUrl: './ingredients-input.component.scss',
  providers: [
    IngredientsService
  ]
})

export class IngredientsInputComponent {
  @Output() addIngredientEvent = new EventEmitter<IngredientRecipe>();
  options: Ingredient[] = [];
  
  constructor(
    protected ingredientService: IngredientsService,
  ){}

  newIngredient: IngredientRecipe = { id: 0, ingredient: {id: 0, name: ''}, quantity: 7 }

  ingredientForm: FormGroup = new FormGroup({
    quantity: new FormControl(this.newIngredient.quantity, Validators.required),
    ingredient: new FormControl(this.newIngredient.ingredient, Validators.required),
  });


  ngOnInit(){
    this.options = this.ingredientService.getAll();
  }
  
  addIngredient(): void{
    this.newIngredient = this.ingredientForm.value;
    this.addIngredientEvent.emit(this.newIngredient);
    this.ingredientForm.reset();
  }
}
