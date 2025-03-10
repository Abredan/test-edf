import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { staggeredEnterAnimation } from '../../../shared/consts/animations';
import { Project } from '../../interfaces/project.interface';
import { ProjectService } from '../../services/project/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
  animations: [staggeredEnterAnimation('app-projects-item')],
})
export class ProjectsListComponent {
  @Input('projects') public projects: Project[] = [];
  @Output('onEditClicked') public onEditClicked = new EventEmitter<number>();
  private readonly projectService = inject(ProjectService);

  public editProject(id: number): void {
    this.onEditClicked.emit(id);
  }

  public deleteProject(id: number): void {
    this.projectService.delete(id);
  }
}
