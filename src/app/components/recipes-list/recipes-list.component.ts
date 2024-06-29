import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { RecipePreviewComponent } from '../recipe-preview/recipe-preview.component';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { LocalService } from '../../services/local.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    RecipePreviewComponent,
    CommonModule,
  ],
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  providers: [RecipeService]
})
export class RecipesListComponent implements OnInit {
  @Output() EventaddRecipe = new EventEmitter<void>();

  recipes: Recipe[] = [];
  pageSize = 2;
  currentPage = 0;
  paginatedRecipes: Recipe[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  private eventsSubscription: Subscription | undefined;

  @Input() events: Observable<void> | undefined;


  constructor(
    protected recipeService: RecipeService,
    protected localService: LocalService
  ) {}

  ngOnInit() {
    this.initRecipes();
    this.displayRecipes();
    if(this.events)
      this.eventsSubscription = this.events.subscribe(() => this.displayRecipes());
  }

  initRecipes(): void {
    if (!this.localService.getData('recipes')) {
      this.recipes = this.recipeService.getAll();
      console.log('Recipes after fetching from service:', Array.isArray(this.recipes), this.recipes);
      this.localService.saveRecipeData('recipes', this.recipes);
    }
  }

  displayRecipes(): void {
    this.recipes = this.localService.getParsedRecipes('recipes');
    console.log('Recipes after fetching from local storage:', Array.isArray(this.recipes), this.recipes);
    this.updatePaginatedRecipes();
  }

  updatePaginatedRecipes(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    if (Array.isArray(this.recipes)) {
      this.paginatedRecipes = this.recipes.slice(startIndex, endIndex);
    } else {
      console.error('recipes is not an array');
      this.paginatedRecipes = [];
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedRecipes();
  }

  addRecipe(): void {
    this.EventaddRecipe.emit();
  }
}
