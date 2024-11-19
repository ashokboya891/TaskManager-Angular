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
        //this.notificationService.showSuccess("otp sended to registerd mail please check")
        this.routerService.navigateByUrl("/about");
        // this.toast.success("logged in..!")
      },
        (error) =>
        {
          console.log(error);
                this.notificationService.showError('Invalid email or Password');
          this.loginError = "Invalid email or Password";
        },
      // (error) => {
      //   if (error.error && error.error.detail) {
      //     this.notificationService.showError(error.error.detail);
          
      //     this.loginError="invalid email or password";
      //   } else {
      //     // Fallback for unexpected errors
      //     this.notificationService.showError('An unexpected error occurred.');
      //   }
      // }
    );
  }
  
}
