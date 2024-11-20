import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { canActivateGuard } from 'src/app/can-activate.guard';
import { TasksComponent } from '../tasks/tasks.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../about/about.component';


const routes: Routes = [

  { path: "User", canActivate: [ canActivateGuard ], data: { expectedRoles: ["User","Admin"] }, children: [
    { path: "tasks", component: TasksComponent },
    {path:"about",component:AboutComponent}
  ]},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class UserRoutingModule { }
