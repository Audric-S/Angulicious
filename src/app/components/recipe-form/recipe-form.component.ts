import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [ ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIcon],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent {
  recipeForm: FormGroup;

  constructor(private _form_builder: FormBuilder) {
    this.recipeForm = this._form_builder.group({
      name: ['', Validators.required],
      description: [''],
      image: ['']
    });
  }

  addRecipe() {
    console.log(this.recipeForm.value);
    this.recipeForm.reset();
  }
}



