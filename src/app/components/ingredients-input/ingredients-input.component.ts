import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { IngredientsService } from '../../services/ingredients.service';
import { Ingredient } from '../../models/ingredient.model';

@Component({
  selector: 'app-ingredients-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './ingredients-input.component.html',
  styleUrl: './ingredients-input.component.scss',
  providers: [
    IngredientsService
  ]
})

export class IngredientsInputComponent {

  constructor(
    protected ingredientService: IngredientsService,
  ){}

  options: Ingredient[] = [];
  selected = '';
  disableRemove: boolean = false;


  ngOnInit(){
    this.options = this.ingredientService.getAll();
  }
  
  
}
