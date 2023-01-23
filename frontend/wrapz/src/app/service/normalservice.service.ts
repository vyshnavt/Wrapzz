import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NormalserviceService {

  private url = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getProfile():Observable<any>{
    return this.http.get<any>(`${this.url}/profile`)
  }

  
}
