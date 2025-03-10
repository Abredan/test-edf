import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import {
  ProjectStatusEnum,
  ProjectTypeEnum,
} from '../../interfaces/project.interface';
import { ProjectService } from '../../services/project/project.service';
import { ProjectsFormComponent } from './projects-form.component';

describe('ProjectsFormComponent', () => {
  let component: ProjectsFormComponent;
  let fixture: ComponentFixture<ProjectsFormComponent>;
  let projectServiceMock: jasmine.SpyObj<ProjectService>;

  beforeEach(async () => {
    projectServiceMock = jasmine.createSpyObj('ProjectService', [
      'create',
      'update',
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserAnimationsModule, ModalComponent],
      declarations: [ProjectsFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: ProjectService, useValue: projectServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    component.openModal();

    expect(component.form.value).toEqual({
      description: '',
      contractId: '',
      user: '',
    });
  });

  it('should patch form values when opening modal with a project', () => {
    const project = {
      id: 1,
      description: 'Test Project',
      contractId: 1234567890,
      user: 'John Doe',
      status: ProjectStatusEnum.PENDING,
      type: ProjectTypeEnum.WORK_APPROVAL,
    };
    component.openModal(project);

    expect(component.form.value).toEqual({
      description: 'Test Project',
      contractId: 1234567890,
      user: 'John Doe',
    });
  });

  it('should call create method of ProjectService on save for a new project', () => {
    component.form.patchValue({
      description: 'New Project',
      contractId: 1234567890,
      user: 'User Name',
    });

    component.save();

    expect(projectServiceMock.create).toHaveBeenCalledWith({
      description: 'New Project',
      contractId: 1234567890,
      user: 'User Name',
    });
  });

  it('should call update method of ProjectService on save for an existing project', () => {
    const project = {
      id: 1,
      description: 'Test Project',
      contractId: 1234567890,
      user: 'John Doe',
      status: ProjectStatusEnum.PENDING,
      type: ProjectTypeEnum.WORK_APPROVAL,
    };
    component.project = project;
    component.openModal(project);
    component.form.patchValue({
      description: 'Updated Project',
      contractId: 1234567890,
      user: 'User Name',
    });

    component.save();

    expect(projectServiceMock.update).toHaveBeenCalledWith(1, {
      description: 'Updated Project',
      contractId: 1234567890,
      user: 'User Name',
    });
  });

  it('should reset form and close modal on closeModal', () => {
    spyOn(component.modal, 'close');

    component.closeModal();

    expect(component.form.value).toEqual({
      description: null,
      contractId: null,
      user: null,
    });
    expect(component.modal.close).toHaveBeenCalled();
  });
});
