import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { INGREDIENTS } from '../data/ingredients.stub';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private ingredients: Ingredient[] = [];

  private apiUrl : string = "https://664ba07f35bbda10987d9f99.mockapi.io/api/ingredients";

  constructor(private http: HttpClient){
    this.loadFromApi()
    // this.ingredients = INGREDIENTS; // Stub ingredients
  }

  getAll(): Ingredient[]{
    return this.ingredients;
  }


  loadFromApi(): void{
      this.http.get<Ingredient[]>(this.apiUrl).subscribe((ingredients_api: Ingredient[]) => {
          ingredients_api.map((ingredient: Ingredient) => this.addIngredient(ingredient));
      });
  }

  addIngredient(ingredient: Ingredient): void{
    this.ingredients.push(ingredient);
  }

  sendIngredientApi(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.apiUrl, ingredient);
  }

  deleteIngredient(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
