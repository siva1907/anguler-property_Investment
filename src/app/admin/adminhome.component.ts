import { Admin } from '../model/admin.model';
import { AdminLoginRepository } from '../model/adminLogin.repositary';
import { Property } from '../model/property.model';
import { PropertyRepositary } from './../model/property.repository';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-home',
  templateUrl: 'adminhome.component.html',
  styleUrls: ['adminhome.component.css'],
})
export class AdminHomeComponent {
  constructor(private repository: PropertyRepositary, private adminrepo: AdminLoginRepository) {}

  get properties(): Property[] {


    return this.repository.getProperties();
  }
get admin() : Admin | undefined{
  return this.adminrepo.getAdmin();
}

}


