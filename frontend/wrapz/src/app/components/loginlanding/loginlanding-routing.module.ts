import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { LoginlandingComponent } from "./loginlanding.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { PaymentComponent } from "./payment/payment.component";
import { ViewprofileComponent } from "./viewprofile/viewprofile.component";
import { SearchComponent } from "./search/search.component";
import { AuthGuard } from "src/app/shared/auth.guard";
import { ExpiryComponent } from "./expiry/expiry.component";
import { ChatsComponent } from "./chats/chats.component";

const landingRoute:Routes=[
    {path:'' , component:LoginlandingComponent,canActivateChild:[AuthGuard],
   children:[
        {path:'', component:HomeComponent },
        {path:'profile', component:ProfileComponent},
        {path:'payment', component:PaymentComponent},
        {path:'viewprofile/:id', component:ViewprofileComponent},
        {path:'search',component:SearchComponent},
        {path:'expired',component:ExpiryComponent},
        {path:'chats',component:ChatsComponent}
   ]
}
]

@NgModule({
    imports:[
        RouterModule.forChild(landingRoute)
    ],
    exports:[RouterModule]
})

export class LoginLandingModule{

}