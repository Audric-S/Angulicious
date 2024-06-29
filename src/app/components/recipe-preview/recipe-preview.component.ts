import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-preview',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './recipe-preview.component.html',
  styleUrl: './recipe-preview.component.scss'
})
export class RecipePreviewComponent {
  @Input() recipe: Recipe | undefined;
  @Output() orderClicked: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  addToCart() {
    if (this.recipe) {
      this.orderClicked.emit(this.recipe);
    }
  }
}