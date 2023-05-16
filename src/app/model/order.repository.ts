import { Injectable } from "@angular/core";
import { PropertyOrder } from "./order.model";
//import { StaticDataSource } from "./static.datasource";
import { RestDataSource } from "./rest.datasource";
import { Customer } from "./customer.model";
import { Subscription } from "rxjs";
import { PropertyRepositary } from "./property.repository";

@Injectable()
export class OrderRepository {
  private orders: PropertyOrder[] = [];
  private loaded: boolean = false;
  private saveOrders?: PropertyOrder;
  private updatingOrder?: PropertyOrder;
  private propertyId?: number;
  private customerId?: number;
  private customerOrders?: PropertyOrder[] = [];
  private customerOrdersById?: PropertyOrder[] = [];
  mail?:String;

  stopSubscription?: Subscription;
  // private customer?:Customer
  constructor(private dataSource: RestDataSource,public proprepo:PropertyRepositary) { }

  loadOrders() {
    this.loaded = true;
    this.dataSource.getOrders()
      .subscribe(orders => this.orders = orders);
  }
  loadCustOrsers(id: number) {
    this.loaded = true;

  }
  getOrders(): PropertyOrder[] {
    if (!this.loaded) {
      this.loadOrders();


    }
    console.log(this.orders);
    return this.orders;
  }

  getOrdersByCustId(id: number): PropertyOrder[] | undefined {
    if(!this.stopSubscription){
     this.stopSubscription= this.dataSource.getOrderByCid(id).subscribe(orders => this.customerOrdersById = orders);
    }
    return this.customerOrdersById;

  }
  unSubscribe(){
    if(this.stopSubscription){
        this.stopSubscription.unsubscribe();
        this.customerOrdersById = [];
        this.stopSubscription = undefined
    }
  }

  saveOrder(order: PropertyOrder, customerId: number, propertyId: number) {
 

    this.proprepo.properties.filter(unitsUpdate =>{
      if(unitsUpdate.id == propertyId){
           unitsUpdate.blockedUnits= unitsUpdate.blockedUnits! + order.noOfUnits!
      }
   })
    
    this.dataSource.saveOrder(order, customerId, propertyId).subscribe(order => {
      this.orders.push(order)
      
    })
    // console.log("check"+order.orderId);


    
    // this.dataSource.sendMail(order.orderId!).subscribe(m=>this.mail=m);
    
  }


  updateOrder(order: PropertyOrder) {
    this.propertyId = order.propertyId?.id;
    this.customerId = order.customerId?.id;
    
    
    
    
    this.dataSource.updateOrder(order, this.customerId!, this.propertyId!).subscribe(updatedOrder => {
      const index = this.orders.findIndex(o => o.orderId === updatedOrder.orderId);

    this.dataSource.sendMail(order.orderId!).subscribe(m=>this.mail=m);
    console.log(this.mail);
    console.log(order.orderId);

      this.proprepo.properties.filter(unitsUpdate =>{
        if(unitsUpdate.id == order.propertyId?.id){
             unitsUpdate.remainingUnits= unitsUpdate.remainingUnits! - order.noOfUnits!;
             unitsUpdate.blockedUnits=unitsUpdate.blockedUnits!-order.noOfUnits!;
        }
     })
      if (index !== -1) {
        this.orders.splice(index, 1, updatedOrder);
      }
    });
  }


  deleteOrder(id: number) {
    this.dataSource.sendMail(id).subscribe(m=>this.mail=m);
    this.dataSource.deleteOrder(id).subscribe(order => {
      this.orders.splice(this.orders.findIndex(o => id == o.orderId), 1);
    });
   
  }

  sell(order: PropertyOrder) {
    this.dataSource.sell(order)
    .subscribe(
    //   order => {
    //   //this.orders.splice(this.orders.findIndex(o => id == o.orderId), 1);

    // }
    );
  }
  getOrderById(id: number): PropertyOrder | undefined {
    console.log(this.orders.find(order => order.orderId == id));

    return this.orders.find(order => order.orderId == id);
  }
  getByCustomer(id: number): PropertyOrder[] | any {

    this.dataSource.getOrderByCid(id)

      .subscribe(orders => this.customerOrders = orders);

    return this.customerOrders;

  }

}
