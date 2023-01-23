import { Component, OnInit ,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { category } from 'src/app/models/model';
import { AdminserviceService } from 'src/app/service/adminservice.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss']
})
export class AdminhomeComponent implements OnInit {
  @ViewChild('myform') form: NgForm | undefined
  category:category|any
  categoryExist:string=""
  constructor(private service:AdminserviceService) { }

  ngOnInit(): void {
    this.service.getCategory().subscribe((data)=>{
      console.log(data);
      this.category=data
    })
  }

  edit(name:string){
    this.service.editCategory(name).subscribe(()=>{

    })

  }

  onSubmit(){
    this.categoryExist=""
    let newCategory=this.form?.value
    let index=this.category.findIndex((x:any)=> x.name==newCategory.name)
    if(index==-1){
    this.service.addCategory(this.form?.value).subscribe((data)=>{})
    this.category.push(newCategory)
    this.categoryExist=""
    }else{
      this.categoryExist='Category Already Exist'
    }
    
  }

}
