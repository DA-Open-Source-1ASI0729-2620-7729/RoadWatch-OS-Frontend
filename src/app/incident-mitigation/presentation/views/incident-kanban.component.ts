import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { IncidentStore } from '../../application/incident.store';
import { IncidentStatus, EnvironmentalIncident } from '../../domain/model/incident.model';

@Component({
  selector: 'app-incident-kanban',
  standalone: true,
  // 1. Importamos el módulo de DragDrop de Angular CDK
  imports: [CommonModule, DragDropModule],
  template: `
    <div class="p-6 h-full flex flex-col">
      <header class="mb-6 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Tablero de Incidencias</h1>
          <p class="text-slate-500 text-sm">Gestiona el estado de las mitigaciones ambientales</p>
        </div>
        <button class="bg-emerald-600 text-white px-4 py-2 rounded shadow hover:bg-emerald-700 transition font-medium text-sm">
          + Nueva Incidencia
        </button>
      </header>

      <div *ngIf="store.loading()" class="text-center py-10">
        <p class="text-slate-500 font-medium animate-pulse">Cargando tablero...</p>
      </div>

      <!-- 2. Agregamos cdkDropListGroup para conectar todas las columnas -->
      <div *ngIf="!store.loading()" class="flex-1 flex gap-6 overflow-x-auto pb-4" cdkDropListGroup>
        
        <!-- Columna: ABIERTAS -->
        <div class="flex-1 min-w-[320px] max-w-sm bg-slate-100/80 rounded-xl p-4 flex flex-col border border-slate-200 shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-slate-700 uppercase text-sm tracking-wider">Abiertas</h3>
            <span class="bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-full font-bold">{{ openIncidents().length }}</span>
          </div>
          <!-- 3. Configuramos la zona para soltar elementos -->
          <div class="space-y-3 overflow-y-auto flex-1 pr-1 custom-scrollbar"
               id="OPEN"
               cdkDropList
               [cdkDropListData]="openIncidents()"
               (cdkDropListDropped)="onDrop($event)">
            @for (incident of openIncidents(); track incident.id) {
              <!-- 4. Hacemos que cada tarjeta sea arrastrable -->
              <div cdkDrag>
                <ng-container *ngTemplateOutlet="incidentCard; context: { $implicit: incident }"></ng-container>
              </div>
            }
          </div>
        </div>

        <!-- Columna: EN PROCESO -->
        <div class="flex-1 min-w-[320px] max-w-sm bg-slate-100/80 rounded-xl p-4 flex flex-col border border-slate-200 shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-blue-700 uppercase text-sm tracking-wider">En Proceso</h3>
            <span class="bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded-full font-bold">{{ inProgressIncidents().length }}</span>
          </div>
          <div class="space-y-3 overflow-y-auto flex-1 pr-1 custom-scrollbar"
               id="IN_PROGRESS"
               cdkDropList
               [cdkDropListData]="inProgressIncidents()"
               (cdkDropListDropped)="onDrop($event)">
            @for (incident of inProgressIncidents(); track incident.id) {
              <div cdkDrag>
                <ng-container *ngTemplateOutlet="incidentCard; context: { $implicit: incident }"></ng-container>
              </div>
            }
          </div>
        </div>

        <!-- Columna: RESUELTAS -->
        <div class="flex-1 min-w-[320px] max-w-sm bg-slate-100/80 rounded-xl p-4 flex flex-col border border-slate-200 shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-emerald-700 uppercase text-sm tracking-wider">Resueltas</h3>
            <span class="bg-emerald-200 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">{{ resolvedIncidents().length }}</span>
          </div>
          <div class="space-y-3 overflow-y-auto flex-1 pr-1 custom-scrollbar"
               id="RESOLVED"
               cdkDropList
               [cdkDropListData]="resolvedIncidents()"
               (cdkDropListDropped)="onDrop($event)">
            @for (incident of resolvedIncidents(); track incident.id) {
              <div cdkDrag>
                <ng-container *ngTemplateOutlet="incidentCard; context: { $implicit: incident }"></ng-container>
              </div>
            }
          </div>
        </div>
      </div>
    </div>

    <!-- Plantilla de Tarjeta de Incidencia -->
    <ng-template #incidentCard let-incident>
      <div class="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-emerald-300 transition-all">
        <div class="flex justify-between items-start mb-3">
          <span class="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">{{ incident.id }}</span>
          <span [class]="getSeverityClass(incident.severity)" class="text-[10px] px-2 py-1 rounded uppercase font-bold">
            {{ incident.severity }}
          </span>
        </div>
        <h4 class="font-bold text-sm text-slate-800 mb-3 leading-snug">{{ incident.title }}</h4>
        <div class="text-xs bg-slate-50 p-2 rounded border border-slate-100 mb-3 space-y-1">
          <div class="flex justify-between">
            <span class="text-slate-500">Indicador:</span>
            <span class="font-semibold text-slate-700">{{ incident.indicator }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Lectura:</span>
            <span class="font-semibold text-red-600">{{ incident.currentValue }} / {{ incident.lmpValue }} {{ incident.unit }}</span>
          </div>
        </div>
        <div class="flex justify-between items-center border-t border-slate-100 pt-3 mt-1">
          <div class="text-xs font-medium text-slate-500 flex items-center gap-1">
            🗓 {{ incident.dueDate | date:'dd MMM' }}
          </div>
          <div *ngIf="incident.evidenceCount > 0" class="text-xs font-medium text-slate-500 flex items-center gap-1">
            📎 {{ incident.evidenceCount }}
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #94a3b8; }
    
    /* Animaciones visuales para el Drag & Drop */
    .cdk-drag-preview {
      box-sizing: border-box;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
    .cdk-drag-placeholder {
      opacity: 0.3;
    }
    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
    .space-y-3.cdk-drop-list-dragging .cdk-drag {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
  `]
})
export class IncidentKanbanComponent implements OnInit {
  readonly store = inject(IncidentStore);

  openIncidents = computed(() => this.store.incidents().filter(i => i.status === IncidentStatus.OPEN));
  inProgressIncidents = computed(() => this.store.incidents().filter(i => i.status === IncidentStatus.IN_PROGRESS));
  resolvedIncidents = computed(() => this.store.incidents().filter(i => i.status === IncidentStatus.RESOLVED));

  ngOnInit() {
    this.store.loadIncidents();
  }

  /**
   * Maneja el evento de soltar la tarjeta. 
   * Si cambia de columna, dispara la actualización en el Store.
   */
  onDrop(event: CdkDragDrop<EnvironmentalIncident[]>) {
    if (event.previousContainer !== event.container) {
      // Obtenemos la incidencia movida y la nueva columna (estado)
      const incident = event.previousContainer.data[event.previousIndex];
      const newStatus = event.container.id as IncidentStatus;
      
      // Llamamos al store para actualizar el estado. Gracias a las Signals, 
      // la UI se actualizará automáticamente cuando el Store cambie.
      this.store.updateStatus(incident.id, newStatus);
    }
  }

  getSeverityClass(severity: string): string {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-100 text-red-700 border border-red-200';
      case 'HIGH': return 'bg-orange-100 text-orange-700 border border-orange-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      default: return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  }
}
