import { IngredientRecipe } from './ingredient-recipe.model';

export interface Recipe {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
    ingredients: IngredientRecipe[];
}
