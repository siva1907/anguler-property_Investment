
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PropertyComponent } from "./property.component";
import { ViewComponent } from "./view.component";
import { NavComponent } from "./nav/NavComponent";
import { AboutComponent } from "./nav/about.component";
import { ContactComponent } from "./nav/contact.component";
import { FooterComponent } from "./footer/footer.component";
import { GraphComponent } from "../graph/graph.comoponent";
import { CarouselComponent } from "./nav/carousel/carousel.component";
import { ModelModule } from "../model/model.module";
import { CustomerStoreComponent } from "./nav/customerStore/CustomerStore.component";




@NgModule({
    imports: [CommonModule, FormsModule,RouterModule,ModelModule],
    declarations: [PropertyComponent,ViewComponent,NavComponent, AboutComponent, ContactComponent,FooterComponent,GraphComponent,CarouselComponent,CustomerStoreComponent],
    exports: [GraphComponent,CarouselComponent,CustomerStoreComponent]
})
export class PropertyModule {}
