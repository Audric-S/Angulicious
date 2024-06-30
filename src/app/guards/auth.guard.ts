import { CanActivateFn } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';


export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)

  if (authService.isAdmin()) {
    return true; 
  } else {
    return false;
  }
};
