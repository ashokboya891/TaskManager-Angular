import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
  currentUserName: string | null = null;
  currentUserRole: string | null = null;
     private httpClient: HttpClient | null = null;

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  // Observable to track login state
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private httpbackend: HttpBackend, private jwtHelperService: JwtHelperService,) {
    const user = sessionStorage.getItem('currentUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.currentUserName = parsedUser.email;
      this.currentUserRole = parsedUser.roles[0];
      this.isLoggedInSubject.next(true); // Set login state
    }
  }

  public Login(login: any): Observable<any> {

    this.httpClient = new HttpClient(this.httpbackend);
    return this.httpClient.post<any>(`${this.url}/Login`, login, { responseType: 'json' }).pipe(
      map((user) => {
        if (user) {
          this.currentUserName = user.email;
          this.currentUserRole = user.roles[0];
          localStorage.setItem('token', user.token);
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.isLoggedInSubject.next(true); // Notify login state
        }
        return user;
      })
    );
  }

  public Logout(): void {
    this.currentUserName = null;
    this.currentUserRole = null;
    localStorage.removeItem('token');
    sessionStorage.removeItem('currentUser');
    this.isLoggedInSubject.next(false); // Notify logout state
  }
  public getAllEmployes(): Observable<any>
  {
    this.httpClient = new HttpClient(this.httpbackend);
    return this.httpClient.get<any>("https://localhost:7018/api/Account/api/getallemployees", { responseType: "json" });
  }
  // currentUserName: string | null = null;
  // currentUserRole: string | null = null;
  // private httpClient: HttpClient | null = null;
  // // private url = 'http://localhost:5114/api'; // Update as per your API URL

  // constructor(private httpbackend: HttpBackend, private jwtHelperService: JwtHelperService) {
  //   // Initialize from session storage
  //   const user = sessionStorage.getItem('currentUser');
  //   if (user) {
  //     const parsedUser = JSON.parse(user);
  //     this.currentUserName = parsedUser.email;
  //     this.currentUserRole = parsedUser.roles[0];
  //   }
  // }

  // public Login(login: any): Observable<any> {
  //   this.httpClient = new HttpClient(this.httpbackend);
  //   return this.httpClient.post<any>(`${this.url}/Login`, login, { responseType: 'json' }).pipe(
  //     map((user) => {
  //       if (user) {
  //         this.currentUserName = user.email;
  //         this.currentUserRole = user.roles[0]; // Assuming roles is an array
  //         console.log(this.currentUserRole+"from login service mowa")
  //         localStorage.setItem('token', user.token);
  //         sessionStorage.setItem('currentUser', JSON.stringify(user));
  //       }
  //       return user;
  //     })
  //   );
  // }

  // public Logout(): void {
  //   this.currentUserName = null;
  //   this.currentUserRole = null;
  //   localStorage.removeItem('token');
  //   sessionStorage.removeItem('currentUser');
  // }

  // public isAuthenticated(): boolean {
  //   const token = localStorage.getItem('token');
  //   return token != null && !this.isTokenExpired(token);
  // }

  // currentUserName:any=null;
  // currentUserRole: any= null;

  // private httpClient:HttpClient|null=null;

  // constructor(private httpbackend:HttpBackend,private jwtHelperService:JwtHelperService) { }
  
  // public Login(login: LoginViewModel): Observable<any> {
  //   this.httpClient = new HttpClient(this.httpbackend);
  //   return this.httpClient.post<any>(`${this.url}/Login`, login, { responseType: 'json' }).pipe(
  //     map(user => {
  //       if (user) {
         
  //             this.currentUserName = user.email;
  //             this.currentUserRole = user.role
  //             console.log(this.currentUserRole+"from login service");
  //             console.log(this.currentUserName+"in login servcie");
  //             localStorage.setItem("token", user.token);
  //             sessionStorage['currentUser'] = JSON.stringify(user);
            
  //      // Assuming you store a token
  //       }
  //       return user;
  //     })
  //   );
  // }
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

  // public Logout() {
  //   sessionStorage.removeItem("currentUser");
  //   localStorage.removeItem("token");
  //   this.currentUserName = null;
  // }
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
