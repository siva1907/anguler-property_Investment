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
    private nubunits?:number;
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
        const cust=localStorage.getItem("customer")

        this.props = this.orderRepo.getOrdersByCustId(JSON.parse(cust!).id!);
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
        const cust=localStorage.getItem("customer")
        return JSON.parse(cust!)
        // return this.customerRepo.getLogedInCustomer();
      }
    saveOrder() {


        this.orderRepository.sell(this.order,this.nubunits!);

      }
    show=false;

    // get orderById()
    // {
    //   //  this.id=id;
    //     this.order.orderStatus='approved';
    //     this.order.orderPrice=this.order.noOfUnits!*this.order.propertyId?.shareVal!;

    //   return this.props?.find((prop)=>prop.propertyId?.id!=this.id)
    // }
      openpop(orders:PropertyOrder) {
        this.show = true;
       this.order=orders;
        this.ordunits=orders.noOfUnits;
        this.customer=this.order.customerId;
        //this.property=this.order.propertyId;


      }

    closepop() {
        this.show = false;
        this.isSell=false;
    }
    bookProperty(orders:PropertyOrder) {
      console.log(orders.noOfUnits);

       this.nubunits=orders.noOfUnits
       console.log(this.nubunits+"in book property before");
        this.order.noOfUnits= this.ordunits!-this.order.noOfUnits!;

        console.log(this.nubunits+"in book property");

        this.saveOrder();

        // this.color='btn btn-warning';
        this.isSell = true;
      }





}
