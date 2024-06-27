import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [
    AuthService,
  ]
})
export class NavbarComponent implements OnInit {

  public isAdmin: boolean | undefined;

  constructor(
    private readonly _authService: AuthService,
    private readonly routeService: Router
  ){}

  public ngOnInit(): void {
    this.onAdminStatusChange();
  }

  private onAdminStatusChange(): void {
    this._authService.onAuthStatusChange.subscribe({
      next: (status) => {
        this.isAdmin = status === true ? true : false;
      }
    });
  }


  redirectToHome(): void{
    this.routeService.navigateByUrl("/home");
  }

  public login(): void {
    this._authService.login();
    this.routeService.navigateByUrl("/ingredients");
  }

  public logout(): void {
    this._authService.logout();
    this.routeService.navigateByUrl("/home");
  }
}
