import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService:UserService,private router:Router){}
  canActivate(){
    if(this.userService.isLoggedIn()){
      return true;
    }
    else{
      this.router.navigateByUrl('/');
      return false;
    }

  }
    
  }
  

