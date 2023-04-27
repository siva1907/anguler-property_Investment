import { Injectable } from "@angular/core";
import { PropertyOrder } from "./order.model";
//import { StaticDataSource } from "./static.datasource";
import { RestDataSource } from "./rest.datasource";
import { Customer } from "./customer.model";
import { Subscription } from "rxjs";

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

  stopSubscription?: Subscription;
  // private customer?:Customer
  constructor(private dataSource: RestDataSource) { }

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
    this.dataSource.saveOrder(order, customerId, propertyId).subscribe(order => {
      this.orders.push(order)
    })
  }


  updateOrder(order: PropertyOrder) {
    this.propertyId = order.propertyId?.id;
    this.customerId = order.customerId?.id;
    this.dataSource.updateOrder(order, this.customerId!, this.propertyId!).subscribe(updatedOrder => {
      const index = this.orders.findIndex(o => o.orderId === updatedOrder.orderId);
      if (index !== -1) {
        this.orders.splice(index, 1, updatedOrder);
      }
    });
  }


  deleteOrder(id: number) {
    this.dataSource.deleteOrder(id).subscribe(order => {
      this.orders.splice(this.orders.findIndex(o => id == o.orderId), 1);
    });
  }

  sell(id: number) {
    this.dataSource.sell(id).subscribe(order => {
      this.orders.splice(this.orders.findIndex(o => id == o.orderId), 1);
    });
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
