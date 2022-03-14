import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteService } from 'src/app/service/favorite.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  menuPhone:boolean = false
  @Input("showSearch") showSearch:boolean = false;
  isLogin:boolean = false;
  search:string = ""
  constructor(private searchService:SearchService, private router:Router, private favoriteService:FavoriteService) { }
  ngDoCheck(){
    this.checkLogin();
  }
  ngOnInit(): void {
    this.checkLogin();
  }
  checkLogin(){
    const user = sessionStorage.getItem("user");
    if (user) this.isLogin = true;
    else this.isLogin = false;
  }
  OpenPhoneMenu(){
    this.menuPhone = true;
  }
  ClosePhoneMenu(){
    this.menuPhone = false;
  }
  onLogout(){
    sessionStorage.removeItem("user");
    this.favoriteService.clearFavorites();
    this.router.navigate(["/"])
  }
  onSearch(){
    this.searchService.setSearch(this.search)
  }
}
