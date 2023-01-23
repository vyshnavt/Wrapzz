import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { category } from '../models/model';
import { Plan } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  private url='http://localhost:3000'
  constructor(private http:HttpClient) { }

  getCategory():Observable<category>{
    return this.http.get<category>(`${this.url}/admin/getCategory`)
  }

  addCategory(data:string):Observable<string>{
    return this.http.post<string>(`${this.url}/admin/addCategory`,data)
  }

  editCategory(data:string):Observable<string>{
    return this.http.post<string>(`${this.url}/editCategory`,data)
  }

  getNormalUser():Observable<any>{
    return this.http.get(`${this.url}/admin/normalUser`)
  }

  getPlans(){
    return this.http.get(`${this.url}/admin/getPlans`)
  }

  addPlan(data:Plan){
    return this.http.post(`${this.url}/admin/addPlan`,data)
  }

  getPayments(){
    return this.http.get(`${this.url}/admin/getPayments`)
  }

  getBusinessUser():Observable<any>{
    return this.http.get(`${this.url}/admin/businessUser`)
  }

  editPlan(data:Plan):Observable<string>{
    return this.http.put<string>(`${this.url}/admin/editPlan`,data)
  }

  deletePlan(data:string):Observable<string>{
    return this.http.patch<string>(`${this.url}/admin/deletePlan`,{data})
  }

  blockUser(data:string):Observable<string>{
    return this.http.patch<string>(`${this.url}/admin/blockUser`,{data})
  }

  unblockUser(data:string):Observable<string>{
    return this.http.patch<string>(`${this.url}/admin/unblockUser`,{data})
  }

  deletePayment(data:string):Observable<string>{
    return this.http.post<string>(`${this.url}/admin/deletePayment`,{data})
  }

}
