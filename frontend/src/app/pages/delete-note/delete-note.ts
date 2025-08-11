import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TopBar } from '../../components/top-bar/top-bar';
import { NoteService } from '../../services/notes/notes';

@Component({
  selector: 'app-delete-note',
  standalone: true,
  imports: [CommonModule, TopBar],
  templateUrl: './delete-note.html',
  styleUrls: ['./delete-note.css']
})
export class DeleteNote implements OnInit {
  note: any;
  noteId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService
  ) {}

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.noteId = Number(paramId);
      this.noteService.getNote(this.noteId).subscribe({
        next: data => this.note = data,
        error: () => this.router.navigate(['/'])
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  confirmDelete() {
    if (!this.noteId) return;
    this.noteService.deleteNote(this.noteId).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/']);
        } else {
          alert('Erro ao excluir a nota.');
        }
      },
      error: () => alert('Falha na comunicação com o servidor.')
    });
  }
}
