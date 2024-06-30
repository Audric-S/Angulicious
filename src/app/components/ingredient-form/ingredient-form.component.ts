import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngredientsService } from '../../services/ingredients.service';
import { Ingredient } from '../../models/ingredient.model';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { IngredientsInputComponent } from '../ingredients-input/ingredients-input.component';

@Component({
  selector: 'app-ingredient-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    IngredientsInputComponent,
    CommonModule,
  ],
  templateUrl: './ingredient-form.component.html',
  styleUrl: './ingredient-form.component.scss'
})
export class IngredientFormComponent {
  newIngredient: Ingredient = {id: 0, name:'', description: ''};
  @Output() newIngredientEvent = new EventEmitter<Ingredient>();
  ingredientForm: FormGroup = new FormGroup(
    {
      name: new FormControl(this.newIngredient.name, Validators.required),
      description: new FormControl(this.newIngredient.description, Validators.required),
    }
  );

  constructor(private formBuilder: FormBuilder, private ingredientsService: IngredientsService) {}

  ngOnInit(): void {
    this.ingredientForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  addIngredient(): void {
    if (this.ingredientForm.valid) {
      const newIngredient: Ingredient = {
        id: 0, // This will be set by the ingredient service later
        name: this.ingredientForm.value.name,
        description: this.ingredientForm.value.description
      };

      this.ingredientsService.addIngredient(newIngredient).subscribe(
        (ingredient) => {
          console.log('Ingrédient ajouté avec succès :', ingredient);
          this.newIngredientEvent.emit(ingredient);
          this.ingredientForm.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'ingrédient :', error);
        }
      );
    }
  }

}
