import { Component, OnInit } from '@angular/core';
import { exa, postdata ,loginusercheck} from 'src/app/models/model';
import { CommonserviceService } from 'src/app/service/commonservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessServiceService } from 'src/app/service/business-service.service';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.scss']
})
export class ViewprofileComponent implements OnInit {
  postData:postdata|any
  userId:string|any
  commentvalue:string=""
  userid:string|any
  follows:boolean=false
  about:boolean=false
  followdiv:boolean=false
  displayscreen:string=""
  router: any;
  userDetail:any
  userCheck:loginusercheck={}
  editcommentvalue!:string
  constructor(private commonservice:CommonserviceService,private activatedRoute:ActivatedRoute, private businessService:BusinessServiceService) { }


  ngOnInit(): void {
    this.commonservice.getUser()
    this.commonservice.subjectUser.subscribe((data:any)=>{
      this.userCheck=data
      this.userId=this.userCheck._id
    })
    this.userid=this.activatedRoute.snapshot.paramMap.get('id')
    this.commonservice.userDetail(this.userid).subscribe((data)=>{
      this.userDetail=data
      console.log(data);
      
    }) 
    this.commonservice.getUserProfile(this.userid).subscribe((data)=>{
      console.log(data);
      console.log("222");
      
      this.postData=data
      let followindex=this.userDetail.followers.findIndex((x:any)=> x._id==this.userCheck._id)
      if(followindex!=-1&&followindex!=undefined){
        this.follows=true
      }
    })    
  }

  onLike(postid:any){
    this.displayscreen=""
      this.about=false
      this.followdiv=false
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

    getComment(postId:string){
      let postindex=this.postData.findIndex((x:any)=> x._id==postId)
      this.commonservice.getComments(postId).subscribe((data)=>{
        this.postData[postindex].allComment=!this.postData[postindex].allComment
        this.postData[postindex].allComments=data
      })  
    }

    postComment(postId:string){
      this.displayscreen=""
      this.about=false
      this.followdiv=false
      let comment=this.commentvalue
      this.commentvalue=''
      let data={
        postId:postId,
        comment:comment,
        date:new Date(),
        username:this.userCheck.name,
        image:this.userCheck.image,
        edit:false
      }
      console.log(data);
      
      let postindex=this.postData?.findIndex((x:any)=> x._id==postId) 
      this.postData[postindex].comment.push(data) 
      this.commonservice.commentPost(data).subscribe((data)=>{
      })
    }

    follow(){
      this.displayscreen=""
      this.about=false
      this.followdiv=false
      let userid=localStorage.getItem('userid')
      let followindex=this.userDetail.followers?.findIndex((x:any)=> x._id==this.userId)
      if(followindex!=-1&&followindex!=undefined){
        this.userDetail.followers.splice(followindex,1) 
        this.follows=false
      }else{
        let data={
          name:this.userCheck.name,
          _id:this.userCheck._id,
          image:this.userCheck.image
        }
        this.userDetail.followers.push(data)
        this.follows=true
      }   
      this.commonservice.followuser(this.userid).subscribe((data)=>{ 
        console.log(data);
      })
    }

    abouts(){
      this.displayscreen=""
      this.followdiv=false
      this.about=!this.about
    }

   followers(){
      this.about=false
      this.displayscreen=""
      this.followdiv=true
    }

    openHighlights(){
      this.about=false
      this.followdiv=false
      let post=this.postData.filter((x:any)=> x.highlights==true)
      if(post.length!=0)
        this.postData=post
      else 
        this.displayscreen="No Highlights"
    }

    follosUser(Id:string){
      this.router.navigate(['home/viewprofile',Id])
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
