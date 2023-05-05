import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Admin } from '../model/admin.model';
import { Router } from '@angular/router';
import { AdminLoginRepository } from '../model/adminLogin.repositary';

@Component({
  selector: 'admin-login',
  templateUrl: 'adminLogin.componenent.html',
  styleUrls:['adminLogin.componenent.css']
})

export class AdminLoginComponent  {

  admin:Admin=new Admin();
  showPassword = false;

  constructor(private repo:AdminLoginRepository,private router:Router) { }



  onSubmit(form:NgForm) {
    console.log("working");
    this.repo.verifyAdmin(this.admin.adminName,this.admin.password)
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
