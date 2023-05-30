import { Component } from '@angular/core';
import { OrderRepository } from '../../model/order.repository';
import { PropertyOrder } from '../../model/order.model';

@Component({
  selector: 'app-orderconfirmation',
  templateUrl: './orderconfirmation.component.html',
  styleUrls: ['./orderconfirmation.component.css']
})
export class OrderconfirmationComponent {

  orders1: PropertyOrder[] = [];

  order?:PropertyOrder = new PropertyOrder();

  constructor(private orderRepository: OrderRepository) {

    this.loadOrders();
    
  }

  loadOrders() {

    this.orderRepository.loadOrders();
    this.orders1 = this.orderRepository.getOrders();

  }

  get orders():PropertyOrder[]{

    console.log(this.orders1)
    return this.orderRepository.getOrders();

  }
  getOrderTotal(order: PropertyOrder) {
    return order.noOfUnits! * order.orderPrice!;
  }
  confirmDeleteOrder(orderId: number) {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      this.deleteOrder(orderId);
    }  
  }
  deleteOrder(orderId:number){
    
    this.orderRepository.deleteOrderbyAdmin(orderId);
  }

  updateOrder() {
    if(this.order!= undefined) {

    this.order.orderStatus='approved'
    console.log(this.order);
    

    }
    return this.orderRepository.updateOrder(this.order!);
  }
  
  getOrder(id:number){
    this.order=this.orderRepository.getOrderById(id);
    this.updateOrder();
  }

}
