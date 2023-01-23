import { Component, OnInit, ViewChild ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { verifylogin } from 'src/app/models/model';
import { AuthService } from 'src/app/service/auth.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from '@abacritt/angularx-social-login'; 
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { CommonserviceService } from 'src/app/service/commonservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  changelogin:boolean=true
  hide: boolean = true
  loginForm!: FormGroup;
  UserExist: string | undefined
  user!: SocialUser;
  loggedIn!: boolean;

  @ViewChild('myform') form: NgForm | undefined

  constructor(private authervice: SocialAuthService,private service: AuthService, private router: Router, private commonService:CommonserviceService) { }

  ngOnInit(): void {
    this.authervice.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.service.googleLogin(user).subscribe((data)=>{
        localStorage.setItem('token', data.token);
        localStorage.setItem('type',"business")
        localStorage.setItem('username', data.data.user);
        localStorage.setItem('userid', data.data.id);
        this.router.navigate(['home'])
      })
    });
  }

  changeLogin(){
    this.changelogin=false
  }
  changeLogins(){
    this.changelogin=true
  }

  onsubmit() {
    let data=this.form?.value
    data.type="business"
    this.service.Loginform(data).subscribe((result) => {
      let data: verifylogin = result
      if (data.user && data.token) {
        localStorage.setItem('token', data.token);
        this.commonService.getUser()
          this.router.navigate(['home'])
      } else if (data.user && !data.password) {
        this.UserExist = "Incorrect Password"
      } else {
        this.UserExist = "Invalid email"
      }
    })
  }

  onsubmits() {
    let data=this.form?.value
    console.log("klklkcc");
    
    this.service.Loginform(data).subscribe((result) => {
      let data: verifylogin = result
      if (data.user && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('type',"normal")
        localStorage.setItem('username', data.data.user);
        localStorage.setItem('userid', data.data.id);
          this.router.navigate(['home'])
      } else if (data.user && !data.password) {
        this.UserExist = "Incorrect Password"
      } else {
        this.UserExist = "Invalid email"
      }
    })
  }
   
  loginWithGoogle(){
    this.authervice.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user);
      this.service.googleLogin(user).subscribe((data)=>{
        localStorage.setItem('token', data.token);
        this.commonService.getUser()
        this.router.navigate(['home'])
      })
    });
    this.authervice.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
