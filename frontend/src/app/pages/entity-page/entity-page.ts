import { Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DataTable } from '../../components/data-table/data-table';
import { ModalForm } from '../../components/modal-form/modal-form';
import { Opzioni, Riga, Valori } from '../../models/schema.model';
import { ApiService } from '../../services/api.service';
import { SchemaService } from '../../services/schema.service';
import { ToastService } from '../../services/toast.service';

/** Pagina generica: elenco + crea / modifica / elimina per una qualsiasi tabella dello schema. */
@Component({
  selector: 'app-entity-page',
  imports: [DataTable, ModalForm],
  templateUrl: './entity-page.html',
})
export class EntityPage {
  /** parametro di rotta :nome (withComponentInputBinding) */
  readonly nome = input.required<string>();

  private readonly api = inject(ApiService);
  private readonly schema = inject(SchemaService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  protected readonly entity = computed(() => this.schema.entities()[this.nome()]);
  protected readonly righe = signal<Riga[]>([]);
  protected readonly opzioni = signal<Opzioni>({});
  protected readonly caricato = signal(false);
  /** null = modale chiusa; { riga: null } = nuovo elemento */
  protected readonly modale = signal<{ riga: Riga | null } | null>(null);

  constructor() {
    effect(() => {
      const nome = this.nome();
      if (!this.entity()) {
        void this.router.navigateByUrl('/dashboard');
        return;
      }
      untracked(() => {
        this.modale.set(null);
        void this.carica(nome);
      });
    });
  }

  private async carica(nome: string): Promise<void> {
    const E = this.schema.entities()[nome];
    this.caricato.set(false);
    try {
      const righe = await firstValueFrom(this.api.get<Riga[]>(nome));
      // opzioni dei menu a tendina che dipendono da altre tabelle (es. cliente della fattura)
      const opzioni: Opzioni = {};
      for (const c of E.campi.filter((c) => c.da)) {
        const label = this.schema.entities()[c.da!].label;
        const altre = await firstValueFrom(this.api.get<Riga[]>(c.da!));
        opzioni[c.k] = altre.map((x) => [x.id, String(x[label] ?? '')]);
      }
      if (nome !== this.nome()) return; // l'utente ha già cambiato pagina
      this.righe.set(righe);
      this.opzioni.set(opzioni);
      this.caricato.set(true);
    } catch (e) {
      this.toast.errore((e as Error).message);
    }
  }

  protected apri(riga: Riga | null): void {
    this.modale.set({ riga });
  }

  protected async salva(riga: Riga | null, v: Valori): Promise<void> {
    const nome = this.nome();
    try {
      await firstValueFrom(
        riga ? this.api.put(`${nome}/${riga.id}`, v) : this.api.post(nome, v),
      );
      this.toast.mostra('Salvato');
      this.modale.set(null);
      await this.carica(nome);
    } catch (e) {
      this.toast.errore((e as Error).message); // la modale resta aperta
    }
  }

  protected async elimina(riga: Riga): Promise<void> {
    if (!confirm('Eliminare questo elemento?')) return;
    const nome = this.nome();
    try {
      await firstValueFrom(this.api.delete(`${nome}/${riga.id}`));
      this.toast.mostra('Eliminato');
      await this.carica(nome);
    } catch (e) {
      this.toast.errore((e as Error).message);
    }
  }
}
