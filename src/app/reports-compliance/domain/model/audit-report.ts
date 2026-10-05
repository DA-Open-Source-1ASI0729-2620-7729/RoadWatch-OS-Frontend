export type AuditReportStatus = 'Borrador' | 'Emitido' | 'Observado';

export interface AuditReport {
  id: string;
  projectId: string;
  projectName: string;
  periodStart: string;
  periodEnd: string;
  status: AuditReportStatus;
  issuedAt?: string;
  sections: string[];
}
