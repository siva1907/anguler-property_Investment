import { Injectable } from '@angular/core';
import { RestDataSource } from './rest.datasource';
import { Router } from '@angular/router';
import { Admin } from './admin.model';
import { log } from 'console';

@Injectable()
export class AdminLoginRepository {
  private admins?: Admin[];
  private admin?: Admin;
  private adminName?: string;
  private password?: string;
  constructor(private dataSource: RestDataSource, private router: Router) {
    this.dataSource.getAdminDetails().subscribe((e) => (this.admins = e));
  }

  verifyAdmin(adminName: any, password: any) {
    // Make sure email and password are not undefined
    if (adminName && password) {
      console.log(adminName + ' ' + password);
      this.dataSource.verifyAdmin(adminName, password).subscribe(
        (response) => {
          // Handle the response as string
          if (response == 'Data Matched') {
            this.dataSource
              .getAdmin(adminName, password)
              .subscribe((admin1) => (this.admin = admin1));
              console.log('data matched')
            this.router.navigateByUrl('/admin');
          } else {
            // Handle the error case
            this.showError('Invalid Admin Name or password');
          }
        },
        (error) => {
          // Handle any error that occurs during the API call
          this.showError('API Error: ' + error);
        }
      );
    } else {
      // Handle the case where email or password is undefined
      this.showError('Please enter Admin Name or password ');
    }
  }

  showError(errorMsg: string) {
    // Display the error message on the page (you can customize this part based on your application's UI)
    alert("username or password is incorect");
  }

  getAdmin(): Admin | undefined {
    return this.admin;
  }

}
