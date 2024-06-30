import { Component } from '@angular/core';
import { RecipesListComponent } from '../recipes-list/recipes-list.component';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { MatIcon } from '@angular/material/icon';
import { RecipeOrder } from '../../models/recipe-order';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipesListComponent,
    RecipeFormComponent,
    CommonModule,
    MatIcon
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showForm: boolean = false;
  currentRecipeOrder: RecipeOrder[] = [];
  private localStorageKeyCart = 'cart';

  eventsSubject: Subject<void> = new Subject<void>();

  constructor(private localService: LocalService) {}

  ngOnInit() {
    this.loadCart();
  }

  emitEventToChild() {
    this.eventsSubject.next();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
  

  addToCart(recipe: Recipe) {
    const existingOrder = this.currentRecipeOrder.find(order => order.recipe.id === recipe.id);

    if (existingOrder) {
      existingOrder.quantity += 1;
    } else {
      this.currentRecipeOrder.push({ recipe: recipe, quantity: 1 });
    }

    this.saveCart();
  }

  removeFromCart(recipe: Recipe) {
    const existingOrder = this.currentRecipeOrder.find(order => order.recipe.id === recipe.id);

    if (existingOrder) {
      existingOrder.quantity -= 1;
      if (existingOrder.quantity === 0) {
        this.currentRecipeOrder = this.currentRecipeOrder.filter(order => order.recipe.id !== recipe.id);
      }
    }

    this.saveCart();
  }

  saveCart() {
    this.localService.saveRecipeOrderData(this.localStorageKeyCart, this.currentRecipeOrder);
  }

  loadCart() {
    this.currentRecipeOrder = this.localService.getParsedRecipeOrders(this.localStorageKeyCart);
  }

  addRecipe(): void {
    this.toggleForm();
    this.emitEventToChild();
  }
}
