import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from "./projects/projects.component";
import { DashboardComponent } from './dashboard/dashboard.component'; // Standalone component
import { AboutComponent } from '../User/about/about.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { DashboardService } from "../Services/dashboard.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TeamSizeValidatorDirective } from "../team-size.directive";
import { ClientLocationStatusValidatorDirective } from "../client-location-status-validator.directive";
import { ProjectIDUniqueValidatorDirective } from '../project-idunique-validator.directive';
import { Login2fcComponent } from '../login2fc/login2fc.component';
import { ProjectComponent } from './project/project.component';
import { CheckBoxPrinterComponent  } from './check-box-printer/check-box-printer.component';
import { NumberTowardsPipe } from './number-towards.pipe';
import { FilterPipe } from './filter.pipe';
import { PagingPipe } from './paging.pipe';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';

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
    CheckBoxPrinterComponent,
    NumberTowardsPipe,
    FilterPipe,
    PagingPipe,
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule, // Import standalone component here
    AdminRoutingModule
  ],
  exports: [
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    ProjectComponent,
    DashboardComponent,
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    ProjectIDUniqueValidatorDirective, // Export standalone component here if needed,
    CheckBoxPrinterComponent,
    ProjectDetailsComponent
  ],
  providers: [DashboardComponent]
})
export class AdminModule { }
