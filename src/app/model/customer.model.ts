import { PropertyOrder } from "./order.model";

export class Customer{
  constructor(
    public id?:number,
    public customerName?:string,
    public customerMail?:string,
    public customerPhno?:number,
    public password?:string,
    public customerlocation?:CustomerLocation,
    public orderIds?:PropertyOrder[],
  )
  {}
}

export class CustomerLocation{
  constructor(
    public id?: number,
    public city?: string,
    public street?: string,
    public pinCode?: string,
    public state?: string,
    public country?: string
  ){}
}
