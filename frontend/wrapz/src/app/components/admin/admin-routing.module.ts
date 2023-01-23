import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AdminhomeComponent } from "./adminhome/adminhome.component";
import { BusinessuserComponent } from "./businessuser/businessuser.component";
import { NormaluserComponent } from "./normaluser/normaluser.component";
import { PaymentComponent } from "./payment/payment.component";
import { PlansComponent } from "./plans/plans.component";

const adminRoute:Routes=[
    {path:"",component:AdminComponent,
    children:[
    {path:'',component:AdminhomeComponent},
    {path:'normal',component:NormaluserComponent},
    {path:'business',component:BusinessuserComponent},
    {path:'payments',component:PaymentComponent},
    {path:"plans",component:PlansComponent}
    ]
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(adminRoute)
    ],
    exports:[
        RouterModule
    ]
})

export class AdminRoutingModule{

}