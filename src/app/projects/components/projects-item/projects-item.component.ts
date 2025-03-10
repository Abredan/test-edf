import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { cardAnimation } from '../../../shared/consts/animations';
import {
  Project,
  ProjectStatusEnum,
  ProjectTypeEnum,
} from '../../interfaces/project.interface';

@Component({
  selector: 'app-projects-item',
  templateUrl: './projects-item.component.html',
  styleUrl: './projects-item.component.scss',
  animations: [cardAnimation],
})
export class ProjectsItemComponent {
  @Input('project') public project!: Project;
  @Output('onDeleteClicked') public onDeleteClicked =
    new EventEmitter<number>();
  @Output('onEditClicked') public onEditClicked = new EventEmitter<number>();

  public projectStatusEnum = ProjectStatusEnum;
  public projectTypeEnum = ProjectTypeEnum;
  public isDeleting = signal<boolean>(false);

  public projectType = computed(() => {
    switch (this.project?.type) {
      case ProjectTypeEnum.WORK_APPROVAL:
        return "Demande d'autorisation de travaux";
      default:
        return null;
    }
  });

  public projectStatus = computed(() => {
    switch (this.project?.status) {
      case ProjectStatusEnum.PENDING:
        return 'En cours';
      case ProjectStatusEnum.STATUT:
        return 'Statut';
      default:
        return null;
    }
  });

  public onEdit() {
    const projectId = this.project?.id;
    if (!projectId) return;
    this.onEditClicked.emit(projectId);
  }

  public onDelete() {
    this.isDeleting.set(true);
  }

  public onAnimationDone() {
    if (this.isDeleting()) {
      const projectId = this.project?.id;
      if (!projectId) {
        this.isDeleting.set(false);
        return;
      }

      this.onDeleteClicked.emit(projectId);
    }
  }
}
