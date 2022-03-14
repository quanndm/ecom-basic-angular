import { Injectable, Injector, Input } from '@angular/core';
import { User } from '../models/User.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{
  @Input() user:User = {}
  constructor(inject:Injector) {
    super(inject);
  }
  getUser(){
    this.user = JSON.parse(<string>sessionStorage.getItem("user")) || {};
    return this.user;
  }
  // check from auth
  checkLogin(){
    const user = this.getUser();
    if(user) return this.verifyLogin(user);
    return false;
  }
  verifyLogin(user:User){
    if (user.username?.length!== 0 && user.password?.length!==0) {
      this.getAllUser().then(resp=>{
        (<Array<User>>resp).forEach(u=>{
          if(u.username === user.username && u.password === user.password) return true;
          return false;
        })
      }).catch()
      return true;
    }
    return false;
  }
  // login from form
  doLogin(user:User){
    if (user.username?.length!== 0 && user.password?.length!==0) {
      this.getAllUser().then(resp=>{
        (<Array<User>>resp).forEach(u=>{
          if(u.username === user.username && u.password === user.password){
            sessionStorage.setItem('user',JSON.stringify(u));
          }
        })
      }).catch()
      return true;
    }
    return false;
  }
  getAllUser(){
    return this.get("/users", {})
  }
}
