import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { verifylogin } from 'src/app/models/model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {

  hide: boolean = true
  UserExist: string | undefined
  @ViewChild('myform') form: NgForm | undefined
  constructor(private service: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onsubmit() {
    this.router.navigate(['adminhome'])
    // console.log("5555");
    
    // this.service.Loginform(this.form?.value).subscribe((result) => {
    //   let data: verifylogin = result
    //   if (data.user && data.token) {
    //     console.log("3333");
    //     localStorage.setItem('token', data.token);
    //       this.router.navigate(['adminhome'])
    //   } else if (data.user && !data.password) {
    //     this.UserExist = "Incorrect Password"
    //   } else {
    //     this.UserExist = "Invalid email"
    //   }
    // })
  }
   
  goggleverification(){

  }


}
