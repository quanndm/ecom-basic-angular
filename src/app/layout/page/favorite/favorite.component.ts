import { Component, OnInit, DoCheck } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/service/auth.service';
import { FavoriteService } from 'src/app/service/favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit, DoCheck {
  user?:User;
  favorites:Array<Product> = []
  constructor(private authService:AuthService, private favoriteService:FavoriteService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.favorites = this.favoriteService.getFavorites();
  }
  ngDoCheck(){
    this.favorites = this.favoriteService.getFavorites();
  }
}
