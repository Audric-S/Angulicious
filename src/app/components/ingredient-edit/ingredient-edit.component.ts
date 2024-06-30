import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Ingredient } from '../../models/ingredient.model';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { IngredientsInputComponent } from '../ingredients-input/ingredients-input.component';
import { IngredientsService } from '../../services/ingredients.service';

@Component({
  selector: 'app-ingredient-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatOption,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    IngredientsInputComponent,
  ],
  templateUrl: './ingredient-edit.component.html',
  styleUrl: './ingredient-edit.component.scss'
})
export class IngredientEditComponent implements OnInit {
  @Input()ingredient!: Ingredient;
  @Output() saveIngredientEvent = new EventEmitter<Ingredient>();
  editForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private ingredientsService: IngredientsService) {}

  ngOnInit() {
    this.editForm = new FormGroup({
      id: new FormControl(this.ingredient.id),
      name: new FormControl(this.ingredient.name, Validators.required),
      description: new FormControl(this.ingredient.description)
    });
  }

  saveIngredient(): void {
    if (this.editForm.valid) {
      const editedIngredient: Ingredient = this.editForm.value;
      this.ingredientsService.updateIngredient(editedIngredient.id, editedIngredient).subscribe(
        (updatedIngredient) => {
          console.log('Ingrédient mis à jour avec succès :', updatedIngredient);
          this.saveIngredientEvent.emit(updatedIngredient);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'ingrédient :', error);
        }
      );
    }
  }
}