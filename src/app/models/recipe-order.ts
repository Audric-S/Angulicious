import { Recipe } from "./recipe.model";

export interface RecipeOrder {
  recipe: Recipe;
  quantity: number;
}