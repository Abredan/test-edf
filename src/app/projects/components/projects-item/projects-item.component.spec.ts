import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FAKE_PROJECTS } from '../../../shared/consts/mocks';
import {
  Project,
  ProjectStatusEnum,
  ProjectTypeEnum,
} from '../../interfaces/project.interface';
import { ProjectsItemComponent } from './projects-item.component';

describe('ProjectsItemComponent', () => {
  let component: ProjectsItemComponent;
  let fixture: ComponentFixture<ProjectsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsItemComponent],
      imports: [CommonModule, BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsItemComponent);
    component = fixture.componentInstance;
    component.project = FAKE_PROJECTS[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct project type', () => {
    const project: Project = {
      id: 1,
      type: ProjectTypeEnum.WORK_APPROVAL,
      status: ProjectStatusEnum.PENDING,
      description: 'Test Project',
      contractId: 1234567890,
      user: 'John Doe',
    };
    component.project = project;
    fixture.detectChanges();

    expect(component.projectType()).toEqual(
      "Demande d'autorisation de travaux"
    );
  });

  it('should emit onEditClicked event when onEdit is called', () => {
    const project: Project = {
      id: 1,
      type: ProjectTypeEnum.WORK_APPROVAL,
      status: ProjectStatusEnum.PENDING,
      description: 'Test Project',
      contractId: 1234567890,
      user: 'John Doe',
    };
    component.project = project;
    spyOn(component.onEditClicked, 'emit');

    component.onEdit();

    expect(component.onEditClicked.emit).toHaveBeenCalledWith(1);
  });

  it('should set isDeleting to true when onDelete is called', () => {
    component.onDelete();
    expect(component.isDeleting()).toBeTrue();
  });

  it('should emit onDeleteClicked event when onAnimationDone is called while isDeleting is true', () => {
    const project: Project = {
      id: 1,
      type: ProjectTypeEnum.WORK_APPROVAL,
      status: ProjectStatusEnum.PENDING,
      description: 'Test Project',
      contractId: 1234567890,
      user: 'John Doe',
    };
    component.project = project;
    component.isDeleting.set(true);
    spyOn(component.onDeleteClicked, 'emit');

    component.onAnimationDone();

    expect(component.onDeleteClicked.emit).toHaveBeenCalledWith(1);
  });

  it('should emit onDeleteClicked event when onAnimationDone is called while isDeleting is true', () => {
    const project: Project = {
      id: 1,
      type: ProjectTypeEnum.WORK_APPROVAL,
      status: ProjectStatusEnum.PENDING,
      description: 'Test Project',
      contractId: 1234567890,
      user: 'John Doe',
    };
    component.project = project;
    component.isDeleting.set(true);
    spyOn(component.onDeleteClicked, 'emit');

    component.onAnimationDone();

    expect(component.onDeleteClicked.emit).toHaveBeenCalledWith(1);
  });

  it('should not emit onDeleteClicked if project id is undefined during onAnimationDone', () => {
    component.project = {
      id: undefined,
      type: ProjectTypeEnum.WORK_APPROVAL,
      status: ProjectStatusEnum.PENDING,
      description: 'Test Project',
      contractId: 1234567890,
      user: 'John Doe',
    } as any;
    component.isDeleting.set(true);
    spyOn(component.onDeleteClicked, 'emit');

    component.onAnimationDone();

    expect(component.onDeleteClicked.emit).not.toHaveBeenCalled();
    expect(component.isDeleting()).toBeFalse(); // Check that isDeleting is reset
  });

  it('should reset isDeleting to false if project id is undefined during onAnimationDone', () => {
    component.project = {
      id: undefined,
      type: ProjectTypeEnum.WORK_APPROVAL,
      status: ProjectStatusEnum.PENDING,
      description: 'Test Project',
      contractId: 1234567890,
      user: 'John Doe',
    } as any;
    component.isDeleting.set(true);

    component.onAnimationDone();

    expect(component.isDeleting()).toBeFalse();
  });
});
