import { inject, Injectable, computed, signal } from '@angular/core';
import { ReportsGateway } from './reports.gateway';
import { EnvironmentalKpi } from '../domain/model/environmental-kpi';
import { ProjectReport } from '../domain/model/project-report';
import { ComplianceSummary } from '../domain/model/compliance-summary';

@Injectable({ providedIn: 'root' })
export class ComplianceStore {
  private readonly gateway = inject(ReportsGateway);
  private readonly projectsSignal = signal<ProjectReport[]>([]);
  private readonly kpisSignal = signal<EnvironmentalKpi[]>([]);
  private readonly summariesSignal = signal<ComplianceSummary[]>([]);
  readonly loading = signal(true);

  constructor() {
    this.gateway.getProjectReports().subscribe((projects) => this.projectsSignal.set(projects));
    this.gateway.getEnvironmentalKpis().subscribe((kpis) => {
      this.kpisSignal.set(kpis);
      this.loading.set(false);
    });
    this.gateway.getComplianceSummaries().subscribe((summaries) => this.summariesSignal.set(summaries));
  }

  readonly projects = this.projectsSignal.asReadonly();
  readonly averageHealth = computed(() =>
    this.projects().length
      ? Math.round(
          this.projects().reduce((total, project) => total + project.compliancePercentage, 0) /
            this.projects().length,
        )
      : 0,
  );
  readonly kpis = this.kpisSignal.asReadonly();
  readonly summaries = this.summariesSignal.asReadonly();
}
