import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IngredientsInputComponent } from './components/ingredients-input/ingredients-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    RecipesListComponent,
    NavbarComponent,
    IngredientsInputComponent
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angulicious';
}
