import { Injectable } from '@angular/core';
import { Customer } from './customer.model';
import { RestDataSource } from './rest.datasource';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root',
 })
export class CustomerSigninRepository {

  public customers: Customer[] = [];

  public customer?: Customer;

  public customerEmail?: string;

  public password?: string;

  stopSubscription: Subscription | undefined;

  constructor(private restdatasource: RestDataSource, private router: Router) {
    this.restdatasource
      .getAllCustomer()
      .subscribe((customer1) => (this.customers = customer1));
  }
  verifyCustomer(customerMail: any, password: any) {
    // Make sure email and password are not undefined
    if (customerMail && password) {
        this.restdatasource
        .getCustomer(customerMail, password)
        .subscribe(customer1 => {
          localStorage.setItem("customer",JSON.stringify(customer1))
        });
         
        this.restdatasource.verifyCustomer(customerMail, password).subscribe(
        (response) => {
          // Handle the response as string
          if (response == 'Data Matched') {
            if(localStorage.getItem("customer")!=null){
              this.router.navigateByUrl('/home');
            }

          } else {
            // Handle the error case
            this.showError('Invalid email or password');
          }
        },
        (error) => {
          // Handle any error that occurs during the API call
          this.showError('API Error: ' + error);
        }
      );
    } else {
      // Handle the case where email or password is undefined
      this.showError('Email or password is undefined');
    }
  }

  showError(errorMsg: string) {
    // Display the error message on the page (you can customize this part based on your application's UI)
    alert('please enter username and password');
  }

  getLogedInCustomer(): Customer {
    const cust=localStorage.getItem("customer")
    return JSON.parse(cust!)
    // return  this.customer!;
  }

  logOutCustomer(){
    localStorage.removeItem("customer")
    // this.customer=undefined;
  }

  saveCustomer(customer: Customer) {
    console.log(' in repo' + customer);

    return this.restdatasource.saveCustomer(customer).subscribe((cust) => {
      this.customers.push(cust);
    });
  }

  getCustomer(id: number): Customer | undefined {
    console.log(id);
    console.log(this.customers.find((customer) => customer.id === id));

    return this.customers[
      this.customers.findIndex((customer) => customer.id == id)
    ];
  }

}
