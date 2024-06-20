import { Component } from '@angular/core';
import { NavlinkComponent } from '../navlink/navlink.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { Link } from '../../models/link.model';
import { LinkService } from '../../services/link.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NavlinkComponent,
    CommonModule,
    MatToolbarModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [
    LinkService,
  ]
})
export class NavbarComponent {
  link_list: Link[] = [];

  constructor(
    protected linkService: LinkService,
    private routeService: Router
  ){}

  ngOnInit(){
    this.link_list = this.linkService.getAll();
  }

  redirectToHome(): void{
    this.routeService.navigateByUrl("/home");
  }
}
