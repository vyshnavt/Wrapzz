import { Component, OnInit,HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { loginusercheck } from 'src/app/models/model';
import { BusinessServiceService } from 'src/app/service/business-service.service';
import { CommonserviceService } from 'src/app/service/commonservice.service';


declare var Razorpay:any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  reactiveform: FormGroup | any
  datas:any
  paymentData:any
  private paymentId:string=""
  plans:any
  userData!:loginusercheck

  constructor(private router:Router,public service:BusinessServiceService, private commonService:CommonserviceService) { }
  displayedColumns: string[] = ['date', 'plan', 'amount','days'];

  ngOnInit(): void {
    this.commonService.subjectUser.subscribe((data)=>{
      this.userData=data
      if(this.userData.user=='normal')
      this.router.navigateByUrl('/home')
    })
    this.service.getPaymentuser().subscribe((data)=>{
      this.paymentData=data
    })
    this.service.getPlans().subscribe((data)=>{
      this.plans=data
    })
    this.reactiveform = new FormGroup({
      name: new FormControl('OneMonth'),
      payment: new FormControl('razor')
    })
  }

  paymnetsubmit(){
    this.buyRazorPay()
  }
  
  razorPayOptions = {
    "key":'',
    "amount":'',
    "currency":"INR",
    "name":'',
    "description":"skartz Payment",
    "order_id":'',
    "handler":(res:any)=>{
      console.log(res);
      
    }
  };

  buyRazorPay(){
    this.service.doPayment(this.reactiveform.value).subscribe(async(res)=>{
      this.paymentId=res.receipt
      this.razorPayOptions.key="rzp_test_5uPpdrMxeSFhjj";
      this.razorPayOptions.amount="50";
      this.razorPayOptions.name="jjjj";
      this.razorPayOptions.order_id=res.id
      this.razorPayOptions.handler=this.razorPayres
      let rzp1=await new Razorpay(this.razorPayOptions);
      rzp1.open();
    })
  }

  razorPayres(respo:any){ 
   var event=new CustomEvent("Payment.success",
   {
    detail:respo,
    bubbles:true,
    cancelable:true
   })
   window.dispatchEvent(event)
  }

  @HostListener('window:Payment.success',['$event'])
  onPay(event:any):void{
    this.service.checkPayment(event.detail,this.paymentId).subscribe((data)=>{
      if(data.status){
        console.log("kkfjkf");
        console.log(this.reactiveform.value.name);
        
        let plan=this.plans.filter((x:any)=>x.name==this.reactiveform.value.name)
        plan.date=new Date()
        console.log(plan[0]);
        console.log("78987");
        console.log(this.paymentData);
        this.paymentData.details.push(plan[0])
        console.log(this.paymentData);
        console.log(this.paymentData.details);
        console.log(this.paymentData.expirydate);
        console.log("363");
        console.log(this.paymentData.expirydate);
        this.paymentData.expirydate=this.paymentData.expirydate.setDate( this.paymentData.expirydate.getDate() + 3 );
        
      }else{
        console.log("fail");
        
      }
    })
  }

}
