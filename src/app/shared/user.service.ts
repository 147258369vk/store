import { Injectable } from '@angular/core';
import { User,Login } from './user.model';
import { HttpClient } from '@angular/common/http';

import { ElementSchemaRegistry } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  newUser:User={
    fname:'',
    lname:'',
    email:'',
    password:''
  }

  newlogin:Login={
    email:'',
    password:''
  }

  constructor(private http:HttpClient) { }

  registerUser(user:User)
  {
    return this.http.post('/addUser',user);
  }

  //login

  setToken(token:string)
  {
    localStorage.setItem('token',token);
  }

  getToken()
  {
    return localStorage.getItem('token');
  }

  removeToken()
  {
    return localStorage.removeItem('token');
  }


  login(authcredentials)
  {
    return this.http.post('/auth',authcredentials);
  }

  getpayload()
  {
    var token=this.getToken();
    if(token)
    {
      var userPayload=atob(token.split('.')[1]);
      if(userPayload)
        return JSON.parse(userPayload);
      else
        return null;
    }
    
  }


  isLoggedIn()
  {
    var userpayload=this.getpayload();
    if(userpayload)
    {
      return userpayload.exp>Date.now()/1000;
    }
    else
    {
      return false;
    }
  }

  getuserInfo(id:string)
  {
    return this.http.get('/getInfo/'+id);
  }




}
