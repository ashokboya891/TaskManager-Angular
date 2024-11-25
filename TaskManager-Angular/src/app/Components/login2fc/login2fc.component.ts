import { Component, OnInit } from '@angular/core';
import { Login2FA } from '../../Models/login2-fa';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../Services/NotificationService';

@Component({
  selector: 'app-login2fc',
  templateUrl: './login2fc.component.html',
  styleUrls: ['./login2fc.component.scss']
})
export class Login2fcComponent  implements OnInit{
  login2fa: Login2FA = new Login2FA();
  loginError:string="";

 

  ngOnInit(): void {

  }
  constructor(private loginservie:LoginService,private routerService:Router,private notificationService:NotificationService) {
  }

  onLoginClick(event: any)
  {
    this.loginservie.Login2fa(this.login2fa).subscribe(
      (response) =>
      {
        localStorage["token"] = response.token;
        this.routerService.navigateByUrl("/login2FA");
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
