import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientsService } from '../../services/ingredients.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { IngredientFormComponent } from '../ingredient-form/ingredient-form.component';
import { IngredientEditComponent } from "../ingredient-edit/ingredient-edit.component";

@Component({
    selector: 'app-ingredients-page',
    standalone: true,
    templateUrl: './ingredients-page.component.html',
    styleUrls: ['./ingredients-page.component.scss'],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        MatLabel,
        IngredientFormComponent,
        IngredientEditComponent
    ]
})
export class IngredientsPageComponent implements OnInit {
  ingredients: Ingredient[] = [];
  updatedIngredient: Ingredient = { id: 0, name: '', description: '' };
  showIngredientForm: boolean = false;
  showEditForm: boolean = false;
  selectedIngredient!: Ingredient;

  constructor(private readonly ingredientsService: IngredientsService) { }

  ngOnInit(): void {
    this.loadIngredients();
  }

  toggleIngredientForm() {
    this.showIngredientForm = !this.showIngredientForm;
    this.showEditForm = false;
  }

  openEditForm(ingredient: Ingredient): void {
    this.selectedIngredient = { ...ingredient }; 
    this.showEditForm = true; 
    this.showIngredientForm = false;
  }

  loadIngredients(): void {
    this.ingredientsService.getAll().subscribe(
      (ingredients) => {
        this.ingredients = ingredients;
      },
      (error) => {
        console.error('Erreur lors du chargement des ingrédients:', error);
      }
    );
  }

  deleteIngredient(id: number): void {
    this.ingredientsService.deleteIngredient(id).subscribe(
      () => {
        this.ingredients = this.ingredients.filter(ingredient => ingredient.id !== id);
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'ingrédient:', error);
      }
    );
  }

  updateIngredient(id: number, updatedIngredient: Ingredient): void {
    this.ingredientsService.updateIngredient(id, updatedIngredient).subscribe(
      (ingredient) => {
        const index = this.ingredients.findIndex(i => i.id === id);
        if (index !== -1) {
          this.ingredients[index] = ingredient;
        }
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'ingrédient:', error);
      }
    );
  }

  onIngredientAdded(addedIngredient: Ingredient): void {
    this.showIngredientForm = false;
    this.loadIngredients();
  }

  onIngredientSaved(editedIngredient: Ingredient): void {
    this.showEditForm = false;
    const index = this.ingredients.findIndex(ingredient => ingredient.id === editedIngredient.id);
    if (index !== -1) {
      this.ingredients[index] = editedIngredient;
    }
  }
}
