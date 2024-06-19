import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { IngredientsService } from '../../services/ingredients.service';
import { Ingredient } from '../../models/ingredient.model';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ingredients-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './ingredients-input.component.html',
  styleUrl: './ingredients-input.component.scss',
  providers: [
    IngredientsService
  ]
})

export class IngredientsInputComponent {

  @Output() ingredientDeleted = new EventEmitter<void>();

  constructor(
    protected ingredientService: IngredientsService,
  ){}

  options: Ingredient[] = [];
  selected = '';
  disableRemove: boolean = false;
  quantity: number = 0;


  ngOnInit(){
    this.options = this.ingredientService.getAll();
  }
  
  deleteIngredient():void{
    this.ingredientDeleted.emit();
  }
}
