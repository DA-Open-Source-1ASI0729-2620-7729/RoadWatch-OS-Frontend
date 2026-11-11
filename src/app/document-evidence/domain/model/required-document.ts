export interface RequiredDocument {
  id: string;
  projectId: string;
  milestoneName: string;
  documentName: string;
  mandatory: boolean;
  dueDate: string | null;
}
