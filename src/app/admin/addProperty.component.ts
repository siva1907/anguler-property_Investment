// import { AdminLoginRepository } from './../model/adminLogin.repositary';
// import { PropertyRepositary } from './../model/property.repository';
// import { Component } from '@angular/core';
// import { Property, PropertyLocation } from '../model/property.model';
// import { ActivatedRoute, Router } from '@angular/router';
// import { NgForm } from '@angular/forms';
// import { Admin } from '../model/admin.model';
// @Component({
//   selector: 'add-property',
//   templateUrl: 'addProperty.component.html',
//   styleUrls: ['addProperty.component.css'],
// })
// export class AddPropertyComponent {
//   editing: boolean = false;
//   property: Property = new Property();
//   admin?: Admin;
//   adminId?: number;

//   constructor(
//     private repository: PropertyRepositary,
//     private activeRoute: ActivatedRoute,
//     private router: Router,
//     private repo: AdminLoginRepository,
//     private adminRepo: AdminLoginRepository
//   ) {
//     this.editing = activeRoute.snapshot.params['mode'] == 'edit';
//     // Initialize the student object with a new address object

//     this.property.propertyLocation = new PropertyLocation();

//     if (this.editing) {
//       console.log(activeRoute.snapshot.params['id']);
//       Object.assign(
//         // ES5 method
//         this.property,
//         this.repository.getProperty(activeRoute.snapshot.params['id'])
//       );
//       console.log(this.property.id + ' -------------');
//     }

//     if (
//       this.adminRepo.getAdmin() != null ||
//       this.adminRepo.getAdmin() != undefined
//     ) {
//       this.adminId = this.adminRepo.getAdmin()?.adminId;
//     }
//   }

//   save(form: NgForm) {
//     this.repository.saveproperty(this.property, this.adminId!);
//     this.router.navigateByUrl('/admin');
//   }
// }

import { AdminLoginRepository } from './../model/adminLogin.repositary';
import { PropertyRepositary } from './../model/property.repository';
import { Component } from '@angular/core';
import { Property, PropertyLocation } from '../model/property.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Admin } from '../model/admin.model';
@Component({
  selector: 'add-property',
  templateUrl: 'addProperty.component.html',
  styleUrls: ['addProperty.component.css'],
})
export class AddPropertyComponent {
  editing: boolean = false;
  property: Property = new Property();
  admin?: Admin;
  adminId?: number;

  constructor(
    private repository: PropertyRepositary,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private repo: AdminLoginRepository,
    private adminRepo: AdminLoginRepository
  ) {
    this.editing = activeRoute.snapshot.params['mode'] == 'edit';
    // Initialize the student object with a new address object

    this.property.propertyLocation = new PropertyLocation();

    if (this.editing) {
      console.log(activeRoute.snapshot.params['id']);
      Object.assign(
        // ES5 method
        this.property,
        this.repository.getProperty(activeRoute.snapshot.params['id'])
      );
      console.log(this.property.id + ' -------------');
    }

    if (
      this.adminRepo.getAdmin() != null ||
      this.adminRepo.getAdmin() != undefined
    ) {
      this.adminId = this.adminRepo.getAdmin()?.adminId;
    }
  }
  getTodayDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear().toString().padStart(4, '0');
    const mm = (today.getMonth() + 1).toString().padStart(2, '0');
    const dd = today.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  getMaxDate(): string {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    const yyyy = maxDate.getFullYear().toString().padStart(4, '0');
    const mm = (maxDate.getMonth() + 1).toString().padStart(2, '0');
    const dd = maxDate.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  save(form: NgForm) {
    this.property.remainingUnits=this.property.totalUnits;
    this.repository.properties.filter(prop=>{
      if(prop.id==this.property.id)
      {
        prop.status=this.property.status;
        prop.startDate=this.property.startDate;
      }
    })
    this.repository.saveproperty(this.property, this.adminId!);
    this.router.navigateByUrl('/admin');
  }
}