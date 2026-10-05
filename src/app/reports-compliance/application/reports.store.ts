import { inject, Injectable, signal } from '@angular/core';
import { AuditReport } from '../domain/model/audit-report';
import { ReportsApi } from '../infrastructure/reports-api';

@Injectable({ providedIn: 'root' })
export class ReportsStore {
  private readonly api = inject(ReportsApi);
  readonly reports = signal<AuditReport[]>([]);
  readonly loading = signal(true);

  constructor() { this.refresh(); }

  refresh(): void { this.loading.set(true); this.api.listReports().subscribe(reports => { this.reports.set(reports); this.loading.set(false); }); }
}
