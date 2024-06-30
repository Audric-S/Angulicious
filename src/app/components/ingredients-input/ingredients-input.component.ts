import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { IngredientsService } from '../../services/ingredients.service';
import { Ingredient } from '../../models/ingredient.model';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IngredientRecipe } from '../../models/ingredient-recipe.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredients-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './ingredients-input.component.html',
  styleUrls: ['./ingredients-input.component.scss'],
  providers: [
    IngredientsService
  ]
})
export class IngredientsInputComponent implements OnInit {
  @Output() addIngredientEvent = new EventEmitter<IngredientRecipe>();
  options: Ingredient[] = [];
  
  newIngredient: IngredientRecipe = { id: 0, ingredient: {id: 0, name: '', description:''}, quantity: 0 };

  ingredientForm: FormGroup = new FormGroup({
    quantity: new FormControl(this.newIngredient.quantity, [Validators.required, Validators.min(1)]),
    ingredient: new FormControl(this.newIngredient.ingredient, Validators.required),
  });

  constructor(protected ingredientService: IngredientsService) {}

  ngOnInit() {
    this.loadOptions();
  }
  
  loadOptions() {
    this.ingredientService.getAll().subscribe(
      (ingredients: Ingredient[]) => {
        this.options = ingredients;
      },
      (error) => {
        console.error('Erreur lors du chargement des ingrédients:', error);
      }
    );
  }

  addIngredient(): void {
    if (this.ingredientForm.valid) {
      const ingredientValue = this.ingredientForm.value.ingredient;
      const quantityValue = this.ingredientForm.value.quantity;

      const selectedIngredient = this.options.find(option => option.id === ingredientValue.id);
      if (selectedIngredient) {
        this.newIngredient = {
          id: this.newIngredient.id,
          ingredient: selectedIngredient,
          quantity: quantityValue
        };
        this.addIngredientEvent.emit(this.newIngredient);
        this.ingredientForm.reset();
      } else {
        console.error('Ingrédient sélectionné non trouvé dans les options.');
      }
    }
  }
}
