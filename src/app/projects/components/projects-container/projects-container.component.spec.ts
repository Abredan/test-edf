import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { FAKE_PROJECTS } from '../../../shared/consts/mocks';
import { ProjectService } from '../../services/project/project.service';
import { ProjectsFormComponent } from '../projects-form/projects-form.component';
import { ProjectsContainerComponent } from './projects-container.component';

describe('ProjectsContainerComponent', () => {
  let component: ProjectsContainerComponent;
  let fixture: ComponentFixture<ProjectsContainerComponent>;
  let projectServiceMock: jasmine.SpyObj<ProjectService>;
  let mockProjects = FAKE_PROJECTS;

  beforeEach(async () => {
    projectServiceMock = jasmine.createSpyObj('ProjectService', [
      'getAll',
      'getById',
    ]);

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
      declarations: [ProjectsContainerComponent, ProjectsFormComponent],
      providers: [{ provide: ProjectService, useValue: projectServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsContainerComponent);
    component = fixture.componentInstance;
    projectServiceMock.getAll.and.returnValue(of(mockProjects));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load projects on init', () => {
    component.ngOnInit();
    expect(component.projects()).toEqual(mockProjects);
  });

  it('should set project to edit on editProject call', () => {
    const projectId = 1;
    projectServiceMock.getById.and.returnValue(of(mockProjects[0]));
    spyOn(component.projectForm, 'openModal');
    component.editProject(projectId);
    expect(component.project()).toEqual(mockProjects[0]);
  });

  it('should open modal with an existing project', () => {
    spyOn(component.projectForm, 'openModal');
    const project = mockProjects[0];

    component.openModal(project);

    expect(component.projectForm.openModal).toHaveBeenCalledWith(project);
  });

  it('should open modal with no project', () => {
    spyOn(component.projectForm, 'openModal');

    component.createProject();

    expect(component.project()).toBeUndefined();
    expect(component.projectForm.openModal).toHaveBeenCalledWith(undefined);
  });

  it('should unsubscribe on destroy', () => {
    const unsubscribeSpy = spyOn(
      Subscription.prototype,
      'unsubscribe'
    ).and.callThrough();
    component.ngOnInit();

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
