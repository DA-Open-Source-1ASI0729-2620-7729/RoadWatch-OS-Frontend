import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { ProjectManagementStore } from '../../../application/project-management.store';
import { Proyecto } from '../../../domain/model/proyecto.model';

@Component({
  selector: 'app-portafolio-tarjetas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
  ],
  templateUrl: './portafolio-tarjetas.html',
  styleUrl: './portafolio-tarjetas.scss',
})
export class PortafolioTarjetas implements OnInit {
  private store = inject(ProjectManagementStore);

  readonly proyectos = this.store.proyectos;
  readonly loading = this.store.loading;
  searchQuery = '';

  ngOnInit(): void {
    this.store.loadProyectos();
  }

  get proyectosFiltrados(): Proyecto[] {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) return this.proyectos();
    return this.proyectos().filter(
      (p) =>
        p.nombre.toLowerCase().includes(q) ||
        p.ubicacion.toLowerCase().includes(q) ||
        p.supervisor.toLowerCase().includes(q),
    );
  }

  getSaludColor(v: number): string {
    return v >= 80 ? '#23A277' : v >= 60 ? '#E5A93C' : '#D64545';
  }
  getSaludLabel(v: number): string {
    return v >= 80 ? 'Óptimo' : v >= 60 ? 'Moderado' : 'Crítico';
  }
  getEstadoLabel(e: string): string {
    return (
      (
        { en_progreso: 'En progreso', pausado: 'Pausado', completado: 'Completado' } as Record<
          string,
          string
        >
      )[e] ?? e
    );
  }
  getDonutDash(v: number): string {
    const c = 2 * Math.PI * 28;
    return `${(v / 100) * c} ${c - (v / 100) * c}`;
  }
}
