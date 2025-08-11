import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TopBar } from '../../components/top-bar/top-bar';
import { NoteService } from '../../services/notes/notes';

@Component({
  standalone: true,
  selector: 'app-new-note',
  templateUrl: './new-note.html',
  styleUrl: './new-note.css',
  imports: [CommonModule, FormsModule, TopBar],
})
export class NewNote {
  text_title = '';
  text_note = '';
  errors: { [key: string]: string } = {};

  constructor(private noteService: NoteService, private router: Router) {}

  onSubmit(): void {
    this.errors = {};

    this.noteService.createNote({
      text_title: this.text_title,
      text_note: this.text_note
    }).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => {
        if (err.status === 401) {
          alert('Sua sessão expirou. Faça login novamente.');
          sessionStorage.removeItem('token');
          this.router.navigate(['/login']);
        } else if (err.status === 422 && err.error?.errors) {
          this.errors = err.error.errors;
        } else {
          alert('Erro ao salvar a nota.');
        }
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
