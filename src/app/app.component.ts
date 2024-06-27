import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IngredientsInputComponent } from './components/ingredients-input/ingredients-input.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    RecipesListComponent,
    NavbarComponent,
    IngredientsInputComponent
  ],
  providers: [
    AuthService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angulicious';
}
