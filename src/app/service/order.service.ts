import { Injectable, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { User } from '../models/User.model';

type OrderType = {
  user:Partial<User> ,
  cart: Array<Product & {quantity:number}>,
  total: number,
  quantity: number
}
@Injectable({
  providedIn: 'root'
})

export class OrderService {
  @Input() Orders:Array<OrderType> = []
  constructor() { }
  getOrders(){
    this.Orders = JSON.parse(<string>localStorage.getItem("orders")) || [];
    return this.Orders;
  }
  saveOrders(){
    localStorage.setItem("orders", JSON.stringify(this.Orders))
    return;
  }
  updateOrders(orders:Array<OrderType>){
    this.Orders = [...orders];
    this.saveOrders();
    return;
  }
}
