import {Component,OnInit} from '@angular/core';
import { AdminserviceService } from 'src/app/service/adminservice.service';

@Component({
  selector: 'app-normaluser',
  templateUrl: './normaluser.component.html',
  styleUrls: ['./normaluser.component.scss']
})
export class NormaluserComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'date','status'];
  user:any
  constructor(private service:AdminserviceService) {}

  ngOnInit(): void {
    this.service.getNormalUser().subscribe((data)=>{
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
