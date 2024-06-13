import { Injectable } from '@angular/core';
import { RECIPES } from '../data/recipes.stub';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: any[] = [];

  constructor(){
    this.recipes = RECIPES;

}

getAll(): Recipe[]{
    return this.recipes;
}

  addData(item: any): void {
    this.recipes.push(item);
  }
}
