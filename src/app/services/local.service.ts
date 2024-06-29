import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  public getParsedRecipes(key: string) {
    let items = this.getData(key);
    if (items) {
      return JSON.parse(items) as Recipe[];
    } 
    return [];
  }

  public saveRecipeData(key: string, recipes: Recipe[]) {
    const recipesJSON = JSON.stringify(recipes);
    this.saveData(key, recipesJSON);
  }

  public addRecipe(key: string, recipe: Recipe) {
    let recipes = this.getParsedRecipes(key);
    recipes.push(recipe);
    this.saveRecipeData(key, recipes);
  }
}
