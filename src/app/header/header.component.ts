import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userService:UserService) { }

  id:string;

  fullName:string;
  resultData:any=[];

  ngOnInit() {
    this.id=sessionStorage.getItem('userid');

    this.userService.getuserInfo(this.id).subscribe((res)=>{
      this.resultData=res;
      this.fullName=this.resultData.User.firstName + " " + this.resultData.User.lastName;
      
    })

    
}
  

}
