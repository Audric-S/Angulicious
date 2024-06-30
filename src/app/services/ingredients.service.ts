import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private ingredients: Ingredient[] = [];

  private apiUrl: string = "https://664ba07f35bbda10987d9f99.mockapi.io/api/ingredients";

  constructor(private http: HttpClient) {
    this.loadFromApi();
  }

  getAll(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.apiUrl).pipe(
      tap((ingredients) => this.ingredients = ingredients),
      catchError(this.handleError<Ingredient[]>('getAll', []))
    );
  }

  loadFromApi(): void {
    this.http.get<Ingredient[]>(this.apiUrl).subscribe((ingredients_api: Ingredient[]) => {
      this.ingredients = ingredients_api;
    });
  }

  deleteIngredient(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(() => this.ingredients = this.ingredients.filter(ingredient => ingredient.id !== id)),
      catchError(this.handleError<any>('deleteIngredient'))
    );
  }

  updateIngredient(id: number, ingredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.apiUrl}/${id}`, ingredient).pipe(
      tap((updatedIngredient: Ingredient) => {
        const index = this.ingredients.findIndex(i => i.id === id);
        if (index !== -1) {
          this.ingredients[index] = updatedIngredient;
        }
      }),
      catchError(this.handleError<Ingredient>('updateIngredient'))
    );
  }

  addIngredient(newIngredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.apiUrl, newIngredient).pipe(
      tap((ingredient: Ingredient) => this.ingredients.push(ingredient)),
      catchError(this.handleError<Ingredient>('addIngredient'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
