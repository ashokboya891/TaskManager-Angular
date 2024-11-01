import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../User';
import { LoginViewModel } from '../login-view-model';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../NotificationService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  loginviewmodel: LoginViewModel = new LoginViewModel();
  loginError:string="";
 

  ngOnInit(): void {

  }
  constructor(private loginservie:LoginService,private routerService:Router,private notificationService:NotificationService) {
  }

  onLoginClick(event: any)
  {
    this.loginservie.Login(this.loginviewmodel).subscribe(
      (response) =>
      {
        localStorage["token"] = response.token;
        this.routerService.navigateByUrl("/myProfile");
        // this.toast.success("logged in..!")
      },
      (error) => {
        if (error.error && error.error.detail) {
          this.notificationService.showError(error.error.detail);
        } else {
          // Fallback for unexpected errors
          this.notificationService.showError('An unexpected error occurred.');
        }
      }
    );
  }
  
}
