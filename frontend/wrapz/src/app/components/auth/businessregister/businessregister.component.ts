import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { AdminserviceService } from 'src/app/service/adminservice.service';
import { category } from 'src/app/models/model'

import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "@abacritt/angularx-social-login";


@Component({
  selector: 'app-businessregister',
  templateUrl: './businessregister.component.html',
  styleUrls: ['./businessregister.component.scss']
})
export class BusinessregisterComponent implements OnInit {

 category:category|any

  reactiveForm:FormGroup|any;
  UserExist:string|undefined
  constructor(private service:AuthService, private route:Router, private adminservice:AdminserviceService,private authService: SocialAuthService) { }

  ngOnInit(): void {

    this.adminservice.getCategory().subscribe((data)=>{
      this.category=data
    })

    this.reactiveForm = new FormGroup({
      name:new FormControl(null, Validators.required),
      email:new FormControl(null, [Validators.required, this.emailvalidate]),
      number:new FormControl(null, Validators.required),
      category:new FormControl(null, Validators.required),
      usercategory:new FormControl(null),
      user:new FormControl('business'),
      status:new FormControl(true),
      password:new FormControl(null, Validators.required)
    })
  }
  
  formsubmit() {
    this.service.resgisteruser(this.reactiveForm.value).subscribe((data) => {
      if(data.responce) this.route.navigate(['Home'])
      else this.UserExist="Email Already Exist!"
    })
  }

  emailvalidate(control:FormControl){
    if(control.value){
      let res=control.value.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)
      if (res)return null
      else return {emailvalidate:true}    
  }else{
    return {emailvalidate:true}
  }
}
google(){
  this.signInWithGoogle()
}
signInWithGoogle(): void {
  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
}

signInWithFB(): void {
  this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
}

signOut(): void {
  this.authService.signOut();
}
}
