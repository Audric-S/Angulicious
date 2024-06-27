import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule} from '@angular/material/paginator';
import { RecipePreviewComponent } from '../recipe-preview/recipe-preview.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { LocalService } from '../../services/local.service';


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
  styleUrl: './recipes-list.component.scss',
  providers: [
    RecipeService
  ]
})
export class RecipesListComponent implements OnInit {
  @Output() EventaddRecipe = new EventEmitter<void>();

  recipes: Recipe[] = [];

  pageSize = 2;
  currentPage = 0;
  paginatedRecipes: Recipe[] = [];
  recipesGet: string | null = "";
  recipesDecoded: Recipe[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    protected recipeService: RecipeService,
    protected localService: LocalService
  ){}

  ngOnInit(){
      //this.recipes = this.recipeService.getAll();
      //const recipesJSON = JSON.stringify(this.recipes);
      //this.localService.saveData("recipes", recipesJSON);
      this.recipes = this.localService.getParsedRecipes("recipes");
      this.updatePaginatedRecipes();
  }

  updatePaginatedRecipes() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedRecipes = this.recipes.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedRecipes();
  }

  addRecipe() {
    this.EventaddRecipe.emit();
  }

 
}




