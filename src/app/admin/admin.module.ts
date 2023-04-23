import { NgModule } from '@angular/core';
import { AdminHomeComponent } from './adminhome.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModelModule } from '../model/model.module';
import { AddPropertyComponent } from './addProperty.component';
import { DiscriptionComponent } from './discription.component';
import { AdminNavComponent } from './adminNav.component';
import { OrderconfirmationComponent } from './orderconfirmation/orderConfirmation.component';


  @NgModule({
    imports: [ModelModule, BrowserModule, FormsModule, RouterModule],
    exports: [],
    declarations: [AdminHomeComponent,AddPropertyComponent,DiscriptionComponent,AdminNavComponent,OrderconfirmationComponent],
    providers: [],
  })
  export class AdminModule { }

