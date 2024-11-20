import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuard } from 'src/app/can-activate.guard';
import { TasksComponent } from '../tasks/tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from '../user-routing/user-routing.module';

@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  exports:
  [
    TasksComponent
  ]
})
export class UserModule { }
