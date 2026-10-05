import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComplianceProject, ComplianceStatus } from '../../../domain/model/compliance-kpi';
import { ComplianceStore } from '../../../application/compliance.store';

@Component({ selector: 'app-compliance-summary', imports: [RouterLink], styleUrl: './compliance-summary.scss', templateUrl: './compliance-summary.html' })
export class ComplianceSummary {
  protected readonly store = inject(ComplianceStore);
  protected readonly statusClass = (status: ComplianceStatus): string => status === 'En norma' ? 'success' : status === 'Crítico' ? 'danger' : 'warning';
  protected readonly review = (project: ComplianceProject): void => alert(`Abriendo el resumen de cumplimiento de ${project.name}.`);
}
