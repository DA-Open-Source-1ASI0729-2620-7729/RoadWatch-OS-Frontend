export interface Evidence {
  id: string;
  incidentId?: string;
  measurementId?: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  uploadedByUserId: string;
  uploadedAt: string;
}
