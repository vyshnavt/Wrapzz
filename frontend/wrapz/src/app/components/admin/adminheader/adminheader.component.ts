import { Component, OnInit } from '@angular/core';
import { NormalserviceService } from 'src/app/service/normalservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.scss']
})
export class AdminheaderComponent implements OnInit {

  constructor(private router:Router, private service:NormalserviceService) { }

  ngOnInit(): void {
  }

  onClick(){
    this.service.getProfile().subscribe((data)=>{      
      this.router.navigate(['home/profile'])
    })
    
  }

  LogOut(){
      this.router.navigate(['admin'])
  }
}
