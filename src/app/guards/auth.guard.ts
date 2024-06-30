import { CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';


export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true; 
  } else {
    router.navigateByUrl("/home");
    return false;
  }
};
