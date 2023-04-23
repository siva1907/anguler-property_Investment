import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModelModule } from '../model/model.module';
import { AdminLoginComponent } from './adminLogin.component';
import { CustomerSigninComponent } from './customerSignIn.component';
import { CustomerSignUpComponent } from './customerSignUp.component';


  @NgModule({
    imports: [BrowserModule, FormsModule, RouterModule,ReactiveFormsModule],
    exports: [],
    declarations: [AdminLoginComponent,CustomerSigninComponent,CustomerSignUpComponent],
    providers: [],
  })
  export class LoginModule { }
