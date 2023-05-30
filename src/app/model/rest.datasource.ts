import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from './property.model';
import { PropertyOrder } from './order.model';
import { Customer } from './customer.model';
import { Admin } from './admin.model';



@Injectable({
  providedIn: 'root',
 })
export class RestDataSource {

  // baseUrl: string;

  constructor(private http: HttpClient) {
    // this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`http://localhost:9044/api/property`);
  }

  getProperty(pid:number): Observable<Property> {
    return this.http.get<Property>(`http://localhost:9044/api/property/${pid}`);
  }

  saveProperty(property: Property, adminId: number): Observable<Property> {
    if (property.id == null || property.id == 0) {
      return this.http.post<Property>(
        `http://localhost:9044/api/property/${adminId}`,
        property
      );
    } else {
      return this.http.put<Property>(
        `http://localhost:9044/api/update-property/${adminId}`,
        property
      );
    }
  }

  deleteProperty(id: Number): Observable<Property> {
    return this.http.delete<Property>(`http://localhost:9044/api/property/${id}`);
  }

  saveOrder(order: PropertyOrder,customerId:number,propertyId:number): Observable<PropertyOrder> {
    return this.http.post<PropertyOrder>(  `http://localhost:9043/api/saveorder/customer/${customerId}/property/${propertyId}`,order);
  }

  getOrders(): Observable<PropertyOrder[]> {
    return this.http.get<PropertyOrder[]>( `http://localhost:9043/api/allorders`);
  }

  sendMail(id:number){
    return this.http.get<String>( `http://localhost:9043/api/send-mail/${id}`);
  }
  getOrderByCid(id:number): Observable<PropertyOrder[]> {
    return this.http.get<PropertyOrder[]>(`http://localhost:9043/api/bycustomer/${id}`);
  }
  deleteOrder(id: number): Observable<PropertyOrder> {
    return this.http.delete<PropertyOrder>(`http://localhost:9043/api/order/delete/${id}`);
  }
  deleteOrderbyadmin(id: number): Observable<PropertyOrder> {
    return this.http.delete<PropertyOrder>(`http://localhost:9043/api/order/delete/${id}/delete`);
  }
  sell(order: PropertyOrder ): Observable<PropertyOrder> {
    if(order.noOfUnits!>0){
    console.log(JSON.stringify(order)+"restdata");

    return this.http.put<PropertyOrder>(`http://localhost:9043/api/order/sell`,order);
    }else{
      console.log("delete");

     return this.deleteOrder(order.orderId!);
    }
  }

  updateOrder(order: PropertyOrder,cid:number,pid:number): Observable<PropertyOrder> {
    return this.http.put<PropertyOrder>(
      `http://localhost:9043/api/saveorder/customer/${cid}/property/${pid}`, order);
  }

  getAdminDetails(): Observable<Admin[]> {
    return this.http.get<Admin[]>('http://localhost:9045/api/admin');
  }

  verifyAdmin(adminName: any, password: any): Observable<String> {
    console.log('verify');
    return this.http.get<String>(
      `http://localhost:9045/api/verify-admin/${adminName}/${password}`
    );
  }

  getAdmin(adminName: any, password: any): Observable<Admin> {
    console.log('getAdmin');
    return this.http.get<Admin>(
     `http://localhost:9045/api/admin/${adminName}/${password}`
    );
  }


  saveCustomer(customer: Customer): Observable<Customer> {
    console.log('rest ->'+customer);
    return this.http.post<Customer>( 'http://localhost:9041/api/customer', customer);
  }

  getAllCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`http://localhost:9041/api/customer/`);
  }


  verifyCustomer(customerMail:any, password:any): Observable<String>{
    return this.http.get<String>(`http://localhost:9041/api/verify-customer/${customerMail}/${password}`);
  }

   getCustomer(customerEmail: string, password: string) : Observable<Customer> {
    console.log('in data source'+customerEmail+' '+password)
    return this.http.get<Customer>(
     `http://localhost:9041/api/customer/${customerEmail}/${password}`
    );
  }
}
