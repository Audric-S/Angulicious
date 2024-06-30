import { Component } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientsService } from '../../services/ingredients.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ingredients-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './ingredients-page.component.html',
  styleUrl: './ingredients-page.component.scss'
})
export class IngredientsPageComponent {

  ingredients: Ingredient[] = [];
  updatedIngredient: Ingredient = { id: 0, name: '', description: '' };

  constructor(private readonly ingredientsService: IngredientsService) { }

  ngOnInit(): void {
    this.loadIngredients();
  }

  loadIngredients(): void {
    this.ingredients = this.ingredientsService.getAll();
  }

  deleteIngredient(id: number): void {
    this.ingredientsService.deleteIngredient(id).subscribe(
      () => {
        // Filtrer l'ingrédient supprimé de la liste
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
        // Mettre à jour l'ingrédient dans la liste
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
}
