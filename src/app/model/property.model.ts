import { Admin } from "./admin.model";

export class Property {

  constructor(
      public id?: number,
      public name?: string,
      public area?: number,
      public imageUrl?:string,
      public totalCost?: number,
      public shareVal?: number,
      public totalUnits?: number,
      public remainingUnits?: number,
      public startDate?: string,
      public admins?:Admin[],
      public status?: string,
      public modifiedOn?:string,
      public propertyLocation?: PropertyLocation,
      public yield_value ?:number,
      public blockedUnits?:number
      ) { }
}

export class PropertyLocation{
  constructor(
    public id?: number,
    public city?: string,
    public street?: string,
    public pincode?: string,
    public state?: string,
    public country?: string
  ){}
}
