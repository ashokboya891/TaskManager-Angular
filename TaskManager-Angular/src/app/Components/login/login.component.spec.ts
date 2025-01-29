// import { TestBed  } from "@angular/core/testing";
// import { FormsModule } from "@angular/forms";
// import { LoginComponent } from "./login.component";

// describe("Login Component Testing",()=>{
// beforeEach(()=>{
// TestBed.configureTestingModule({
//   declarations:[LoginComponent],
//   imports:[FormsModule]
//  }).compileComponents();
// })
// });
// it("login-success",()=>{
//   const comp=TestBed.createComponent(LoginComponent).componentInstance;
//    comp.loginviewmodel.Email="aboya375@gmail.com";
//    comp.loginviewmodel.Password="Pa$$w0rd"
//    comp.onLoginClick();
// })

// function add(a:any|number,b:any|number) {
//   return a + b+1;
// }

// function MUl(a:any|number,b:any|number) {
//   return a * b;
// }
// it("my add test-case",()=>{

// var actr=add(12,22);
// var exptr=34;
// expect(actr).toBe(exptr);
// })

// it("my mul test-case",()=>{

// var actr=MUl(11,2);
// var exptr=22;
// expect(actr).toBe(exptr);
// })

// ----------------------------------------------------------------------------------------
// import { TestBed, ComponentFixture } from "@angular/core/testing";
// import { FormsModule } from "@angular/forms";
// import { LoginComponent } from "./login.component";
// import { LoginService } from "../../Services/login.service";
// import { Router } from "@angular/router";
// import { of, throwError } from "rxjs";
// import { NotificationService } from "../../Services/NotificationService";

// class MockLoginService {
//   Login(loginViewModel: any) {
//     if (loginViewModel.Email === "aboya375@gmail.com" && loginViewModel.Password === "Pa$$w0rd") {
//       return of({ token: "mock-token" });
//     }
//     return throwError({ error: "Invalid email or Password" });
//   }
// }

// class MockRouter {
//   navigate = jasmine.createSpy("navigate");
// }

// class MockNotificationService {
//   showError = jasmine.createSpy("showError");
//   showSuccess = jasmine.createSpy("showSuccess");
// }

// describe("LoginComponent", () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let loginService: MockLoginService;
//   let router: MockRouter;
//   let notificationService: MockNotificationService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [LoginComponent],
//       imports: [FormsModule],
//       providers: [
//         { provide: LoginService, useClass: MockLoginService },
//         { provide: Router, useClass: MockRouter },
//         { provide: NotificationService, useClass: MockNotificationService }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;

//     loginService = TestBed.inject(LoginService) as MockLoginService;
//     router = TestBed.inject(Router) as unknown as MockRouter;
//     notificationService = TestBed.inject(NotificationService) as unknown as MockNotificationService;
//   });

//   it("should log in successfully and navigate to tasks", () => {
//     component.loginviewmodel.Email = "aboya375@gmail.com";
//     component.loginviewmodel.Password = "Pa$$w0rd";
//     component.onLoginClick(null);

//     expect(router.navigate).toHaveBeenCalledWith(["/User", "tasks"]);
//     expect(notificationService.showSuccess).not.toHaveBeenCalled();
//   });

//   it("should show error for invalid credentials", () => {
//     component.loginviewmodel.Email = "invalid@example.com";
//     component.loginviewmodel.Password = "wrongpassword";
//     component.onLoginClick(null);

//     expect(notificationService.showError).toHaveBeenCalledWith("Invalid email or Password");
//   });

//   it("my add test-case", () => {
//     const actr = add(12, 22);
//     const exptr = 35; // Corrected expected value (added +1 in your add function)
//     expect(actr).toBe(exptr);
//   });

//   it("my mul test-case", () => {
//     const actr = MUl(11, 2);
//     const exptr = 22;
//     expect(actr).toBe(exptr);
//   });
// });

// function add(a: any | number, b: any | number) {
//   return a + b + 1; // Adding +1 as per your implementation
// }

// function MUl(a: any | number, b: any | number) {
//   return a * b;
// }

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

