import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { Colonna, Riga } from '../../models/schema.model';

/** Tabella con ricerca, modifica ed elimina. */
@Component({
  selector: 'app-data-table',
  imports: [CurrencyPipe],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable {
  readonly colonne = input.required<Colonna[]>();
  readonly righe = input.required<Riga[]>();
  readonly modifica = output<Riga>();
  readonly elimina = output<Riga>();

  protected readonly q = signal('');
  protected readonly filtrate = computed(() => {
    const q = this.q().toLowerCase();
    return this.righe().filter((r) =>
      JSON.stringify(Object.values(r)).toLowerCase().includes(q),
    );
  });

  protected valore(c: Colonna, r: Riga): string | number {
    return r[c.k] ?? '';
  }
  protected numero(c: Colonna, r: Riga): number {
    return Number(r[c.k]) || 0;
  }
  protected onCerca(ev: Event): void {
    this.q.set((ev.target as HTMLInputElement).value);
  }
}
