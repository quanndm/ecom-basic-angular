import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user:User = new User();
  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

  }
  onSubmit(frm:NgForm){
    if(frm.valid){
      if(this.authService.doLogin(this.user)){
        alert("adang nhap thanh cong")
        this.router.navigate(['/'])
      }else{
        alert("Dang nhap that bai")
      }
    }else{
      alert("vui long nhap du thong tin dang nhap")
    }
  }
}
