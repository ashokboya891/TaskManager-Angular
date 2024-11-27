import { NgModule } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { ProjectsComponent } from "./Components/projects/projects.component";
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { MyProfileComponent } from './Components/my-profile/my-profile.component';
import { Login2fcComponent } from '../Components/login2fc/login2fc.component';
import { ProjectComponent } from './Components/project/project.component';
import { CheckBoxPrinterComponent } from './Components/check-box-printer/check-box-printer.component';
import { ProjectDetailsComponent } from './Components/project-details/project-details.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CountriesComponent } from './Components/countries/countries.component';
import { ClientLocationsComponent } from './Components/client-locations/client-locations.component';
import { TaskPrioritiesComponent } from './Components/task-priorities/task-priorities.component';
import { TaskStatusComponent } from './Components/task-status/task-status.component';
import { MastersComponent } from './Components/masters/masters.component';
@NgModule({
  declarations: [
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    Login2fcComponent,
    ProjectComponent,
    DashboardComponent,
    CheckBoxPrinterComponent,
    ProjectDetailsComponent,
    CountriesComponent,
    ClientLocationsComponent,
    TaskPrioritiesComponent,
    TaskStatusComponent,
    MastersComponent

  ],
  imports: [SharedModule, AdminRoutingModule],
  exports: [
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    ProjectComponent,
    DashboardComponent,
    CheckBoxPrinterComponent,
    ProjectDetailsComponent,
  ],
  providers: [DashboardComponent]
})
export class AdminModule { }
