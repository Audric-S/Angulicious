import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { INGREDIENTS } from '../data/ingredients.stub';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private ingredients: Ingredient[] = [];

    constructor(){
        this.ingredients = INGREDIENTS;
    }

    getAll(): Ingredient[]{
        return this.ingredients;
    }
}
