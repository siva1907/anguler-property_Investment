import { Observable } from 'rxjs';
import { Property } from './property.model';
import { RestDataSource } from './rest.datasource';
import { Injectable } from '@angular/core';
import { PropertyOrder } from './order.model';

@Injectable({
  providedIn: 'root',
 })
export class PropertyRepositary {
  public properties: Property[] = [];
  private orders: PropertyOrder[] = [];

  constructor(private restDataSource: RestDataSource) {
    restDataSource
      .getProperties()
      .subscribe((property) => (this.properties = property));
    console.log(this.properties);
  }


  // saveOrder(order: PropertyOrder, customerId: number, propertyId: number) {
  //   this.properties.filter(unitsUpdate =>{
  //    if(unitsUpdate.id == propertyId){
  //         unitsUpdate.blockedUnits= unitsUpdate.blockedUnits! + order.noOfUnits!
  //    }
  // })
  //   this.restDataSource.saveOrder(order, customerId, propertyId).subscribe(order => {
  //     this.orders.push(order)
  //   })
  // }

  
  getProperties(): Property[] {
    return this.properties;
  }
  
  saveproperty(property: Property, adminId: number) {
    if (property.id == 0 || property.id == null) {
      return this.restDataSource
        .saveProperty(property, adminId)
        .subscribe((property) => this.properties.push(property));
    } else {
      return this.restDataSource
        .saveProperty(property, adminId)
        .subscribe((property) =>
          this.properties.splice(
            this.properties.findIndex((prop) => prop.id == property.id),
            1,property
          )
        );
    }
    
  }

  getProperty(id: number): Property  {
    return this.properties[
      this.properties.findIndex((property) => property.id == id)
    ];
  }

  deleteProperty(id: number) {
    return this.restDataSource.deleteProperty(id).subscribe((id) => {
      this.properties.splice(
        this.properties.findIndex((property) => id == property.id),
        1
      );
    });
  }
}
