import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TopBar } from '../../components/top-bar/top-bar';
import { NoteService } from '../../services/notes/notes';

@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TopBar
  ],
  templateUrl: './edit-note.html',
  styleUrls: ['./edit-note.css']
})
export class EditNote implements OnInit {
  editForm!: FormGroup;
  noteId!: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    this.noteId = Number(this.route.snapshot.paramMap.get('id')) || 0;

    this.editForm = this.fb.group({
      text_title: ['', Validators.required],
      text_note: ['', Validators.required]
    });

    if (this.noteId) {
      this.loading = true;
      this.noteService.getNote(this.noteId).subscribe({
        next: (note) => {
          this.editForm.patchValue({
            text_title: note.title,
            text_note: note.text
          });
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar nota:', err);
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.noteService.updateNote(this.noteId, this.editForm.value).subscribe({
        next: (res) => {
          console.log('Nota atualizada com sucesso:', res);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erro ao atualizar nota:', err);
        }
      });
    }
  }
}
