import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginViewModel } from '../Models/login-view-model';
import { User } from '../Models/User';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { JwtHelperService  } from "@auth0/angular-jwt";
import { RegisterViewModel } from '../Models/register-view-model';
import { Login2FA } from '../Models/login2-fa';
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
  
  Login2fa(login2Fa:Login2FA):Observable<any>{
    //https://localhost:7018/api/Account/login-2FA?code=410027&username=aboya375%40gmail.com
      this.httpClient = new HttpClient(this.httpbackend);
      const code = encodeURIComponent(login2Fa.code);
const username = encodeURIComponent(login2Fa.username);
return this.httpClient.post<any>(`${this.url}/login-2FA?code=${code}&username=${username}`, { responseType: 'json' }).pipe(
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
    

}
