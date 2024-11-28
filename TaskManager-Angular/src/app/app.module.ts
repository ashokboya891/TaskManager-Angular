import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  JwtModule} from "@auth0/angular-jwt";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Ensure this is imported
import { JwtInterceptorService } from './Interceptors/jwt-interceptor.service';
import { JwtUnAuthorizedInterceptorService } from './Interceptors/jwt-un-authorized-interceptor.service';
import { ToastrModule } from "ngx-toastr";
import { ClientLocationStatusValidatorDirective } from './Directives/client-location-status-validator.directive';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { AlertDirective } from './Directives/alert.directive';
import { RepeaterDirective } from './Directives/repeater.directive';
import { UserModule } from './User/user.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    AlertDirective,
    RepeaterDirective,
    
    
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSnackBarModule,
    SharedModule,
    UserModule,
    BrowserAnimationsModule,
    
    JwtModule.forRoot({
      config: {
        tokenGetter: () =>
        {
          return (sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser") as string).token : null)
        }
      }
    }),
    ToastrModule.forRoot({positionClass:'toast-bottom-right'}),
    
  ],
  providers: [ 
//order of inceptors matter cause it executes how it declared
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtInterceptorService,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtUnAuthorizedInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
