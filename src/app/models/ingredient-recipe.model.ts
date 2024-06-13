import { Ingredient } from './ingredient.model';

export interface IngredientRecipe {
  id: number;
  ingredient: Ingredient;
  quantity: number;
}
