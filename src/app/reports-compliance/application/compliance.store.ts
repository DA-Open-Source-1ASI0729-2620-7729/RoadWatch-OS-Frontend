import { inject, Injectable, computed, signal } from '@angular/core';
import { ReportsApi } from '../infrastructure/reports-api';
import { EnvironmentalKpi } from '../domain/model/environmental-kpi';
import { ProjectReport } from '../domain/model/project-report';
import { ComplianceSummary } from '../domain/model/compliance-summary';

@Injectable({ providedIn: 'root' })
export class ComplianceStore {
  private readonly api = inject(ReportsApi);
  private readonly projectsSignal = signal<ProjectReport[]>([]);
  private readonly kpisSignal = signal<EnvironmentalKpi[]>([]);
  private readonly summarySignal = signal<ComplianceSummary | null>(null);
  readonly loading = signal(true);

  constructor() {
    this.api.getProjectReports().subscribe(projects => this.projectsSignal.set(projects));
    this.api.getEnvironmentalKpis().subscribe(kpis => { this.kpisSignal.set(kpis); this.loading.set(false); });
    this.api.getComplianceSummary().subscribe(summary => this.summarySignal.set(summary));
  }

  readonly projects = this.projectsSignal.asReadonly();
  readonly averageHealth = computed(() => this.projects().length ? Math.round(this.projects().reduce((total, project) => total + project.compliancePercentage, 0) / this.projects().length) : 0);
  readonly kpis = this.kpisSignal.asReadonly();
  readonly summary = this.summarySignal.asReadonly();
}
