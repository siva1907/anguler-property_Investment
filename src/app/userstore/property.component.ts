import { Component, OnInit } from '@angular/core';
import { PropertyRepositary } from './../model/property.repository';
import { Property } from '../model/property.model';
import { CustomerSigninRepository } from '../model/customerSignIn.repository';
import { Customer } from '../model/customer.model';
@Component({
  selector: 'app-propertycomponent',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent  {

  constructor(private repository: PropertyRepositary,private customerRepo: CustomerSigninRepository) { }


  get properties(): Property[] {
    return this.repository.getProperties();
  }



  get customer(): Customer {
    return this.customerRepo.getLogedInCustomer();
  }

}
