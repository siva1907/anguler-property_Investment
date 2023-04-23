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

  save(form: NgForm) {
    this.repository.saveproperty(this.property, this.adminId!);
    this.router.navigateByUrl('/admin');
  }
}
