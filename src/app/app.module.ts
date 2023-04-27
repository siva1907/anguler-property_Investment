import { CUSTOM_ELEMENTS_SCHEMA, Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin/adminhome.component';
import { AdminModule } from './admin/admin.module';
import { AddPropertyComponent } from './admin/addProperty.component';
import { DiscriptionComponent } from './admin/discription.component';
import { LoginModule } from './login/login.module';
import { AdminLoginComponent } from './login/adminLogin.component';
import { CustomerSigninComponent } from './login/customerSignIn.component';
import { CustomerSignUpComponent } from './login/customerSignUp.component';
import { PropertyComponent } from './userstore/property.component';
import { ViewComponent } from './userstore/view.component';
import { AboutComponent } from './userstore/nav/about.component';
import { ContactComponent } from './userstore/nav/contact.component';
import { PropertyModule } from './userstore/userStore.module';
import { OrderconfirmationComponent } from './admin/orderconfirmation/orderConfirmation.component';
import { GraphComponent } from './graph/graph.comoponent';
import { CarouselComponent } from './userstore/nav/carousel/carousel.component';
import { CustomerStoreComponent } from './userstore/nav/customerStore/CustomerStore.component';

@NgModule({
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AdminModule,
    LoginModule,
    PropertyModule,
    
    RouterModule.forRoot([
      { path: 'add/:mode/:id', component: AddPropertyComponent },
      { path: 'add', component: AddPropertyComponent },
      { path: 'admin', component: AdminHomeComponent },
      { path: 'admin/login', component: AdminLoginComponent },
      { path: 'admin/:id', component: DiscriptionComponent },
      { path: 'signin', component: CustomerSigninComponent },
      { path: 'signup', component: CustomerSignUpComponent },
      {path:  'start',component:CarouselComponent},
      { path: 'home', component: PropertyComponent },
      { path: 'home/:id', component: ViewComponent,
      },
      {path:'order', component:OrderconfirmationComponent},
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path:'graph/:id',component:GraphComponent
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {path:'orders',component:CustomerStoreComponent},

      { path: '**', redirectTo: '/start' },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
