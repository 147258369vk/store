import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { tokenName } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 user:any;
  constructor(public userService:UserService,public router:Router) { }

  ngOnInit() {
  }

  login(form:NgForm)
  {
    this.userService.login(form.value).subscribe(
    (res)=>{
      
      this.userService.setToken(res['token']);
     this.user= res['id'];
     sessionStorage.setItem('userid',this.user._id);
      
    this.router.navigateByUrl('/dashboard');
    })
    
  }

}
