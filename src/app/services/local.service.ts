import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  constructor() { }

  public saveData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getData(key: string): string | null {
    return localStorage.getItem(key);
  }

  public removeData(key: string): void {
    localStorage.removeItem(key);
  }

  public clearData(): void {
    localStorage.clear();
  }

  public getParsedRecipes(key: string): Recipe[] {
    const items = this.getData(key);
    if (items) {
      try {
        const parsedItems = JSON.parse(items);
        if (Array.isArray(parsedItems)) {
          return parsedItems as Recipe[];
        } else {
          console.error('Parsed items are not an array');
          return [];
        }
      } catch (error) {
        console.error('Error parsing recipes from local storage:', error);
        return [];
      }
    }
    return [];
  }

  public saveRecipeData(key: string, recipes: Recipe[]): void {
    const recipesJSON = JSON.stringify(recipes);
    this.saveData(key, recipesJSON);
  }

  public addRecipe(key: string, recipe: Recipe): void {
    const recipes = this.getParsedRecipes(key);
    recipes.push(recipe);
    this.saveRecipeData(key, recipes);
  }
}
