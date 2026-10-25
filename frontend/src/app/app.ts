import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { ToastContainer } from './components/toast/toast';
import { SchemaService } from './services/schema.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, ToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly schema = inject(SchemaService);

  constructor() {
    void this.schema.carica();
  }
}
