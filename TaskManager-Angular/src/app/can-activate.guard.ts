import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../app/Services/login.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from './NotificationService';

export const canActivateGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const jwtHelperService = inject(JwtHelperService);
  const notificationService = inject(NotificationService);

  // Check if the user is authenticated
  if (loginService.isAuthenticated()) {
    const currentUser = sessionStorage.getItem("currentUser");

    if (currentUser) {
      const userData = JSON.parse(currentUser);
      const userRoles: string[] = userData.roles || []; // Get roles from stored user data
      console.log('User Roles:', userRoles); // Log user roles for debugging

      // Fetch expected role(s) and ensure it's an array
      let expectedRoles = route.data['expectedRoles']; // Match with the route key
      if (typeof expectedRoles === 'string') {
        expectedRoles = [expectedRoles]; // Convert single role to an array
      }

      console.log('Expected Roles:', expectedRoles); // Log expected roles for debugging

      // Check if the user has the expected role
      const hasRole = expectedRoles.some((role: string) => userRoles.includes(role));
      console.log(hasRole + " from guard"); // Check the result of the role check

      if (hasRole) {
        return true; // The user can navigate to the route
      }
    }
  }

  // Redirect to login if not authenticated or role does not match
  notificationService.showError('You are not authorized to access this page.');
  return false; // The user can't navigate to the route
};

// export const canActivateGuard: CanActivateFn = (route, state) => {
//   const loginService = inject(LoginService);
//   const router = inject(Router);
//   const jwtHelperService = inject(JwtHelperService);
//   const notificationService=inject(NotificationService)
//   // Check if the user is authenticated
//   if (loginService.isAuthenticated()) {
//     const currentUser = sessionStorage.getItem("currentUser");
    
//     if (currentUser) {
//       const userData = JSON.parse(currentUser);
//       const userRoles: string[] = userData.roles || []; // Get roles from the stored user data
//       console.log('User Roles:', userRoles); // Log user roles for debugging

//       const expectedRoles: string[] = route.data['expectedRoles'] || [];
//       console.log('Expected Roles:', expectedRoles); // Log expected roles for debugging

//       // Check if the user has the expected role
//       const hasRole = expectedRoles.some((role: string) => userRoles.includes(role));
//       console.log(hasRole + " from guard"); // Check the result of the role check

//       if (hasRole) {
//         return true; // The user can navigate to the route
//       }
//     }
//   }

//   // Redirect to login if not authenticated or role does not match
//   notificationService.showError('You are not authorized to access this page.'); 
//   return false; // The user can't navigate to the route
// };



// //   const loginService = inject(LoginService);
// //   const router = inject(Router);

// //   console.log(router.url);
// //   if (loginService.isAuthenticated()) {
// //     return true; // The user can navigate to the route
// //   } else {
// //     router.navigate(['login']);
// //     return false; // The user can't navigate to the route
// //   }
// // };
