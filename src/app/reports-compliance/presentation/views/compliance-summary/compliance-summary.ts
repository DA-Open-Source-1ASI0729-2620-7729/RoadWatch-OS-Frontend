import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectReport } from '../../../domain/model/project-report';
import { ComplianceStore } from '../../../application/compliance.store';

@Component({ selector: 'app-compliance-summary', imports: [RouterLink], styleUrl: './compliance-summary.scss', templateUrl: './compliance-summary.html' })
export class ComplianceSummary {
  protected readonly store = inject(ComplianceStore);
  protected readonly statusClass = (project: ProjectReport): string => project.criticalIncidents > 0 ? 'danger' : project.pendingDocuments > 0 ? 'warning' : 'success';
  protected readonly statusLabel = (project: ProjectReport): string => project.criticalIncidents > 0 ? 'Crítico' : project.pendingDocuments > 0 ? 'En observación' : 'En norma';
  protected readonly review = (project: ProjectReport): void => console.info(`Open compliance summary for ${project.projectId}`);
}
