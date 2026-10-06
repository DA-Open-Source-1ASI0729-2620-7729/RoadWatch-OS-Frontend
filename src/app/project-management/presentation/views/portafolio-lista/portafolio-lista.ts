import { Component, OnInit, ViewChild, AfterViewInit, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { ProjectManagementStore } from '../../../application/project-management.store';
import { Proyecto } from '../../../domain/model/proyecto.model';

@Component({
  selector: 'app-portafolio-lista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatProgressBarModule,
  ],
  templateUrl: './portafolio-lista.html',
  styleUrl: './portafolio-lista.scss',
})
export class PortafolioLista implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private store = inject(ProjectManagementStore);

  displayedColumns = [
    'id',
    'nombre',
    'supervisor',
    'saludAmbiental',
    'alertasActivas',
    'incidentes',
    'sensores',
    'estado',
    'acciones',
  ];
  filterEstado = '';
  searchQuery = '';
  dataSource = new MatTableDataSource<Proyecto>([]);

  constructor() {
    effect(() => {
      this.dataSource.data = this.store.proyectos();
    });
  }

  ngOnInit(): void {
    this.store.loadProyectos();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Proyecto, filter: string) => {
      const f = JSON.parse(filter);
      const matchSearch =
        !f.search ||
        data.nombre.toLowerCase().includes(f.search) ||
        data.supervisor.toLowerCase().includes(f.search) ||
        data.ubicacion.toLowerCase().includes(f.search);
      const matchEstado = !f.estado || data.estado === f.estado;
      return matchSearch && matchEstado;
    };
  }

  applyFilter(): void {
    this.dataSource.filter = JSON.stringify({
      search: this.searchQuery.toLowerCase().trim(),
      estado: this.filterEstado,
    });
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.filterEstado = '';
    this.applyFilter();
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
}
