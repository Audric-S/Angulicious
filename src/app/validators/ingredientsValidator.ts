import { AbstractControl, ValidatorFn } from '@angular/forms';
import { IngredientRecipe } from '../models/ingredient-recipe.model';

export function ingredientsValidator(ingredients: IngredientRecipe[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    return ingredients.length > 0 ? null : { 'noIngredients': true };
  };
}
