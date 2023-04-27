import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CustomerSigninRepository } from 'src/app/model/customerSignIn.repository';
import { PropertyOrder } from 'src/app/model/order.model';
import { OrderRepository } from 'src/app/model/order.repository';


@Component({
    selector: 'customer-order',
    templateUrl: 'customerStore.component.html',
    styleUrls:['customerStore.component.css']
    
})
export class CustomerStoreComponent {
    constructor(
       private custlogin:CustomerSigninRepository,private orderRepo:OrderRepository ,private activeRouter:ActivatedRoute
    ) {
        console.log(this.custlogin.customer?.id!);
    
        this.props= this.orderRepo.getOrdersByCustId(this.custlogin.customer?.id!);
        console.log(this.orderRepo.getOrdersByCustId(this.custlogin.customer?.id!));
        
     }

   public custorders?:Customer;
   public props?:PropertyOrder[];

//  get customerOrders():PropertyOrder[] | undefined{
//     // console.log("entering");
//     // console.log(this.activeRouter.snapshot.params["id"]);
//     console.log(this.custlogin.customer);
    
//    this.props= this.orderRepo.getOrdersByCustId(this.custlogin.customer?.id!);
// //    console.log(this.props)
//    return this.props;
   
// }
sell(id:number|any){
    this.orderRepo.deleteOrder(id);
    this.props?.splice( this.props.findIndex(o => id == o.orderId),1)
}




    
}