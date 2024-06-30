import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Recipe } from '../../models/recipe.model';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-preview',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './recipe-preview.component.html',
  styleUrl: './recipe-preview.component.scss'
})
export class RecipePreviewComponent {
  @Input() recipe: Recipe | undefined;
  @Output() orderClicked: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  constructor(private readonly router: Router) {}

  addToCart() {
    if (this.recipe) {
      this.orderClicked.emit(this.recipe);
    }
  }

  viewDetails() {
    if (this.recipe) {
      this.router.navigate(['/recipe', this.recipe.id]);
    }
  }
}