import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginViewModel } from '../login-view-model';
import { User } from '../User';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { JwtHelperService  } from "@auth0/angular-jwt";
import { RegisterViewModel } from '../register-view-model';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string="https://localhost:7018/api/Account";
  currentUserName:any=null;
  private httpClient:HttpClient|null=null;
  constructor(private httpbackend:HttpBackend,private jwtHelperService:JwtHelperService) { }
  
  public Login(login: LoginViewModel): Observable<any> {
    this.httpClient = new HttpClient(this.httpbackend);
    return this.httpClient.post<any>(`${this.url}/Login`, login, { responseType: 'json' }).pipe(
      map(user => {
        if (user) {
         
              this.currentUserName = user.email;
              console.log(this.currentUserName+"in login servcie");
              localStorage.setItem("token", user.token);
              sessionStorage['currentUser'] = JSON.stringify(user);
            
       // Assuming you store a token
        }
        return user;
      })
    );
  }
  public Register(signUpViewModel: RegisterViewModel): Observable<any>
  {
    this.httpClient = new HttpClient(this.httpbackend);
    return this.httpClient.post<any>(this.url + "/register", signUpViewModel, { responseType: "json", observe: "response" })
      .pipe(map(response =>
      {
        if (response)
        {
          this.currentUserName = response.body.userName;
          sessionStorage['currentUser'] = JSON.stringify(response.body);
        }
        return response.body;
      }));
    // this.httpClient = new HttpClient(this.httpbackend);
    // return this.httpClient.post<any>(this.url + "/register", signUpViewModel, { responseType: "json"})
    //   .pipe(map(response =>
    //   {
    //     if (response)
    //     {
    //       this.currentUserName = response.body.userName;
    //       this.currentUserName = response.body.email;
    //       console.log(this.currentUserName+"in login servcie register method");
    //       localStorage.setItem("token", response.token);
    //       sessionStorage['currentUser'] = JSON.stringify(response);
    //     }
    //     return response.body;
    //   }));
  }
  getUserByEmail(Email: string): Observable<any>
  {
    this.httpClient = new HttpClient(this.httpbackend);
    return this.httpClient.get<any>(this.url + "/getUserByEmail/" + Email, { responseType: "json" });
  }

  public Logout() {
    sessionStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    this.currentUserName = null;
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    if (token && !this.jwtHelperService.isTokenExpired(token)) {
      const currentUser = sessionStorage.getItem('currentUser');
      if (currentUser) {
        this.currentUserName = JSON.parse(currentUser).email; // Set the current user name
      }
      return true; // Token is valid
    }
    return false; // Token is not valid
  }
  
  
  

}
