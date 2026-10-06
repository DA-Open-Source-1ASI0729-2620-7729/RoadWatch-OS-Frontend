import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProjectManagementStore } from '../../../application/project-management.store';
import {
  EstadoPunto,
  IndicadorAmbiental,
  PuntoMonitoreo,
} from '../../../domain/model/punto-monitoreo.model';

interface PuntoDraft {
  latitud: number;
  longitud: number;
  norma: string;
  lmp: string;
  advertenciaPct: number;
}

@Component({
  selector: 'app-puntos-monitoreo',
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './puntos-monitoreo.html',
  styleUrl: './puntos-monitoreo.scss',
})
export class PuntosMonitoreo implements OnInit {
  private store = inject(ProjectManagementStore);

  // Más adelante este id debe venir de la ruta o del selector de proyecto
  private readonly proyectoId = 'PRY-003';

  readonly puntos = this.store.puntos;
  readonly seleccionado = signal<PuntoMonitoreo | null>(null);

  readonly normas = [
    'ECA Aire • D.S. 003-2017-MINAM',
    'ECA Ruido • D.S. 085-2003-PCM',
    'ECA Agua • D.S. 004-2017-MINAM',
  ];

  draft: PuntoDraft = { latitud: 0, longitud: 0, norma: '', lmp: '', advertenciaPct: 90 };

  ngOnInit(): void {
    this.store.loadPuntos(this.proyectoId);
  }

  editar(p: PuntoMonitoreo): void {
    this.seleccionado.set(p);
    this.draft = {
      latitud: p.latitud,
      longitud: p.longitud,
      norma: p.norma,
      lmp: p.lmp,
      advertenciaPct: p.advertenciaPct,
    };
  }

  cancelar(): void {
    this.seleccionado.set(null);
  }

  guardar(): void {
    const actual = this.seleccionado();
    if (!actual) return;
    this.store.updatePunto({ ...actual, ...this.draft });
    this.seleccionado.set(null);
  }

  indicadorLabel(i: IndicadorAmbiental): string {
    return { aire: 'Aire', ruido: 'Ruido', agua: 'Agua' }[i];
  }

  indicadorIcon(i: IndicadorAmbiental): string {
    return { aire: 'air', ruido: 'graphic_eq', agua: 'water_drop' }[i];
  }

  detalle(p: PuntoMonitoreo): string {
    return p.parametro === this.indicadorLabel(p.indicador) ? p.lmp : `${p.parametro} ${p.lmp}`;
  }

  estadoLabel(e: EstadoPunto): string {
    return {
      optimo: 'Óptimo',
      advertencia: 'Advertencia',
      critico: 'Crítico',
      sin_conexion: 'Sin conexión',
    }[e];
  }

  estadoIcon(e: EstadoPunto): string {
    return {
      optimo: 'check_circle',
      advertencia: 'warning',
      critico: 'error',
      sin_conexion: 'cloud_off',
    }[e];
  }

  estadoColor(e: EstadoPunto): string {
    return {
      optimo: '#23A277',
      advertencia: '#E5A93C',
      critico: '#D64545',
      sin_conexion: '#64748B',
    }[e];
  }
}
