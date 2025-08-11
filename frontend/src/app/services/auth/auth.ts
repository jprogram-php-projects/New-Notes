// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, { username, password })
      .pipe(
        tap((response: any) => {
          if (response.success && response.token) {
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('expires_in', response.expires_in.toString());
            sessionStorage.setItem('username', response.username);
          }
        })
      );
  }

  logout(): Observable<any> {
    const token = sessionStorage.getItem('token');
    return this.http.post(`${environment.apiUrl}/logout`, {}, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    }).pipe(
      tap(() => sessionStorage.clear())
    );
  }

  getAuthHeaders() {
    const token = sessionStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
