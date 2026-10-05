import { Component } from '@angular/core';

@Component({
  selector: 'app-incident-detail',
  standalone: true,
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Detalle de Incidencia</h1>
      <p>Aquí irá la vista de evidencias y chat.</p>
    </div>
  `
})
export class IncidentDetailComponent {}