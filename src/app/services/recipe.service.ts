import { Injectable } from '@angular/core';
import { RECIPES } from '../data/recipe.stub';
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

  getRecipes(): Recipe[] {
    const recipesJson = localStorage.getItem('recipes');
    return recipesJson ? JSON.parse(recipesJson) : [];
  }

  getRecipeById(id: string): Recipe | undefined {
    const recipes = this.getRecipes();
    return recipes.find(recipe => recipe.id === id);
  }
}
