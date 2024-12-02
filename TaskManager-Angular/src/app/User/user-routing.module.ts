import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { canActivateGuard } from 'src/app/Guards/can-activate.guard';
import { TasksComponent } from './Components/tasks/tasks.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { CreateTaskComponent } from './Components/create-task/create-task.component';
import { EditTaskComponent } from './Components/edit-task/edit-task.component';
import { UpdateTaskStatusComponent } from './Components/update-task-status/update-task-status.component';


const routes: Routes = [

  { path: "User", canActivate: [ canActivateGuard ], data: { expectedRoles: ["User","Admin"] }, children: [
    { path: "tasks", component: TasksComponent },
    { path: "createtask", component: CreateTaskComponent, data: { linkIndex: 2 } },
    { path: "edittask/:taskid", component: EditTaskComponent, data: { linkIndex: 3 } },
    { path: "updatetaskstatus/:taskid", component: UpdateTaskStatusComponent, data: { linkIndex: 4 } },    
  ]},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class UserRoutingModule { }
