import { IngredientRecipe } from './ingredient-recipe.model';

export interface Recipe {
    id: number;
    nom: string;
    description: string;
    ingredients: IngredientRecipe[];
}
