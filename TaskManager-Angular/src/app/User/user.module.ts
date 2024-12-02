import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuard } from 'src/app/Guards/can-activate.guard';
import { TasksComponent } from './Components/tasks/tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EditTaskComponent } from './Components/edit-task/edit-task.component';
import { CreateTaskComponent } from './Components/create-task/create-task.component';
import { UpdateTaskStatusComponent } from './Components/update-task-status/update-task-status.component';

@NgModule({
  declarations: [
    TasksComponent,
    EditTaskComponent,
    CreateTaskComponent,
    UpdateTaskStatusComponent
  ],
  imports: [
   SharedModule,
    UserRoutingModule
  ],
  exports:
  [
    TasksComponent,
    EditTaskComponent,
    CreateTaskComponent,
    UpdateTaskStatusComponent
  ]
})
export class UserModule { }
