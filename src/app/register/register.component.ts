import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public userService:UserService,public router:Router) { }
  showSuccessMsg:boolean=false;
  errorMsg:string
  ngOnInit() {
  }

  register(form:NgForm)
  {
    this.userService.registerUser(form.value).subscribe(
      res=>{
        
        this.showSuccessMsg=true;
      } ,
      (err)=>{
        this.errorMsg=err;
      }
    )
  }
}
