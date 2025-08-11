import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environments';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-bar.html',
  styleUrls: ['./top-bar.css']   // <-- corrigido para styleUrls
})
export class TopBar implements OnInit, AfterViewInit, OnDestroy {
  username: string | null = null;

  private resizeSub: Subscription | null = null;
  private ro: ResizeObserver | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
  }

  ngAfterViewInit(): void {
    // Atualiza na inicialização
    this.updateTopbarHeight();

    // 1) ResizeObserver para mudanças de conteúdo/altura do próprio top-bar
    if ((window as any).ResizeObserver) {
      this.ro = new ResizeObserver(() => this.updateTopbarHeight());
      this.ro.observe(this.elRef.nativeElement);
    }

    // 2) Fallback: escuta resize da janela (debounced)
    this.resizeSub = fromEvent(window, 'resize').pipe(debounceTime(120)).subscribe(() => this.updateTopbarHeight());
  }

  ngOnDestroy(): void {
    this.resizeSub?.unsubscribe();
    if (this.ro) {
      this.ro.disconnect();
      this.ro = null;
    }
  }

  private updateTopbarHeight(): void {
    try {
      const hostEl = this.elRef.nativeElement as HTMLElement;
      // tenta medir o elemento .top-bar-container (se existir)
      const topbarEl = hostEl.querySelector('.top-bar-container') as HTMLElement | null;
      const h = (topbarEl && topbarEl.offsetHeight) ? topbarEl.offsetHeight : (hostEl.offsetHeight || 72);
      document.documentElement.style.setProperty('--topbar-height', `${h}px`);
    } catch (e) {
      // fallback seguro
      document.documentElement.style.setProperty('--topbar-height', `72px`);
    }
  }

  logout(): void {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.clearAndRedirect();
      return;
    }

    this.http.post(`${environment.apiUrl}/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      finalize(() => this.clearAndRedirect())
    ).subscribe({
      next: () => {},
      error: () => {}
    });
  }

  private clearAndRedirect() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
