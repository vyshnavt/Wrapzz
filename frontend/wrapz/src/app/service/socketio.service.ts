import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,Subject } from 'rxjs';
import { io } from 'socket.io-client'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket:any
  users:string[]=[]
  subject=new Subject()
  onlineSubject=new BehaviorSubject(this.users)
  constructor(private http:HttpClient) { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('messagesend',(message:any)=>{
      this.subject.next(message)  
    })
  }

  addUser(userId:string|undefined){
    this.socket.emit('addUser',userId)
    this.socket.on('getUsers',(users:string[])=>{
      this.users=users
      this.onlineSubject.next(this.users)
    })
  }
   
  sendMessage(message:any){
    this.socket.emit('message', message);
  }

  disconnect() { 
    if (this.socket) {
        this.socket.disconnect();
    }
 } 
}
