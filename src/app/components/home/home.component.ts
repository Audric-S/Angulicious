import { Component } from '@angular/core';
import { RecipesListComponent } from '../recipes-list/recipes-list.component';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipesListComponent,
    RecipeFormComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showForm: boolean = false;
  eventsSubject: Subject<void> = new Subject<void>();

  emitEventToChild() {
    this.eventsSubject.next();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addRecipe(): void {
    this.toggleForm();
    this.emitEventToChild();
  }
}
