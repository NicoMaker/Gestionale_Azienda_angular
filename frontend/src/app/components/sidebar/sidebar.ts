import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { SchemaService } from '../../services/schema.service';

/** Menu laterale: Dashboard, ricerca tabelle, gruppi a tendina con le sezioni, backup. */
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private readonly schema = inject(SchemaService);
  private readonly router = inject(Router);

  protected readonly q = signal('');
  /** aperture/chiusure scelte a mano dall'utente (gruppo -> aperto) */
  private readonly manuale = signal<Record<string, boolean>>({});

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  private readonly gruppoAttivo = computed(() => {
    const nome = this.url().split(/[/?#]/).filter(Boolean)[0];
    return nome ? this.schema.entities()[nome]?.gruppo : undefined;
  });

  protected readonly visibili = computed(() => {
    const q = this.q().trim().toLowerCase();
    return this.schema
      .gruppi()
      .map((g) => ({
        id: g.id,
        titolo: g.titolo,
        icona: g.icona,
        totale: g.tabelle.length,
        tabelle: g.tabelle.filter((t) => t.titolo.toLowerCase().includes(q)),
      }))
      .filter((g) => g.tabelle.length > 0);
  });

  protected isOpen(id: string): boolean {
    if (this.q().trim()) return true;
    return this.manuale()[id] ?? id === this.gruppoAttivo();
  }

  protected toggle(id: string, ev: Event): void {
    ev.preventDefault(); // gestiamo noi lo stato di <details>
    const aperto = this.isOpen(id);
    this.manuale.update((m) => ({ ...m, [id]: !aperto }));
  }

  protected onCerca(ev: Event): void {
    this.q.set((ev.target as HTMLInputElement).value);
  }
}
