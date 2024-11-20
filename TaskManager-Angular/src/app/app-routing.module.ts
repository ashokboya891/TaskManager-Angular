import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AboutComponent } from './User/about/about.component';
import { MyProfileComponent } from './admin/my-profile/my-profile.component';
import {LoginComponent  } from "../app/login/login.component";
import {ProjectsComponent  } from "../app/admin/projects/projects.component";
import { canActivateGuard } from './can-activate.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TasksComponent } from './User/tasks/tasks.component';
import { Login2fcComponent } from './login2fc/login2fc.component';
import { ProjectDetailsComponent } from './admin/project-details/project-details.component';
const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignUpComponent },

  // {
  //   path: "admin", canActivate: [canActivateGuard], data: { expectedRoles: ["Admin","SuperUser" ]}, children: [
  //     { path: "dashboard", component: DashboardComponent, },
  //     { path: "projects", component: ProjectsComponent },
  //     { path: "projects/view/:projectid", component: ProjectDetailsComponent },
  //     {path:"myProfile",component:MyProfileComponent}
  //   ]
  // },

  // {
  //   path: "User", canActivate: [canActivateGuard], data: { expectedRoles:[ "User","Admin"] }, children: [
  //     { path: "tasks", component: TasksComponent },
  //     { path: "about", component: AboutComponent },

  //   ]
  // },
];
  // {
  //   path:"admin",canActivate:[canActivateGuard],data:{expectedRoles:"Admin"},children:[
  //     {path:"dashboard",component:DashboardComponent},
  //   ]
  // },
  // {
  //   path: "dashboard", component: DashboardComponent, canActivate: [canActivateGuard], data: {
  //     expectedRoles: ["Admin"]  // Allow both roles
  //   }
  // },
//   {
//     path: "projects", component: ProjectsComponent, canActivate: [canActivateGuard], data: {
//       expectedRoles: ["Admin"]  // Only Admins can access this
//     }
//   },
//   {
//     path: "about", component: AboutComponent, canActivate: [canActivateGuard], data: {
//       expectedRoles: [ "Admin","User"]  // Allow both roles
//     }
//   },
//   {
//     path: "myProfile", component: MyProfileComponent, canActivate: [canActivateGuard], data: {
//       expectedRoles: ["Admin"]  // Allow both roles
//     }
//   },
//   {
//     path: "", component: LoginComponent,pathMatch:"full"
//   },
//   {
//     path: "signup", component: SignUpComponent
//   },
//   {
//     path: "login2FA", component: Login2fcComponent

//   },
//   {
//     path: "tasks", component: TasksComponent,canActivate: [canActivateGuard], data: {
//       expectedRoles: [ "Admin","User"]  // Allow both roles
//     }
//   },
//   { path: "projects/view/:projectid", component: ProjectDetailsComponent, canActivate: [canActivateGuard], data: {
//     expectedRoles: [ "Admin"]  // Allow both roles
//   }
// },
 
// ];
@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
