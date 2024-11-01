import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from './Services/login.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  implements OnInit {
  constructor(public loginService: LoginService,private sanitizer: DomSanitizer)
  {
  }
  

  //xss example
  mytest="<svg>blah</svg>"
  mytest1="<script>alert(document.cookie)</script>";
  //mytest2=this.sanitizer.bypassSecurityTrustUrl("<iframe src='http://www.lipsum.com'><iframe>")
  mytest2=this.sanitizer.bypassSecurityTrustScript("javascript:window.open('http://www.google.com')");

  ngOnInit() {
    // Check if the user is logged in on app initialization
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.loginService.currentUserName = user.email; // or however you want to store the username
    }
  }
  onSearchClick() {
    console.log('Search clicked for user:', this.loginService.currentUserName);
    // Implement search functionality here
  }
}
