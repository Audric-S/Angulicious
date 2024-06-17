import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-preview',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './recipe-preview.component.html',
  styleUrl: './recipe-preview.component.scss'
})
export class RecipePreviewComponent {
  @Input() imageUrl: string | undefined;
  @Input() name: string | undefined;
  @Input() description: string = "";
}
