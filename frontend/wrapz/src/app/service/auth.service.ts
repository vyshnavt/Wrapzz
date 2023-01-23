import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginInfo, routeverify, verifylogin, userInfo } from '../models/model';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url='http://localhost:3000';

  constructor(private http:HttpClient) { }

  adminLoginform(userdata:loginInfo):Observable<verifylogin>{
    return this.http.post<verifylogin>(`${this.url}/admin`,userdata)
  }

  Loginform(userdata:loginInfo):Observable<verifylogin>{
    return this.http.post<verifylogin>(this.url,userdata)
  }

  loginauth():Observable<routeverify>{
    return this.http.get<routeverify>(`${this.url}/verification`)
  }

  getToken(){
    return  localStorage.getItem('token')||''
  }

  getProfile():Observable<any>{
    return this.http.get<any>(`${this.url}/profile`)
  }

  resgisteruser(userdata: userInfo): Observable<userInfo> {
    return this.http.post<userInfo>(`${this.url}/Signup`, userdata)
  }
  
  googleLogin(data:any):Observable<any>{
    return this.http.post<any>(`${this.url}/googleLogin`,data)
  }
}

