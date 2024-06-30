import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const recipeId = params.get('id');
      if (recipeId) {
        this.recipe = this.recipeService.getRecipeById(recipeId);
      }
    });
  }

  navigateBack(): void {
    this.router.navigate(['/']);
  }
}
