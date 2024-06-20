import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private cookieService: CookieService,
    private routeService: Router
  ) {}

  ngOnInit(){
    this.login();
  }

  private login(): void{
    this.cookieService.set('isAdmin', 'True');
    this.routeService.navigateByUrl("/ingredients");
  }
}
