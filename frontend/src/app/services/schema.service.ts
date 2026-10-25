import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Entita, Gruppo } from '../models/schema.model';
import { ApiService } from './api.service';

/** Carica lo schema (gruppi e 100 tabelle) da /api/schema ed espone gruppi e sezioni. */
@Injectable({ providedIn: 'root' })
export class SchemaService {
  private readonly api = inject(ApiService);

  readonly gruppi = signal<Gruppo[]>([]);
  readonly stato = signal<'caricamento' | 'ok' | 'errore'>('caricamento');
  readonly errore = signal('');

  /** nome tabella -> sezione (equivalente di ENTITIES) */
  readonly entities = computed(() => {
    const out: Record<string, Entita> = {};
    for (const g of this.gruppi())
      for (const t of g.tabelle)
        out[t.nome] = {
          ...t,
          gruppo: g.id,
          icona: g.icona,
          singolare: t.titolo.toLowerCase(),
        };
    return out;
  });

  async carica(): Promise<void> {
    this.stato.set('caricamento');
    try {
      this.gruppi.set(await firstValueFrom(this.api.get<Gruppo[]>('schema')));
      this.stato.set('ok');
    } catch (e) {
      this.errore.set((e as Error).message);
      this.stato.set('errore');
    }
  }
}
