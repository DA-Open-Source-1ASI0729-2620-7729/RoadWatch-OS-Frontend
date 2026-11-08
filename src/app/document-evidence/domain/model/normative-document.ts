import { DocumentStatus } from './document-status';

export interface NormativeDocument {
  id: string;
  projectId: string;
  name: string;
  status: DocumentStatus;
  currentVersion: number;
  createdAt: string;
}
