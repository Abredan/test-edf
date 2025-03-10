import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../shared/components/input/input.component';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { ProjectsContainerComponent } from './components/projects-container/projects-container.component';
import { ProjectsFormComponent } from './components/projects-form/projects-form.component';
import { ProjectsItemComponent } from './components/projects-item/projects-item.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';

@NgModule({
  declarations: [
    ProjectsContainerComponent,
    ProjectsListComponent,
    ProjectsItemComponent,
    ProjectsFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectsRoutingModule,

    ModalComponent,
    InputComponent,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectsModule {}
