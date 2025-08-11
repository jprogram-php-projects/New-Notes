import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './note.html',
  styleUrl: './note.css'
})
export class Note {
  @Input() note!: {
    id: number;
    title: string;
    text: string;
    created_at: string;
    updated_at: string;
  };

  getFormattedDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }
}
