import { Component, OnInit ,Inject} from '@angular/core';
import {Dialog,DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
import { AdminserviceService } from 'src/app/service/adminservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessServiceService } from 'src/app/service/business-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editdailog',
  templateUrl: './editdailog.component.html',
  styleUrls: ['./editdailog.component.scss']
})
export class EditdailogComponent implements OnInit {
  category:any
  userImage='../../../assets/joh.jpg'
  imageFile:any=null;
  reactiveForm:any;
  doesImage:boolean=false
  constructor(public dialogRef: DialogRef<string>,@Inject(DIALOG_DATA) public data: any,private service:AdminserviceService,private businessService:BusinessServiceService) { }

  ngOnInit(): void {
    this.userImage=this.data.imageurl
    this.service.getCategory().subscribe((data)=>{
      this.category=data
    })
    this.reactiveForm=new FormGroup({
      name:new FormControl(this.data.data.name,Validators.required),
      number:new FormControl(this.data.data.number,Validators.required),
      category:new FormControl(this.data.data.category,Validators.required),
      about:new FormControl(this.data.data.about,Validators.required),
    })
  }

  imgUpload(event:any){
    console.log(event.target.files[0]);
    if(event.target.files[0]!=undefined){
      this.doesImage=true
    }
    let filetype=event.target.files[0].type
    if(filetype.match(/image\/*/)){
      this.imageFile=event.target.files[0]
      let reader=new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload =(event:any)=>{
        this.userImage=event.target.result;
      }
    }else{
    Swal.fire("Select a image File")
    }
  }

  onSubmit(){
    let profilefile=new FormData()
    profilefile.append('image',this.imageFile)
    profilefile.append('name',this.reactiveForm.value.name)
    profilefile.append('number',this.reactiveForm.value.number)
    profilefile.append('category',this.reactiveForm.value.category)
    profilefile.append('about',this.reactiveForm.value.about)
    if(this.doesImage){
      profilefile.append('imagename',`http://localhost:3000/images/${this.data.data._id}.jpg`)
    }else{
      profilefile.append('imagename',this.data.data.image)
    }
    this.businessService.editProfile(profilefile).subscribe((data)=>{
    })
    this.dialogRef.close(this.reactiveForm.value)
  }


}

