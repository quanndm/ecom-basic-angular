import { Injectable, Input } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  @Input() cart:Array<Product & {quantity: number}> = [];
  constructor() { }
  saveCart(){
    localStorage.setItem("cart", JSON.stringify(this.cart))
  }
  getCart(){
    this.cart = JSON.parse(localStorage.getItem("cart") as string) || []
    return this.cart;
  }
  updateCart(cart:Array<Product & {quantity: number}>){
    this.cart = [...cart];
    this.saveCart();
    return;
  }
  checkItemInCart(id:number){
    return (this.getCart().find(i=>i.id === id))?true:false;
  }
  getItemInCart(id:number){
    return this.getCart().find(i=>i.id === id)
  }
  removeCart(){
    this.cart = [];
    localStorage.removeItem("cart");
    return;
  }
}
