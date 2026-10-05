import { Component } from '@angular/core';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Incidencias críticas</h1>
      <p>Aquí irá la tabla de incidencias.</p>
    </div>
  `
})
export class IncidentListComponent {}