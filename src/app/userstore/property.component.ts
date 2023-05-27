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
  public searchByName?:string='';

  public sortBy?:String="Most Blocked By Users";

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
  //...................................

  if(this.sortBy==="Share Value")
  {
   this.props.sort((a, b) => a.shareVal! - b.shareVal!)

  }
  else if(this.sortBy==="Remining Units")
  {
    this.props.sort((a, b) => b.remainingUnits! - a.remainingUnits!);
  }
  else if(this.sortBy==="Most Blocked By Users") {

    this.props.sort((a, b) => b.blockedUnits! - a.blockedUnits!);
  }else if(this.sortBy==="Yeild")
  {
    this.props.sort((a, b) => b.yield_value! - a.yield_value!);
  }
if(this.searchByName!='')
{
this.props=this.repository.getProperties().filter(p=>p.name?.toLocaleLowerCase().match(this.searchByName!.toLocaleLowerCase().trim()))
}

  return this.props.filter(prop=> "active"===prop.status);
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
