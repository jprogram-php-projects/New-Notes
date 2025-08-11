import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = sessionStorage.getItem('token');

    if (token) {
      return true; // Pode acessar
    }

    // Não está logado, redireciona para login
    return this.router.parseUrl('/login');
  }
}
