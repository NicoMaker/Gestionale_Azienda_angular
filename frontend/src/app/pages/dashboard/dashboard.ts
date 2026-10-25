import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DashboardStats } from '../../models/schema.model';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

/** Dashboard: indicatori principali e barre per stato fattura. */
@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  protected readonly stats = signal<DashboardStats | null>(null);
  protected readonly max = computed(() =>
    Math.max(1, ...(this.stats()?.perStato.map((x) => x.tot ?? 0) ?? [])),
  );

  constructor() {
    void this.carica();
  }

  private async carica(): Promise<void> {
    try {
      this.stats.set(await firstValueFrom(this.api.get<DashboardStats>('dashboard')));
    } catch (e) {
      this.toast.errore((e as Error).message);
    }
  }
}
