import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
  providers: [CookieService]
})
export class LogoutComponent {
  
  constructor(
    private cookieService: CookieService,
    private routeService: Router
  ) {}

  ngOnInit(){
    this.logout();
  }

  private logout(): void{
    this.cookieService.delete('isAdmin');
    this.routeService.navigateByUrl("/home");
  }
}
