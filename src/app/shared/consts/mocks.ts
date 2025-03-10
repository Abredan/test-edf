import {
  Project,
  ProjectStatusEnum,
  ProjectTypeEnum,
} from '../../projects/interfaces/project.interface';

export const FAKE_PROJECTS: Project[] = [
  {
    id: 13234567890,
    type: ProjectTypeEnum.WORK_APPROVAL,
    description: 'Projet de travaux lorem ipsum',
    status: ProjectStatusEnum.STATUT,
    contractId: 1534885932,
    user: 'John Doe',
  },
];
