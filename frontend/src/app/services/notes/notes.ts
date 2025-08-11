import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NoteService {
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); // recupera do sessionStorage
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  createNote(data: { text_title: string; text_note: string }): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/api/newNote`,
      data,
      { headers: this.getAuthHeaders()}
    );
  }

  getNotes(): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.apiUrl}/api/notes`,
      { headers: this.getAuthHeaders() }
    );
  }

  getNote(id: number): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/api/notes/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  updateNote(id: number, data: { text_title: string; text_note: string }): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/api/notes/${id}`,
      data,
      { headers: this.getAuthHeaders() }
    );
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/api/notes/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

}
