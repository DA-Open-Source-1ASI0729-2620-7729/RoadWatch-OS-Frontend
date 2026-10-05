export interface ReportExportRequest {
  projectId: string;
  periodStart: string;
  periodEnd: string;
  sections: string[];
  format: 'PDF';
}
