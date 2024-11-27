import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from './Services/login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLoggerService } from './Services/router-logger.service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { fadeAnimation, keyFrameAnimation, slideLeftOrRightAnimation, slideUpAnimation, zoomLeftAnimation, zoomUpAnimation } from './my_Animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[keyFrameAnimation]
})
export class AppComponent  implements OnInit {
  constructor(public loginService: LoginService,private sanitizer: DomSanitizer,private routerLoggerService: RouterLoggerService, private router: Router)
  {
  }
  

  //xss example
  mytest="<svg>blah</svg>"
  mytest1="<script>alert(document.cookie)</script>";
  //mytest2=this.sanitizer.bypassSecurityTrustUrl("<iframe src='http://www.lipsum.com'><iframe>")
  mytest2=this.sanitizer.bypassSecurityTrustScript("javascript:window.open('http://www.google.com')");

  ngOnInit() {

    const currentUser = sessionStorage.getItem('currentUser');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let userName = (this.loginService.currentUserName) ? this.loginService.currentUserName : "anonymous";
        let logMsg = new Date().toLocaleString() + ": " + userName + " navigates to " + event.url;
        this.routerLoggerService.log(logMsg).subscribe();
      }
      if (currentUser) {
        const user = JSON.parse(currentUser);
        this.loginService.currentUserName = user.email; // or however you want to store the username
      }
    });
  
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     let userName = (this.loginService.currentUserName) ? this.loginService.currentUserName : "anonymous";
    //     const user = JSON.parse(userName);
    //     this.loginService.currentUserName = user.email;
    //     let logMsg = new Date().toLocaleString() + ": " + userName + " navigates to " + event.url;

    //     this.routerLoggerService.log(logMsg).subscribe();
    //   }
    //   if (currentUser) {
    //     const user = JSON.parse(currentUser);
    //     this.loginService.currentUserName = user.email;
    //    // or however you want to store the username
    //   }
    // });
  
  }

  onSearchClick() {
    console.log('Search clicked for user:', this.loginService.currentUserName);
    // Implement search functionality here
  }
  
  getState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute.snapshot.url[0].path && outlet.activatedRouteData["linkIndex"] : "none";
  }
}
