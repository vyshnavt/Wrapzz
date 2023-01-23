import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { MaterialModule } from "src/app/material/material.module";;
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule} from '@angular/flex-layout';
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";

import { AuthComponent } from "./auth.component";
import { AdminloginComponent } from "./adminlogin/adminlogin.component";
import { BusinessregisterComponent } from "./businessregister/businessregister.component";
import { LoginComponent } from "./login/login.component";
import { NormalregisterComponent } from "./normalregister/normalregister.component";



@NgModule({
    declarations:[
        AuthComponent,
        NormalregisterComponent,
        LoginComponent,
        BusinessregisterComponent,
        AdminloginComponent
    ],
    imports:[
        CommonModule ,
        FormsModule ,
        MaterialModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        AuthRoutingModule,
    ],
})

export class LoginlandingModule{}