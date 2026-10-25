import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Campo, Opzioni, Riga, Valori } from '../../models/schema.model';

type Controllo = FormControl<string | number | null>;

/** Finestra con modulo reattivo generato dai campi dello schema. */
@Component({
  selector: 'app-modal-form',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-form.html',
  styleUrl: './modal-form.css',
})
export class ModalForm implements OnInit, AfterViewInit {
  readonly titolo = input.required<string>();
  readonly campi = input.required<Campo[]>();
  readonly valori = input<Riga | null>(null);
  readonly opzioni = input<Opzioni>({});

  readonly salva = output<Valori>();
  readonly annulla = output<void>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly primo = viewChild<ElementRef<HTMLElement>>('modulo');

  protected form = new FormGroup<Record<string, Controllo>>({});

  ngOnInit(): void {
    const iniziale = this.valori();
    for (const c of this.campi()) {
      const validatori: ValidatorFn[] = [];
      if (c.req) validatori.push(Validators.required);
      if (c.type === 'email') validatori.push(Validators.email);
      let v: string | number | null = iniziale?.[c.k] ?? '';
      // come nel front originale: un menu a scelta fissa parte dalla prima voce
      if (c.type === 'select' && c.opzioni && v === '') v = c.opzioni[0] ?? '';
      this.form.addControl(c.k, new FormControl<string | number | null>(v, validatori));
    }
  }

  ngAfterViewInit(): void {
    this.primo()?.nativeElement.querySelector<HTMLElement>('input,select')?.focus();
  }

  protected scelte(c: Campo): [string | number, string][] {
    return c.opzioni ? c.opzioni.map((o): [string, string] => [o, o]) : (this.opzioni()[c.k] ?? []);
  }

  protected invalido(c: Campo): boolean {
    const ctrl = this.form.controls[c.k];
    return ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }

  protected invia(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const d: Valori = { ...this.form.getRawValue() };
    for (const c of this.campi()) if (c.type === 'number') d[c.k] = Number(d[c.k] || 0);
    this.salva.emit(d);
  }

  protected onOverlay(ev: MouseEvent): void {
    if (ev.target === this.host.nativeElement.firstElementChild) this.annulla.emit();
  }

  @HostListener('document:keydown.escape')
  protected onEsc(): void {
    this.annulla.emit();
  }
}
