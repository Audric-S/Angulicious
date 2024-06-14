import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { RECIPES } from "../data/recipe.stub";

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [];

    constructor(){
        this.recipes = RECIPES;
    }

    getAll(): Recipe[]{
        return this.recipes;
    }


}