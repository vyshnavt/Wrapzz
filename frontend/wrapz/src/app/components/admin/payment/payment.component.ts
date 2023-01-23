import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from 'src/app/service/adminservice.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  displayedColumns: string[] = ['Date','User name','Plan name' ,'Amount','Status','Delete'];
  payments:any
  constructor(private service:AdminserviceService) {}

  ngOnInit(): void {
    this.service.getPayments().subscribe((data)=>{
      console.log(data);
      this.payments=data
      console.log(this.payments);
      
    })
  }

  delete(id:string){
    let index=this.payments.findIndex((x:any)=> x._id==id)
    this.payments.splice(index,1)
    this.service.deletePayment(id).subscribe((data)=>{
    })
  }

  
 
}
