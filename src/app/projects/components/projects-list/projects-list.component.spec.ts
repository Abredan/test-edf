import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  Project,
  ProjectStatusEnum,
  ProjectTypeEnum,
} from '../../interfaces/project.interface';
import { ProjectService } from '../../services/project/project.service';
import { ProjectsItemComponent } from '../projects-item/projects-item.component';
import { ProjectsListComponent } from './projects-list.component';

describe('ProjectsListComponent', () => {
  let component: ProjectsListComponent;
  let fixture: ComponentFixture<ProjectsListComponent>;
  let projectServiceMock: jasmine.SpyObj<ProjectService>;

  beforeEach(async () => {
    projectServiceMock = jasmine.createSpyObj('ProjectService', ['delete']);

    await TestBed.configureTestingModule({
      declarations: [ProjectsListComponent, ProjectsItemComponent],
      imports: [BrowserAnimationsModule],
      providers: [{ provide: ProjectService, useValue: projectServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty projects array by default', () => {
    expect(component.projects).toEqual([]);
  });

  it('should emit onEditClicked event when editProject is called', () => {
    spyOn(component.onEditClicked, 'emit');
    const projectId = 1;

    component.editProject(projectId);

    expect(component.onEditClicked.emit).toHaveBeenCalledWith(projectId);
  });

  it('should call delete method of ProjectService when deleteProject is called', () => {
    const projectId = 1;

    component.deleteProject(projectId);

    expect(projectServiceMock.delete).toHaveBeenCalledWith(projectId);
  });

  it('should handle multiple projects correctly', () => {
    const projects: Project[] = [
      {
        id: 1,
        type: ProjectTypeEnum.WORK_APPROVAL,
        status: ProjectStatusEnum.PENDING,
        description: 'Test Project',
        contractId: 1234567890,
        user: 'John Doe',
      },
      {
        id: 2,
        type: ProjectTypeEnum.WORK_APPROVAL,
        status: ProjectStatusEnum.PENDING,
        description: 'Test Project',
        contractId: 1234567890,
        user: 'John Doe',
      },
    ];
    component.projects = projects;
    fixture.detectChanges();

    expect(component.projects).toEqual(projects);
  });
});
