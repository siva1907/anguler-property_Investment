import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from '../model/customer.model';
import { Router } from '@angular/router';
import { CustomerSigninRepository } from '../model/customerSignIn.repository';

@Component({
  selector: 'customer-signIn',
  templateUrl: './customerSignIn.component.html',
  styleUrls: ['./customerSignIn.component.css']
})
export class CustomerSigninComponent implements OnInit {

  login:Customer=new Customer();
  showPassword = false;
  constructor(private repo:CustomerSigninRepository, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm)
  {
      this.repo.verifyCustomer(this.login.customerMail,this.login.password);
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
