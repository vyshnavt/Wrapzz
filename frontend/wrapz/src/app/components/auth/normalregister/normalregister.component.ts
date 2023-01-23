import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-normalregister',
  templateUrl: './normalregister.component.html',
  styleUrls: ['./normalregister.component.scss']
})
export class NormalregisterComponent implements OnInit {

  @ViewChild('normalform') form: NgForm | undefined;
  UserExist: string | undefined
  constructor(private service:AuthService ,private route:Router) { }

  ngOnInit(): void {
  }

  formsubmit() {
    this.service.resgisteruser(this.form?.value).subscribe((data) => {
      if(data.responce) this.route.navigate(['home'])
      else this.UserExist="Email Already Exist!"
    })
  }

}
