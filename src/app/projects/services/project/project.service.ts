import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FAKE_PROJECTS } from '../../../shared/consts/mocks';
import {
  Project,
  ProjectStatusEnum,
  ProjectTypeEnum,
} from '../../interfaces/project.interface';

export interface CreateProjectDto {
  description: string;
  contractId?: number;
  user: string;
}

export interface UpdateProjectDto extends CreateProjectDto {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects: Project[] = [...FAKE_PROJECTS];
  private readonly projectsSubject = new BehaviorSubject<Project[]>(
    this.projects
  );
  public projects$ = this.projectsSubject.asObservable();

  public getAll(): Observable<Project[]> {
    return this.projects$;
  }

  public getById(id: number): Observable<Project | undefined> {
    return new Observable((observer) => {
      const project = this.projects.find((project) => project.id === id);
      observer.next(project);
      observer.complete();
    });
  }

  public create({ description, contractId, user }: CreateProjectDto): void {
    const newProject: Project = {
      id: Date.now(),
      description,
      user,
      contractId: contractId ?? null,
      status: ProjectStatusEnum.PENDING,
      type: ProjectTypeEnum.WORK_APPROVAL,
    };
    this.projects = [newProject, ...this.projects];
    this.projectsSubject.next(this.projects);
  }

  public update(id: number, updatedData: Partial<Project>): void {
    this.projects = this.projects.map((project) =>
      project.id === id ? { ...project, ...updatedData } : project
    );
    this.projectsSubject.next([...this.projects]);
  }

  public delete(id: number): void {
    this.projects = this.projects.filter((project) => project.id !== id);
    this.projectsSubject.next([...this.projects]);
  }
}
