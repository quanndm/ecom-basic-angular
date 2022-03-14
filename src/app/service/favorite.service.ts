import { Injectable, Input } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  @Input() favorites: Array<Product> = []
  constructor() {
    this.getFavorites()
  }

  getFavorites(){
    this.favorites = JSON.parse(localStorage.getItem("favorite") as string) || [];
    return this.favorites;
  }
  addProductToFavorites(product:Product){
    if (this.checkItemInFavorite(<number>product.id)) {
      return false;
    }else{
      this.favorites = [...this.favorites, product];
      this.saveFevorites();
      return true;
    }
  }
  RemoveProductFromFavorites(id:number){
    if(this.checkItemInFavorite(id)){
      this.favorites = this.favorites.filter(i=>i.id !== id);
      if(this.favorites.length === 0) this.clearFavorites();
      this.saveFevorites();
      return true;
    }
    return false;
  }
  saveFevorites(){
    localStorage.setItem("favorite", JSON.stringify(this.favorites));
  }
  checkItemInFavorite(id:number){
    return this.getFavorites().find(i=>i.id === id)?true:false;
  }
  clearFavorites(){
    localStorage.removeItem("favorite");
    return;
  }
}
