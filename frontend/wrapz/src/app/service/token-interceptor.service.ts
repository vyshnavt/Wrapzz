import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenService=this.inject.get(AuthService);
    let jwtToken = req.clone({
      setHeaders:{
        Autherization:'bearer '+  tokenService.getToken()
      }
    })
    return next.handle(jwtToken)
  }

  constructor(private inject:Injector) { }
}