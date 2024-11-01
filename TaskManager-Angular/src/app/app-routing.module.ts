import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AboutComponent } from './admin/about/about.component';
import { MyProfileComponent } from './admin/my-profile/my-profile.component';
import {LoginComponent  } from "../app/login/login.component";
import {ProjectsComponent  } from "../app/admin/projects/projects.component";
import { canActivateGuard } from './can-activate.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
const routes: Routes = [
  {
    path: "dashboard", component: DashboardComponent, canActivate: [canActivateGuard], data: {
      expectedRoles: ["Admin"]  // Allow both roles
    }
  },
  {
    path: "projects", component: ProjectsComponent, canActivate: [canActivateGuard], data: {
      expectedRoles: ["Admin"]  // Only Admins can access this
    }
  },
  {
    path: "about", component: AboutComponent, canActivate: [canActivateGuard], data: {
      expectedRoles: [ "Admin","User"]  // Allow both roles
    }
  },
  {
    path: "myProfile", component: MyProfileComponent, canActivate: [canActivateGuard], data: {
      expectedRoles: ["Admin","User"]  // Allow both roles
    }
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "signup", component: SignUpComponent
  },
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
