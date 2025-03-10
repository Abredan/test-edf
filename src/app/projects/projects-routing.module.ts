import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsContainerComponent } from './components/projects-container/projects-container.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
