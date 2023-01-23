import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Plan } from 'src/app/models/model';
import { AdminserviceService } from 'src/app/service/adminservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  displayedColumns: string[] = ['name', 'amount', 'days' , 'edit', 'delete'];
  categoryExist:string=""
  add:boolean=false
  edit:boolean=false
  plans:Plan|any
  reactiveForm:FormGroup|any
  editReactiveForm!:FormGroup
  constructor(private service:AdminserviceService) { }
  
  ngOnInit(): void {
    this.service.getPlans().subscribe((data)=>{
      console.log(data);
      
      this.plans=data
    })
    this.reactiveForm= new FormGroup({
      name:new FormControl(null,Validators.required),
      amount:new FormControl(null,Validators.required),
      days:new FormControl(null,Validators.required),
      status:new FormControl(true)
    })
  }

  onAdd(){
    this.edit=false
    this.add=!this.add
  }

  onSubmit(){
    this.service.addPlan(this.reactiveForm.value).subscribe(()=>{

    })
  }

  editPlan(id:string){
    this.add=false
    this.edit=!this.edit
    let plan=this.plans.filter((x:Plan)=>x._id==id)
    this.editReactiveForm=new FormGroup({
      _id:new FormControl(plan[0]._id),
      name:new FormControl(plan[0].name),
      amount:new FormControl(plan[0].amount),
      days:new FormControl(plan[0].days),
      status:new FormControl(plan[0].status)
    })
  }

  onEditSubmit(){
    this.edit=true
    let plan=this.plans.filter((x:Plan)=> x.name==this.editReactiveForm.value.name)
    if(plan[0]&&plan[0]._id!=this.editReactiveForm.value._id){
        Swal.fire('Name already exist!');
    }
    else{
      this.service.editPlan(this.reactiveForm.value).subscribe((data)=>{
        console.log(data);
      })
      let planindex=this.plans.findIndex((x:Plan)=> x._id==this.editReactiveForm.value._id)
      this.plans[planindex].name=this.editReactiveForm.value.name
      this.plans[planindex].amount=this.editReactiveForm.value.amount
      this.plans[planindex].days=this.editReactiveForm.value.days
      this.edit=false
    }
  }

  deletePlan(id:string){
   this.service.deletePlan(id).subscribe((data)=>{
    console.log(data);
   })
   let planindex=this.plans.findIndex((x:Plan)=> x._id==id)
   this.plans[planindex].status=false
  }

}
