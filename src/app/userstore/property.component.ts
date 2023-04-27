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
  filterText:string='';

  constructor(private repository: PropertyRepositary,private customerRepo: CustomerSigninRepository) { }
  public props?:Property[];
  public names?:String[];

  get cities():String[]|any
  {
    //filter((value,index,self)=>self.indexOf(value)===index)
   return this.repository.getProperties().map(e=>e.propertyLocation?.city?.toLocaleLowerCase()).filter((value,index,self)=>self.indexOf(value)===index);

  }

  get properties(): Property[] {

if(this.filterText==='')
{
  this.props=this.repository.getProperties();

}
else{
    this.props=this.repository.getProperties().filter(p=>p.propertyLocation?.city?.toLocaleLowerCase()===this.filterText.toLocaleLowerCase())

  }
  return this.props;
  }


  get customer(): Customer {
    return this.customerRepo.getLogedInCustomer();
  }

}
// import { Component, OnInit } from '@angular/core';
// import { PropertyRepositary } from './../model/property.repository';
// import { Property } from '../model/property.model';
// import { CustomerSigninRepository } from '../model/customerSignIn.repository';
// import { Customer } from '../model/customer.model';
// @Component({
//   selector: 'app-propertycomponent',
//   templateUrl: './property.component.html',
//   styleUrls: ['./property.component.css']
// })
// export class PropertyComponent  {

//   constructor(private repository: PropertyRepositary,private customerRepo: CustomerSigninRepository) { }
//   public props?:Property[];
//   public select:String='';
//   public city?:String[];






//   get properties(): Property[] {
//     if(this.select==='')
//     {
//       this.props= this.repository.getProperties()
//     }
//     else{
//       this.props= this.repository.getProperties().filter(p=>p.propertyLocation?.city===this.select);
//     }
    
//     return this.props;
//   }



//   get customer(): Customer {
//     return this.customerRepo.getLogedInCustomer();
//   }

// }
