import { Component, OnInit } from '@angular/core';
import { NormalserviceService } from 'src/app/service/normalservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonserviceService } from 'src/app/service/commonservice.service';
import { AuthService } from 'src/app/service/auth.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { exa, postdata, userInfo } from 'src/app/models/model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
name:string|null=null
reactiveForm!:FormGroup
searchData:any
users:exa={_id:""}
username:string=""
usertype:string=""
  constructor(private router:Router, private service:NormalserviceService,private commonservice:CommonserviceService, private authService:SocialAuthService) { }

  ngOnInit(): void {
    this.commonservice.getUser()
    this.commonservice.subjectUser.subscribe((data:any)=>{
      this.username=data.name 
      this.usertype=data.user
    })
    this.reactiveForm=new FormGroup({
      name:new FormControl(null)
    })
  }

  onSubmit(){
    if(this.reactiveForm.value.name&&this.reactiveForm.value.name!=" "){
      this.commonservice.search(this.reactiveForm.value.name)
      this.router.navigate(['home/search'])
    }
  }
  
  onClick(){
    this.service.getProfile().subscribe((data)=>{      
      this.router.navigate(['home/profile'])
    })
    
  }

  confirmBox(){
    Swal.fire({
      title: 'Are you sure want to LogOut?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.LogOut()
      }
    })
  }

  LogOut(){
      this.authService.signOut();
      localStorage.removeItem('token')
      this.router.navigate([''])
  }

}
