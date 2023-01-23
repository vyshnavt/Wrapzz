import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonserviceService } from 'src/app/service/commonservice.service';

@Component({
  selector: 'app-expiry',
  templateUrl: './expiry.component.html',
  styleUrls: ['./expiry.component.scss']
})
export class ExpiryComponent implements OnInit {

  constructor(private commonservice:CommonserviceService,private router:Router) { }

  ngOnInit(): void {
    this.commonservice.getUser()
    this.commonservice.subjectUser.subscribe((userdata)=>{
      if(!userdata.expired){
        this.router.navigate(['home'])
      }
    })
  }
}
