import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [CommonModule, FormsModule],
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';
  currentYear = new Date().getFullYear();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = ''; // limpa erros anteriores

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          // Login OK, redireciona para a home
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Usuário ou senha inválidos';
        }
      },
      error: (err) => {
        console.error('Erro no login:', err);
        this.errorMessage = 'Usuário ou senha inválidos';
      }
    });
  }
}
