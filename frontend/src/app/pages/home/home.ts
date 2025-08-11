import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBar } from '../../components/top-bar/top-bar';
import { Note } from '../../components/note/note';
import { Router } from '@angular/router';
import { NoteService } from '../../services/notes/notes';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [CommonModule, TopBar, Note],
})
export class Home implements OnInit {
  loading = true;
  notes: any[] = [];
  successMessage: string | null = null;

  constructor(
    private router: Router,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    // Recuperar mensagem passada do cadastro (opcional)
    const nav = history.state;
    if (nav && nav.successMessage) {
      this.successMessage = nav.successMessage;
    }

    this.loadNotes();
  }

  loadNotes(): void {
    this.noteService.getNotes().subscribe({
      next: (data) => {
        this.notes = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Erro ao carregar notas:', err);
      }
    });
  }

  goToNew(): void {
    this.router.navigate(['/new']);
  }
}