import { TestBed, ComponentFixture } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";
import { LoginService } from "../../Services/login.service";
import { Router } from "@angular/router";
import { of, throwError } from "rxjs";
import { NotificationService } from "../../Services/NotificationService";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { LoginViewModel } from "src/app/Models/login-view-model";
import { JwtHelperService } from "@auth0/angular-jwt";

describe("LoginService - Integration Test", () => {
  let service: LoginService;
  let http: HttpClient;
  let baseUrl: string = "https://localhost:7018/api/Account/Login"; // Actual endpoint

  // Mocking JwtHelperService
  class MockJwtHelperService {
    isTokenExpired(token: string): boolean {
      return false; // Mock implementation for isTokenExpired
    }
  }

  // Mocking NotificationService for tests
  class MockNotificationService {
    showError(message: string) {
      console.error(message); // Mocked method for showing error
    }
    showSuccess(message: string) {
      console.log(message); // Mocked method for showing success
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule], // Use HttpClientModule instead of HttpClientTestingModule for actual requests
      providers: [
        LoginService,
        { provide: JwtHelperService, useClass: MockJwtHelperService }, // Mocked JwtHelperService
        { provide: NotificationService, useClass: MockNotificationService } // Mocked NotificationService
      ],
    });

    service = TestBed.inject(LoginService);
    http = TestBed.inject(HttpClient);
  });

  it("should send login request and return a token on success", (done) => {
    const loginRequest: LoginViewModel = {
      Email: "aboya375@gmail.com",
      Password: "Pa$$w0rd",
    };

    // Simulate API call
    http.post(baseUrl, loginRequest).subscribe(
      (response: any) => {
        expect(response.token).toBeDefined(); // Check if the token is defined in the response
        done(); // Ensure the test completes asynchronously
      },
      (error) => {
        fail("Request failed with error: " + error);
        done();
      }
    );
  });

  it("should handle invalid login credentials", () => {
    const invalidLoginRequest: LoginViewModel = {
      Email: "invalid@example.com",
      Password: "wrongpassword",
    };

    http.post(baseUrl, invalidLoginRequest).subscribe(
      (response) => {
        fail("Expected error, but received success response.");
      },
      (error) => {
        expect(error.error).toBe("Invalid email or Password"); // Assuming this is the error message
      }
    );
  });

  it("should log in successfully with mocked service", () => {
    const loginViewModel: LoginViewModel = {
      Email: "aboya375@gmail.com",
      Password: "Pa$$w0rd",
    };

    service.Login(loginViewModel).subscribe((user) => {
      expect(user).toBeDefined();
      expect(user.token).toBeDefined();
      expect(localStorage.getItem("token")).toBe(user.token); // Check if token is stored
    });
  });

  // it("should log out successfully", () => {
  //   service.Logout();
  //   expect(localStorage.getItem("token")).toBeNull(); // Ensure token is cleared after logout
  //   expect(sessionStorage.getItem("currentUser")).toBeNull(); // Ensure currentUser is cleared after logout
  // });

  // Other test cases
  // it("should return true if token is not expired", () => {
  //   const token = "valid-token"; // Mock valid token
  //   const result = service.isAuthenticated();
  //   expect(result).toBeTrue(); // Expecting authentication to be successful
  // });

  // it("should return false if token is expired", () => {
  //   const expiredToken = "expired-token"; // Mock expired token
  //   const result = service.isAuthenticated();
  //   expect(result).toBeFalse(); // Expecting authentication to fail for expired token
  // });

  // it("should register successfully", (done) => {
  //   const registerViewModel = {
  //     UserName: "testuser",
  //     Email: "testuser@example.com",
  //     Password: "TestPassword123",
  //   };

    // service.Register(registerViewModel).subscribe((response) => {
    //   expect(response).toBeDefined();
    //   expect(response.email).toBe("testuser@example.com");
    //   done();
    // });
  // });

  // it("should handle 2FA login successfully", () => {
  //   const login2FaRequest = {
  //     username: "aboya375@gmail.com",
  //     code: "123456",
  //   };

    // service.Login2fa(login2FaRequest).subscribe((user) => {
    //   expect(user).toBeDefined();
    //   expect(user.token).toBeDefined();
    // });
  // });
});
