import { TestBed } from '@angular/core/testing';

import { FAKE_PROJECTS } from '../../../shared/consts/mocks';
import { Project } from '../../interfaces/project.interface';
import { CreateProjectDto, ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all projects', (done) => {
    service.getAll().subscribe((projects) => {
      expect(projects.length).toBeGreaterThan(0);
      expect(projects).toEqual(jasmine.arrayContaining(FAKE_PROJECTS));
      done();
    });
  });

  it('should retrieve a project by id', (done) => {
    const projectId = FAKE_PROJECTS[0].id;

    service.getById(projectId).subscribe((project) => {
      expect(project).toBeDefined();
      expect(project?.id).toBe(projectId);
      done();
    });
  });

  it('should return undefined for a non-existing project', (done) => {
    service.getById(999).subscribe((project) => {
      expect(project).toBeUndefined();
      done();
    });
  });

  it('should create a new project', () => {
    const newProjectData: CreateProjectDto = {
      description: 'New Project',
      user: 'New User',
    };

    service.create(newProjectData);

    service.getAll().subscribe((projects) => {
      expect(projects.length).toBe(FAKE_PROJECTS.length + 1);
      expect(projects[0].description).toBe('New Project');
    });
  });

  it('should update an existing project', () => {
    const updateData: Partial<Project> = {
      description: 'Updated Project Description',
    };
    const projectId = FAKE_PROJECTS[0].id;

    service.update(projectId, updateData);

    service.getById(projectId).subscribe((project) => {
      expect(project).toBeDefined();
      expect(project?.description).toBe('Updated Project Description');
    });
  });

  it('should delete an existing project', () => {
    const projectId = FAKE_PROJECTS[0].id;

    service.delete(projectId);

    service.getById(projectId).subscribe((project) => {
      expect(project).toBeUndefined();
    });
  });
});
