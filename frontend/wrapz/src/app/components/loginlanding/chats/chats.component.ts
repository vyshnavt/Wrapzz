import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { loginusercheck } from 'src/app/models/model';
import { CommonserviceService } from 'src/app/service/commonservice.service';
import { SocketioService } from 'src/app/service/socketio.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit, OnDestroy {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  reactiveForm!: FormGroup
  CHAT_ROOM = "myRandomChatRoomId";
  historyData: any
  messages: any
  userData: loginusercheck = {}
  chatId!: string
  chat:boolean=false
  reciverId: string|undefined
  followers:any
  displayFollowers:any|[]=[]
  onlineUsers:any
  chats = [1, 2, 2, 2, 2, 2, 2, , 2, 22, 2, 2, 2, 2, 2]

  constructor(private socketService: SocketioService, private commonService: CommonserviceService, private router: Router) { }

  ngOnInit(): void {
    this.commonService.getUser()
    this.commonService.subjectUser.subscribe((userdata) => {
      this.userData = userdata
      if (this.userData.expired) {
        this.router.navigate(['home/expired'])
      }else{
        this.socketService.setupSocketConnection()
        this.socketService.addUser(this.userData._id)
      }
    })
    this.commonService.getConversations().subscribe((data) => {
      this.historyData = data
      console.log("22");
      
      console.log(this.historyData);
      
    })

    this.commonService.getFollowers().subscribe((data)=>{
      this.followers=data 
      this.socketService.onlineSubject.subscribe((data)=>{
        this.onlineUsers=data
        for(let x of this.followers){
          for(let y of this.onlineUsers){
            if(y.userId==x.followers[0]._id){
              !this.displayFollowers.some((x:any)=> x._id==y.userId) &&
              this.displayFollowers.push(x.followers[0])
            }
          }
        }
      }) 
    })
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    
    this.reactiveForm = new FormGroup({
      message: new FormControl('', Validators.required)
    })
    this.socketService.subject.subscribe((data:any)=>{
      this.messages.push(data)
    })
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  submitMessage() {
    const message = this.reactiveForm.value.message;
    if (message != '') {
      let messages = {
        message: message,
        conversationId: this.chatId,
        senderId: this.userData._id,
        reciverId :this.reciverId,
        date: new Date()
      }
      this.commonService.sendMessage(messages).subscribe((data) => {
        this.messages.push(messages)
      })
      
      this.socketService.sendMessage(messages);
    }
    
  }

  getMessages(conversationId: string,members:string[]) {
    this.reciverId=members.find((x:string)=>x!=this.userData._id)
    this.chatId = conversationId
    this.chat=true
    this.commonService.getMessages(conversationId).subscribe((data) => {
      this.messages = data
      console.log(data);
    })
  }

  getSingleConversation(usersid:string){
    this.commonService.getSingleCoversations(usersid).subscribe((data)=>{
      console.log(data);
      if(data.insertedId){
        this.chatId=data.insertedId
      }else{
        this.chatId=data._id
      }
      this.commonService.getMessages(this.chatId).subscribe((messages)=>{
        this.chat=true
        this.messages=messages
        
      })
    })
  }

  ngOnDestroy() {
    this.socketService.disconnect()
  }

}
