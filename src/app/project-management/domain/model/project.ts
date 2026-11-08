export type ProjectStatus = 'ACTIVE' | 'ARCHIVED';

export interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  status: ProjectStatus;
  responsibleUserId: string;
  createdAt: string;
  updatedAt: string;
}
