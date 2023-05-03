import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CustomerSigninRepository } from 'src/app/model/customerSignIn.repository';
import { PropertyOrder } from 'src/app/model/order.model';
import { OrderRepository } from 'src/app/model/order.repository';
import { Property } from 'src/app/model/property.model';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyRepositary } from 'src/app/model/property.repository';
@Component({
    selector: 'customer-order',
    templateUrl: 'customerStore.component.html',
    styleUrls: ['customerStore.component.css']

})
export class CustomerStoreComponent implements OnDestroy {
    isSell?: boolean = false;
    orderPrice?: number;
    orderStatus?: string='pending';
    ordunits?:number;
    color:string='btn btn-primary';
    order: PropertyOrder = new PropertyOrder();
    property: Property = new Property();
    customer?: Customer = new Customer();
    //orderForm: FormGroup;
    constructor(
        private custlogin: CustomerSigninRepository, 
        private orderRepo: OrderRepository, 
        private activeRouter: ActivatedRoute,
        private orderRepository: OrderRepository,
        private customerRepo: CustomerSigninRepository,
        private formBuilder: FormBuilder,
        private repository: PropertyRepositary,
        private activeRoute: ActivatedRoute,
      
        private repo: CustomerSigninRepository,
      
    ) {
        // console.log(this.custlogin.customer?.id!);

        // this.props= this.orderRepo.getOrdersByCustId(this.custlogin.customer?.id!);
        // console.log(this.orderRepo.getOrdersByCustId(this.custlogin.customer?.id!));
      
          

    }

    public custorders?: Customer;
    public props?: PropertyOrder[];
    public id?:number;

    get customerOrders(): PropertyOrder[] | undefined {

        this.props = this.orderRepo.getOrdersByCustId(this.custlogin.customer?.id!);
        return this.props

    }

    ngOnDestroy(): void {
        this.orderRepo.unSubscribe();
    }


    // sell(id: number | any) {
    //     this.orderRepo.sell(id);
    //     if (confirm('Are you sure you want to sell?')) {
    //         this.props?.splice(this.props.findIndex(o => id == o.orderId), 1)
    //     }

    // }
    get logedInCustomer(): Customer {
        return this.customerRepo.getLogedInCustomer();
      }
    saveOrder() {
        
        
        this.orderRepository.saveOrder(this.order,this.logedInCustomer.id!,this.property.id!);
    
      }
    show=false;

    get orderById()
    {
      return this.props?.find((prop)=>prop.propertyId?.id!=this.id)
    }
    openpop(id:number) {
        this.show = true;
        this.id=id;
        // this.order.orderStatus='approved';
        // this.order.orderPrice=this.order.noOfUnits!*this.order.propertyId?.shareVal!;
        // this.order.customerId=this.order.customerId;
        // this.order.propertyId=this.order.propertyId;
        this.ordunits=this.order.noOfUnits;
      
      }
    
    closepop() {
        this.show = false;
        this.isSell=false;
    }
    bookProperty() {
        this.saveOrder();
        
        // this.color='btn btn-warning';
        this.isSell = true;
      }





}