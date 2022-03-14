import { Component, OnInit, DoCheck, Input  } from '@angular/core';
import {  Router,NavigationEnd   } from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,DoCheck  {
  showSearch:boolean = false;
  constructor(private router: Router){

  }
  ngOnInit(): void {

  }
  ngDoCheck() {
    switch (this.router.url) {
      case "/product":
        this.showSearch = true;
        break;
      default:
        this.showSearch = false;
        break;
    }
  }

}
