import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from 'src/app/service/adminservice.service';

@Component({
  selector: 'app-businessuser',
  templateUrl: './businessuser.component.html',
  styleUrls: ['./businessuser.component.scss']
})
export class BusinessuserComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'date','expire','status'];
  user:any
  constructor(private service:AdminserviceService) {}

  ngOnInit(): void {
    this.service.getBusinessUser().subscribe((data)=>{
      this.user=data
      console.log(this.user);
      
    })
  }

  UnblockUser(_id:string){
    this.service.unblockUser(_id).subscribe((data)=>{
      console.log(data); 
    })
    let index=this.user.findIndex((x:any)=> x._id==_id)
    this.user[index].status=true
  }

  blockUser(_id:string){
    this.service.blockUser(_id).subscribe((data)=>{
      console.log(data);
    })
    let index=this.user.findIndex((x:any)=> x._id==_id)
    this.user[index].status=false
  }
}
