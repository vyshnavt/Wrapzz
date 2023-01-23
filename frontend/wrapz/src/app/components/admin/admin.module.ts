import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { MaterialModule } from "src/app/material/material.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule} from '@angular/flex-layout';
import { CommonModule } from "@angular/common";

import { AdminComponent } from "./admin.component";
import { AdminhomeComponent } from "./adminhome/adminhome.component";
import { AdminheaderComponent } from "./adminheader/adminheader.component";
import { BusinessuserComponent } from "./businessuser/businessuser.component";
import { NormaluserComponent } from "./normaluser/normaluser.component";
import { PaymentComponent } from "./payment/payment.component";
import { PlansComponent } from './plans/plans.component';


@NgModule({
    declarations:[
        AdminComponent,
        AdminhomeComponent,
        AdminheaderComponent,
        BusinessuserComponent,
        PaymentComponent,
        NormaluserComponent,
        PlansComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        MaterialModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        FlexLayoutModule
    ],
})
export class adminModule{}