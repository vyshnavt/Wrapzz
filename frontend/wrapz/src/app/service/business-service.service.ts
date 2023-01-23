import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { payment ,paymentdata, Plan} from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class BusinessServiceService {

 private url = 'http://localhost:3000'
  constructor(private http:HttpClient) { }

  imageUpload(data:any):Observable<any>{  
    return this.http.post<any>(`${this.url}/postUpload`,data)
  }

  doPayment(data:paymentdata):Observable<payment>{
    return this.http.post<payment>(`${this.url}/doPayment`,data)
  }

  checkPayment(data:any,paymentId:string):Observable<any>{
    data.payment_id=paymentId
      return this.http.post<any>(`${this.url}/verifyPayment`,data)
  }
  // checkPayment(data:any):Observable<any>{
  //     return this.http.post<any>(`${this.url}/verifyPayment`,data)
  // }
  
  getPaymentuser():Observable<any>{
    return this.http.get<any>(`${this.url}/getPayment`)
  }

  editProfile(data:any):Observable<any>{
    return this.http.post<any>(`${this.url}/editProfile`,data)
  }

  addHighlights(postId:string):Observable<string>{
    return this.http.post<string>(`${this.url}/addHighlights`,{postId})
  }

  getPlans():Observable<Plan>{
    return this.http.get<Plan>(`${this.url}/getPlans`)
  }

  removePost(Id:string):Observable<string>{
    return this.http.delete<string>(`${this.url}/deletePost/${Id}`)
  }

  removeComment(Id:string):Observable<string>{
    return this.http.delete<string>(`${this.url}/deleteComment/${Id}`)
  }

}
