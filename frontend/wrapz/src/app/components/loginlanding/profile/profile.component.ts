import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { NormalserviceService } from 'src/app/service/normalservice.service';
import { BusinessServiceService } from 'src/app/service/business-service.service';
import { exa, postdata } from 'src/app/models/model';
import { CommonserviceService } from 'src/app/service/commonservice.service';
import { EditdailogComponent } from '../editdailog/editdailog.component';
import {Dialog, DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnChanges {
  upload:boolean=false
  panelOpenState:boolean=false
  selectedFile:any=null
  about:boolean=false
  follows:boolean=false
  url='../../../assets/uploads.png'
  userImage!:string

  postData:postdata|any
  postDatas:postdata|any
  userId:string|null=null
  commentvalue:string=""
  editcommentvalue!:string
  displayscreen:string=""
  users:exa={_id:""}
  

  @ViewChild('textvalue') description:ElementRef|undefined;
  constructor(private router:Router, private service:NormalserviceService, private busssinesservice:BusinessServiceService,private commonservice:CommonserviceService,public dialog: Dialog) { }

  imageFile:any=null;

  ngOnChanges(): void {
    console.log("onchanges"); 
  }

  ngOnInit(): void {
    this.commonservice.userDetail().subscribe((data)=>{
      this.users=data 
      console.log(data);
      
    })

    this.commonservice.getUserProfile().subscribe((data)=>{
      this.postDatas=data
      this.postData=data     
    })
    this.userId=localStorage.getItem('userid')
    
  }

  openDialog() {
    this.displayscreen=""
    const dialogRef =this.dialog.open(EditdailogComponent, {
      minWidth: '600px',
      data: {
        data: this.users,
        imageurl:this.userImage,
      },
    });
    dialogRef.closed.subscribe(result => {
      console.log('The dialog was closed');
      this.commonservice.getUser()
      let a:any=result
      this.users.name=a.name
      this.users.about=a.about
      this.users.category=a.category
      this.users.number=a.number
    });
  }

  onClick(){
    this.displayscreen=""
    this.service.getProfile().subscribe((data)=>{      
      this.router.navigate(['Profile'])
    })
    
  }

  LogOut(){
    localStorage.removeItem('token')
      this.router.navigate([''])
  }

  openUpload(){
    this.displayscreen=""
    this.about=false
    this.follows=false
    this.upload=!this.upload
    
  }

  openAbout(){
    this.displayscreen=""
    this.upload=false
    this.follows=false
    this.about=!this.about
  }

  openFollow(){
    this.displayscreen=""
    this.upload=false
    this.about=false
    this.follows=true
  }

  imgUpload(event:any){
    let filetype=event.target.files[0].type
    if(filetype.match(/image\/*/)){
      this.imageFile=event.target.files[0]
      let reader=new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload =(event:any)=>{
        this.url=event.target.result;
      }
    }else{
    window.alert("Select a image")
    }
  }

  postUpload(){
    this.displayscreen=""
    let text=this.description?.nativeElement.value
    let postfile=new FormData()
    postfile.append('image',this.imageFile,this.imageFile.name)
    postfile.append('description',text)
    this.upload=false
    this.url='../../../assets/blankimg.png'
    let userid=localStorage.getItem('userid')
    let newPost={
      _id:"",
      comment:[],
      like:[],
      user:userid,
      description:text,
      date:new Date(),
      status:true,
      highlights:false.valueOf,
      commentCount:0,
      likeCount:0,
    }
    this.busssinesservice.imageUpload(postfile).subscribe((data)=>{
      newPost._id=data
      this.postData.unshift(newPost)
    })
  }

  onLike(postid:any){
    this.displayscreen=""
    this.upload=false
    this.about=false
    this.follows=false
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

    getComment(postId:string){
      let postindex=this.postData.findIndex((x:any)=> x._id==postId)
      this.commonservice.getComments(postId).subscribe((data)=>{
        this.postData[postindex].allComment=!this.postData[postindex].allComment
        this.postData[postindex].allComments=data
      })  
    }

    postComment(postId:string){
      this.displayscreen=""
      this.upload=false
      this.about=false
      this.follows=false
      let comment=this.commentvalue
      this.commentvalue=''
      let data={
        postId:postId,
        comment:comment,
        date:new Date(),
        username:this.users.name,
        edit:false,
        image:this.users.image
      }
      let postindex=this.postData.findIndex((x:any)=> x._id==postId) 
      this.postData[postindex].comment.push(data) 
      this.commonservice.commentPost(data).subscribe((data)=>{
      })
    }

    addhighlights(postId:string){
      this.displayscreen=""
      this.upload=false
      this.about=false
      this.follows=false
      let postindex=this.postData.findIndex((x:any)=> x._id==postId) 
      if(this.postData[postindex].highlights==true)
      this.postData[postindex].highlights=false
      else this.postData[postindex].highlights=true
      this.busssinesservice.addHighlights(postId).subscribe((data)=>{
        console.log(data);
      })
    }

    openHighlights(){
      this.upload=false
      this.about=false
      this.follows=false
      let post=this.postData.filter((x:any)=> x.highlights==true)
      if(post.length!=0)
        this.postData=post
      else 
        this.displayscreen="No Highlights"
    }

    follosUser(Id:string){
      this.router.navigate(['home/viewprofile',Id])
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
      this.busssinesservice.removePost(Id).subscribe((data)=>{
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
      this.busssinesservice.removeComment(Id).subscribe((data)=>{
      })
    }

}
