import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { MaterialModule } from "src/app/material/material.module";;
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule} from '@angular/flex-layout';
import { CommonModule } from "@angular/common";

import { LoginLandingModule } from "./loginlanding-routing.module";

import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { PaymentComponent } from "./payment/payment.component";
import { ProfileComponent } from "./profile/profile.component";
import { LoginlandingComponent } from "./loginlanding.component";
import { EditdailogComponent } from './editdailog/editdailog.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { SearchComponent } from './search/search.component';
import { ExpiryComponent } from './expiry/expiry.component';
import { ChatsComponent } from './chats/chats.component';

@NgModule({
    declarations:[
        ProfileComponent,
        PaymentComponent,
        HomeComponent,
        HeaderComponent,
        LoginlandingComponent,
        EditdailogComponent,
        ViewprofileComponent,
        SearchComponent,
        ExpiryComponent,
        ChatsComponent 
    ],
    imports:[
        CommonModule ,
        FormsModule ,
        LoginLandingModule,
        MaterialModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        
    ]
})

export class LoginlandingModule{}