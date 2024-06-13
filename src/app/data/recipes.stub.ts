import { Recipe } from "../models/recipe.model";

export const RECIPES: Recipe[] = [
    {
        id: 1,
        nom: 'Recette 1',
        description: 'Description de la recette 1',
        ingredients: [{ id: 2, ingredient: { id: 2, name: 'Piment' }, quantity: 3 }]
      }
];