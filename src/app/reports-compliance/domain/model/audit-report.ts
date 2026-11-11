import { ReportStatus } from './report-status';

export type AuditReportStatus = ReportStatus;

export interface AuditReport {
  id: string;
  projectId: string;
  generatedAt?: string;
  fileUrl?: string;
  projectName: string;
  periodStart: string;
  periodEnd: string;
  status: AuditReportStatus;
  issuedAt?: string;
  sections: string[];
}
