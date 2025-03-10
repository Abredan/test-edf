import { Component, inject, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { Project } from '../../interfaces/project.interface';
import { ProjectService } from '../../services/project/project.service';

@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrl: './projects-form.component.scss',
})
export class ProjectsFormComponent {
  @Input() public project!: Project | undefined;
  @ViewChild('modal', { static: true }) public modal!: ModalComponent;
  private readonly projectService = inject(ProjectService);

  get modalTitle() {
    return this.project?.id
      ? "Modifier une demande d'autorisation"
      : "Ajouter une demande d'autorisation";
  }

  public form: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required]),
    contractId: new FormControl('', [Validators.minLength(10)]),
    user: new FormControl('', [Validators.required]),
  });

  public save() {
    const data = this.form.value;
    const projectId = this.project?.id;
    if (projectId) {
      this.projectService.update(projectId, data);
    } else {
      this.projectService.create(data);
    }
    this.closeModal();
  }

  public openModal(project?: Project) {
    if (project) {
      this.form.patchValue({
        description: project.description ?? '',
        contractId: project.contractId ?? '',
        user: project.user ?? '',
      });
    }

    this.modal.open();
  }

  public closeModal() {
    this.form.reset();
    this.modal.close();
  }
}
