import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuard } from 'src/app/can-activate.guard';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { MyProfileComponent } from '../my-profile/my-profile.component';


const routes: Routes = [

  {
      path: "admin", canActivate: [canActivateGuard], data: { expectedRoles: "Admin" }, children: [
          { path: "dashboard", component: DashboardComponent, },
          { path: "projects", component: ProjectsComponent },
          { path: "projects/view/:projectid", component: ProjectDetailsComponent },
          { path: "myProfile", component: MyProfileComponent }

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
