import { NgModule } from '@angular/core';
import { RestDataSource } from './rest.datasource';
import { HttpClientModule } from '@angular/common/http';
import { PropertyRepositary } from './property.repository';
import { AdminLoginRepository } from './adminLogin.repositary';
import { CustomerSigninRepository } from './customerSignIn.repository';
import { OrderRepository } from './order.repository';


@NgModule({
  imports: [HttpClientModule],
  exports: [],
  providers: [RestDataSource,PropertyRepositary,AdminLoginRepository,CustomerSigninRepository,OrderRepository],
})
export class ModelModule { }

