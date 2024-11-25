import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuard } from 'src/app/Guards/can-activate.guard';
import { TasksComponent } from './Components/tasks/tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
   SharedModule,
    UserRoutingModule
  ],
  exports:
  [
    TasksComponent
  ]
})
export class UserModule { }
