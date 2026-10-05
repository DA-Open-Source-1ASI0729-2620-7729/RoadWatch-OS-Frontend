import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectReport } from '../../../domain/model/project-report';
import { ComplianceStore } from '../../../application/compliance.store';
import { AppShell } from '../../../../shared/layout/app-shell/app-shell';
import { NavigationItem } from '../../../../shared/model/navigation-item';

@Component({ selector: 'app-compliance-summary', imports: [RouterLink, AppShell], styleUrl: './compliance-summary.scss', templateUrl: './compliance-summary.html' })
export class ComplianceSummary {
  protected readonly navigation: NavigationItem[] = [{ label: 'Reportes', route: '/reports', icon: 'description' }, { label: 'Generar auditoría', route: '/reports/audit', icon: 'note_add' }, { label: 'Cumplimiento', route: '/reports/compliance', icon: 'verified_user' }, { label: 'Documentos', route: '/documents/normative', icon: 'folder_open' }];
  protected readonly store = inject(ComplianceStore);
  protected readonly selectedFilter = signal<'all' | 'pending' | 'critical'>('all');
  protected readonly notification = signal('');
  protected readonly filteredProjects = computed(() => {
    const filter = this.selectedFilter();
    return this.store.projects().filter(project => {
      if (filter === 'pending') return project.pendingDocuments > 0;
      if (filter === 'critical') return project.criticalIncidents > 0;
      return true;
    });
  });
  protected readonly statusClass = (project: ProjectReport): string => project.criticalIncidents > 0 ? 'danger' : project.pendingDocuments > 0 ? 'warning' : 'success';
  protected readonly statusLabel = (project: ProjectReport): string => project.criticalIncidents > 0 ? 'Crítico' : project.pendingDocuments > 0 ? 'En observación' : 'En norma';
  protected readonly selectFilter = (filter: 'all' | 'pending' | 'critical'): void => this.selectedFilter.set(filter);
  protected readonly review = (project: ProjectReport): void => this.notification.set(`Resumen de ${project.projectName} listo para revisión.`);
}
