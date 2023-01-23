import { Injectable } from '@angular/core';
import { CanActivateChild, Router} from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivateChild{
  constructor(private service: AuthService, private route: Router) { }
  canActivateChild():any{
    let token=localStorage.getItem('token')
    if (token&&token!=undefined&&token!=null) {      
      this.service.loginauth().subscribe((data)=>{
        if(data.user){
          return true;
        }else{
          this.route.navigate([''])
          return false
        }
      }) 
    }else{
      this.route.navigate([''])
      return false
    }
  }  
}

@Injectable({
  providedIn: 'root'
})
export class loginGuard implements CanActivateChild {
  constructor(private service: AuthService, private route: Router) { }

  canActivateChild():any {
    let token=localStorage.getItem('token')
    if (token) { 
      this.service.loginauth().subscribe((data)=>{
        if(data.user){
          this.route.navigate(['home'])
          return false;  
        }else{
          return true
        }
      }) 
    } else {
      return true;
    }
  }

}
