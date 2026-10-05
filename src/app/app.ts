import { Component, signal } from '@angular/core';
import { AppShellComponent } from './components/app-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppShellComponent],
  template: `<app-shell></app-shell>`
})
export class App {
  protected readonly title = signal('roadwatch-os-frontend');
}