import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessServiceService } from 'src/app/service/business-service.service';
import { CommonserviceService } from 'src/app/service/commonservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  userData:any
  userDatas:any
  categoryData:any
  postData:any
  showUser:string="No Result!"
  showCategory:string="No Result!"
  showPosts:string="No Result!"
  commentvalue: string=''
  editcommentvalue!:string
  userId:string|undefined
  constructor( private commonservice:CommonserviceService, private router:Router, private businessService:BusinessServiceService) { }

  ngOnInit(): void {
    this.commonservice.getUser()
    this.commonservice.subjectUser.subscribe((userdata)=>{
      this.userData=userdata
      this.userId=userdata._id
    })
    this.commonservice.subject.subscribe((data:any)=>{
      this.userDatas=data.user  
      this.categoryData=data.category
      this.postData=data.post
      if(this.userDatas.length==0)
        this.showUser="No Result!"
        else
        this.showUser=""
        if(this.categoryData.length==0)
        this.showCategory="No Result!"
        else
        this.showCategory=""
        if(this.postData.length==0)
        this.showPosts="No Result!"
        else
        this.showPosts=""
    })
  }

  viewprofile(Id:string){
    if(Id==this.userId) this.router.navigateByUrl('home/profile')
    else this.router.navigate(['home/viewprofile',Id])
  }

  getComment(postId:string){
    let postindex=this.postData.findIndex((x:any)=> x._id==postId)
    this.commonservice.getComments(postId).subscribe((data)=>{
      this.postData[postindex].allComment=!this.postData[postindex].allComment
      this.postData[postindex].allComments=data
    })  
  }
  
  onLike(postid:any){
    this.commonservice.likePost(postid).subscribe((data)=>{  
    })
    let postindex=this.postData.findIndex((x:any)=> x._id==postid)    
    let index=this.postData[postindex].like.findIndex((x:any)=> x==this.userId)
    if(index!=-1){
      this.postData[postindex].like.splice(index,1) 
    }else{
      this.postData[postindex].like.push(this.userId)
    }
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
    let postindex=this.postData.findIndex((x:any)=> x._id==postId) 
    this.postData[postindex].comment.push(data) 
    this.commonservice.commentPost(data).subscribe((data)=>{
    })
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

  deleteComment( Id:string, postId:string ){
    let postIndex=this.postData.findIndex((x:any)=> x._id==postId)
    let commentIndex=this.postData[postIndex].comment.findIndex((x:any)=>x._id==Id)
    this.postData[postIndex].comment.splice(commentIndex,1)
    this.businessService.removeComment(Id).subscribe((data)=>{
    })
  }

  removePost( Id:string ){
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
    })
    let index=this.postData.findIndex((x:any)=> x._id==Id)
    this.postData.splice(index,1)
  }

}
