import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = sessionStorage.getItem('token');

    if (token) {
      // Já está logado → redireciona para home
      return this.router.parseUrl('/');
    }

    // Não está logado → pode acessar
    return true;
  }
}
