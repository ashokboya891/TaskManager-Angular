import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from "../admin/projects/projects.component";
import { DashboardComponent } from './dashboard/dashboard.component'; // Standalone component
import { AboutComponent } from './about/about.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { DashboardService } from "../Services/dashboard.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TeamSizeValidatorDirective } from "../team-size.directive";
import { ClientLocationStatusValidatorDirective } from "../client-location-status-validator.directive";
import { ProjectIDUniqueValidatorDirective } from '../project-idunique-validator.directive';
import { Login2fcComponent } from '../login2fc/login2fc.component';
import { ProjectComponent } from './project/project.component';

@NgModule({
  declarations: [
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    ProjectIDUniqueValidatorDirective,
    Login2fcComponent,
    ProjectComponent,
    DashboardComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule // Import standalone component here
  ],
  exports: [
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    ProjectComponent,
    DashboardComponent,
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    ProjectIDUniqueValidatorDirective // Export standalone component here if needed
  ],
  providers: [DashboardComponent]
})
export class AdminModule { }
