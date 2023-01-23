import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";
import { NormalregisterComponent } from "./normalregister/normalregister.component";
import { BusinessregisterComponent } from "./businessregister/businessregister.component";
import { AdminloginComponent } from "./adminlogin/adminlogin.component";
import { AuthGuard, loginGuard } from "src/app/shared/auth.guard";

const authRoute: Routes=[
    {path:'' , component:AuthComponent, canActivateChild:[loginGuard],
    children:[
        {path:'', component:LoginComponent},
        {path:'business', component:BusinessregisterComponent},
        {path:'normal', component:NormalregisterComponent},
        {path:'admin',component:AdminloginComponent}
    ]
}
]

@NgModule({
    imports:[
        RouterModule.forChild(authRoute)
    ],
    exports:[
        RouterModule
    ]

})

export class AuthRoutingModule{
    
}