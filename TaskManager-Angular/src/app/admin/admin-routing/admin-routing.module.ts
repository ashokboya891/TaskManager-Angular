import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuard } from 'src/app/Guards/can-activate.guard';
import { DashboardComponent } from '../Components/dashboard/dashboard.component';
import { ProjectsComponent } from '../Components/projects/projects.component';
import { ProjectDetailsComponent } from '../Components/project-details/project-details.component';
import { MyProfileComponent } from '../Components/my-profile/my-profile.component';


const routes: Routes = [

  {
      path: "", canActivate: [canActivateGuard], data: { expectedRoles: "Admin" }, children: [
          { path: "dashboard", component: DashboardComponent, data: { linkIndex: 0 }},
          { path: "projects", component: ProjectsComponent,data: { linkIndex: 1 } },
          { path: "projects/view/:projectid", component: ProjectDetailsComponent,data: { linkIndex: 2 } },
          { path: "myProfile", component: MyProfileComponent,data: { linkIndex: 3 } }

      ]
  },

];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
