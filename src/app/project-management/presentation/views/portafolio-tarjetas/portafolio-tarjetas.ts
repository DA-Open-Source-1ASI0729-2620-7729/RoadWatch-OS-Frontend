import { Component, OnInit, inject, signal } from '@angular/core';
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
import { ProjectDashboardViewModel } from '../../model/project-dashboard.vm';
import { ProjectPortfolioHttpService } from '../../../infrastructure/project-portfolio-http.service';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { AppNavigation } from '../../../../app-navigation';

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
    AppShell,
  ],
  templateUrl: './portafolio-tarjetas.html',
  styleUrl: './portafolio-tarjetas.css',
})
export class PortafolioTarjetas implements OnInit {
  private readonly portfolio = inject(ProjectPortfolioHttpService);
  protected readonly navigation = inject(AppNavigation).items;

  readonly proyectos = signal<ProjectDashboardViewModel[]>([]);
  readonly loading = signal(false);
  searchQuery = '';

  ngOnInit(): void {
    this.loading.set(true);
    this.portfolio.load().subscribe({
      next: (projects) => this.proyectos.set(projects),
      error: () => this.proyectos.set([]),
      complete: () => this.loading.set(false),
    });
  }

  get proyectosFiltrados(): ProjectDashboardViewModel[] {
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
