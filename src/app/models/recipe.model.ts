import { IngredientRecipe } from './ingredient-recipe.model';

export interface Recipe {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    ingredients: IngredientRecipe[];
}
