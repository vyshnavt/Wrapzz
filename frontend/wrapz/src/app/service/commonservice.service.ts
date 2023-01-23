import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { likedata , commentdata,postdata, userInfo,loginusercheck, exa} from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {
  private url='http://localhost:3000';
  searchData:any
  LoginUser:loginusercheck={}
  subject=new Subject()
  subjectUser=new BehaviorSubject(this.LoginUser)
  constructor(private http:HttpClient) { }
  getUser(){
    this.http.get<loginusercheck>(`${this.url}/getLoginUser`).subscribe((data)=>{
      this.LoginUser=data
      this.subjectUser.next(this.LoginUser)
    })
  }

  getPost():Observable<postdata>{
    return this.http.get<postdata>(`${this.url}/getPost`)
  }

  getUserProfile(Id?:string):Observable<postdata>{
    return this.http.get<postdata>(`${this.url}/getPostuser/?id=${Id}`)
  }

  likePost(postId:string):Observable<string>{
    return this.http.post<string>(`${this.url}/likePost`,{postId})
  }

  commentPost(data:commentdata):Observable<commentdata>{
    return this.http.post<commentdata>(`${this.url}/addComment`,data)
  }

  editCommentPost(data:any):Observable<commentdata>{
    return this.http.patch<commentdata>(`${this.url}/editCommentPost`,data)
  }

  followuser(data:string):Observable<string>{
    return this.http.post<string>(`${this.url}/followUser`,{data})
  }

  search(data:string){
    this.http.post<any>(`${this.url}/search`,{data}).subscribe((data)=>{
      this.searchData= data
      this.subject.next(this.searchData)
    })    
  }

  userDetail(Id?:string):Observable<any>{
    return this.http.get<any>(`${this.url}/getUserDetails/?id=${Id}`)
  }

  getComments(postId:string):Observable<any>{
    return this.http.get<any>(`${this.url}/getComments/${postId}`)
  }

  click():Observable<any>{
    return this.http.get('http://localhost:8080')
  }

  getConversations():Observable<any>{
    return this.http.get<any>(`${this.url}/getConversations`)
  }

  getMessages(conversationId:string):Observable<any>{
    return this.http.get<any>(`${this.url}/getMessages/${conversationId}`)
  }

  sendMessage(message:any):Observable<any>{
    return this.http.post<any>(`${this.url}/addMessages`,message)
  }

  getFollowers():Observable<any>{
    return this.http.get<any>(`${this.url}/getFollowers`)
  }

  getSingleCoversations(endUserId:string):Observable<any>{
    return this.http.get<any>(`${this.url}/getSingleCoversations/${endUserId}`)
  }

}
