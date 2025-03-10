import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../../interfaces/project.interface';
import { ProjectService } from '../../services/project/project.service';
import { ProjectsFormComponent } from '../projects-form/projects-form.component';

@Component({
  selector: 'app-projects-container',
  templateUrl: './projects-container.component.html',
  styleUrl: './projects-container.component.scss',
})
export class ProjectsContainerComponent implements OnInit, OnDestroy {
  @ViewChild('projectForm', { static: true })
  projectForm!: ProjectsFormComponent;
  private readonly projectService = inject(ProjectService);

  public projects = signal<Project[]>([]);
  public project = signal<Project | undefined>(undefined);
  private _projectSubs!: Subscription;

  public ngOnInit(): void {
    this._projectSubs = this.projectService.getAll().subscribe((data) => {
      this.projects.set(data);
    });
  }

  public editProject(id: number): void {
    this.projectService.getById(id).subscribe((project) => {
      this.project.set(project);
      this.openModal(this.project());
    });
  }

  public createProject() {
    this.project.set(undefined);
    this.openModal();
  }

  public openModal(project?: Project) {
    this.projectForm.openModal(project);
  }

  public ngOnDestroy(): void {
    this._projectSubs.unsubscribe();
  }
}
