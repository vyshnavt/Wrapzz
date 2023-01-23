import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { loginusercheck, postdata } from 'src/app/models/model';
import { BusinessServiceService } from 'src/app/service/business-service.service';
import { CommonserviceService } from 'src/app/service/commonservice.service';
import { NormalserviceService } from 'src/app/service/normalservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  postData:postdata|any
  panelOpenState:boolean=true
  userId:string|null=null
  commentvalue:string=""
  user:any
  userData:loginusercheck={}
  editcommentvalue!:string
  username=localStorage.getItem('username')
  @ViewChild('commentValue') comment:ElementRef|undefined
  constructor(private router:Router, private service:NormalserviceService, private commonservice:CommonserviceService,private businessService:BusinessServiceService) { }

  ngOnInit(): void {
    this.commonservice.getUser()
    this.commonservice.subjectUser.subscribe((userdata)=>{
      this.userData=userdata
      if(this.userData.expired){
        this.router.navigate(['home/expired'])
      }
    })
    this.commonservice.getPost().subscribe((data)=>{   
      this.userId=localStorage.getItem('userid')
      this.postData=data
      console.log(this.postData);
      
    })
  }

  getComment(postId:string){
    let postindex=this.postData.findIndex((x:any)=> x._id==postId)
    this.commonservice.getComments(postId).subscribe((data)=>{
      this.postData[postindex].allComment=!this.postData[postindex].allComment
      this.postData[postindex].allComments=data
    })  
  }

  postComment(postId:string){
    let comment=this.commentvalue
    this.commentvalue=''
    
    let data={
      postId:postId,
      comment:comment,
      date:new Date(),
      username:this.userData.name,
      image:this.userData.image,
      edit:false
    }
    console.log(this.userData.image);
    
    let postindex=this.postData.findIndex((x:any)=> x._id==postId) 
    console.log(postindex);
    
    this.postData[postindex].comment.push(data) 
    this.commonservice.commentPost(data).subscribe((data)=>{
    })
  }

  onLike(postid:any){
    this.commonservice.likePost(postid).subscribe((data)=>{  
    })
    let userid=localStorage.getItem('userid')
    let postindex=this.postData.findIndex((x:any)=> x._id==postid)    
    let index=this.postData[postindex].like.findIndex((x:any)=> x==userid)
    if(index!=-1){
      this.postData[postindex].like.splice(index,1) 
    }else{
      this.postData[postindex].like.push(userid)
    }
  }

  viewprofile(Id:string){
    let userid=localStorage.getItem('userid')
    if(Id==userid) this.router.navigateByUrl('home/profile')
    else this.router.navigate(['home/viewprofile',Id])
  }

  removePost(Id:string){
    Swal.fire({
      title: 'Are you sure you want to remove this post?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.deletePost(Id)
      }
    })
  }

  deletePost(Id:string){
    this.businessService.removePost(Id).subscribe((data)=>{
      console.log(data);
    })
    let index=this.postData.findIndex((x:any)=> x._id==Id)
    this.postData.splice(index,1)
  }


  editComment(Id:string,postId:string){
    let postIndex=this.postData.findIndex((x:any)=> x._id==postId)
    let commentIndex=this.postData[postIndex].comment.findIndex((x:any)=>x._id==Id)
    this.postData[postIndex].comment[commentIndex].edit=true
    this.editcommentvalue=this.postData[postIndex].comment[commentIndex].comment
  }

  postEditComment(Id:string,postId:string){
    let data={
      commentId:Id,
      comment:this.editcommentvalue
    }
    this.commonservice.editCommentPost(data).subscribe((data)=>{
    })
    let postIndex=this.postData.findIndex((x:any)=> x._id==postId)
    let commentIndex=this.postData[postIndex].comment.findIndex((x:any)=>x._id==Id)
    this.postData[postIndex].comment[commentIndex].comment=this.editcommentvalue 
    this.postData[postIndex].comment[commentIndex].edit=false
  }

  deleteComment(Id:string,postId:string){
    let postIndex=this.postData.findIndex((x:any)=> x._id==postId)
    let commentIndex=this.postData[postIndex].comment.findIndex((x:any)=>x._id==Id)
    this.postData[postIndex].comment.splice(commentIndex,1)
    this.businessService.removeComment(Id).subscribe((data)=>{
    })
  }
}
