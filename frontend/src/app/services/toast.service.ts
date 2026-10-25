import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  msg: string;
  tipo: 'ok' | 'err';
}

/** Notifiche temporanee in basso a destra. */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private n = 0;
  readonly toasts = signal<Toast[]>([]);

  mostra(msg: string, tipo: Toast['tipo'] = 'ok'): void {
    const id = ++this.n;
    this.toasts.update((t) => [...t, { id, msg, tipo }]);
    setTimeout(() => this.toasts.update((t) => t.filter((x) => x.id !== id)), 3200);
  }
  errore(msg: string): void {
    this.mostra(msg, 'err');
  }
}
