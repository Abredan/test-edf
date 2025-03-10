export enum ProjectTypeEnum {
  WORK_APPROVAL = 'work_approval',
}

export enum ProjectStatusEnum {
  STATUT = 'statut', // TODO: To remove if just example
  PENDING = 'pending',
}

export interface Project {
  id: number;
  type: ProjectTypeEnum;
  description: string;
  status: ProjectStatusEnum;
  contractId: number | null;
  user: string;
}
