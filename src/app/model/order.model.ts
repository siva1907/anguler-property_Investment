import { Injectable } from "@angular/core";
import { Customer } from "./customer.model";
import { Property } from "./property.model";

@Injectable()
export class PropertyOrder {
    public orderId?: number;
   public customerId?:Customer;
    public orderPrice?: number;
    public  noOfUnits?: number;
    public orderStatus?: string;
    public  orderDate?:Date;
    public propertyId?:Property;

    constructor() { }

  
}
