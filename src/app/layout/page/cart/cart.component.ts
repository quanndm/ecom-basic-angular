import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, DoCheck {
  lastname:string="";
  firstname:string = "";
  address:string = "";
  phone:string = "";
  userData: User = {};
  carts: Array<Product & { quantity: number }> = []
  isLogin: boolean = false;
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService
  ) { }
  checkLogin() {
    const user = sessionStorage.getItem("user");
    if (user) this.isLogin = true;
    else this.isLogin = false;
  }
  ngOnInit(): void {
    this.carts = this.cartService.getCart();
    this.getUser()
  }
  ngDoCheck(){
    this.carts = this.cartService.getCart();
    this.getUser()
  }
  totalPriceOneItem(price?: number, quantity?: number) {
    return <number>price * <number>quantity;
  }
  totalItem() {
    return this.cartService.getCart().reduce((prev, current) => prev + current.quantity, 0)
  }
  totalPrice() {
    return this.cartService.getCart().reduce((prev, current) => prev + current.quantity * <number>current.price, 0)
  }
  getUser() {
    this.checkLogin();
    if (this.isLogin) {
      this.userData = this.authService.getUser();
    }
  }
  getAddress() {
    return this.userData.address?.city + ", " + this.userData.address?.number + " " + this.userData.address?.street
  }
  getPhone(){
    return this.userData.phone;
  }
  getName(){
    return this.userData.name?.lastname + " " +this.userData.name?.firstname;
  }
  isEmptyUserObj(obj: User) {
    return Object.keys(obj).length === 0;
  }
  removeItemCart(id?:number){
    this.carts = this.carts.filter(i=>i.id !== id);
    this.cartService.updateCart(this.carts);
  }
  onCheckout(){
    if(this.cartService.getCart().length === 0){
      alert("vui long them san pham vao gio hang!");
      return;
    }
    if(this.lastname.length === 0 || this.firstname.length===0 || this.address.length===0 || this.phone.length===0){
      alert("vui long nhap thong tin khach hang!");
      return;
    }
    if(!this.isEmptyUserObj(this.userData)){
      const order = {
        user: this.userData,
        cart: this.cartService.getCart(),
        total: this.totalPrice(),
        quantity: this.totalItem()
      }
      const orders = [...this.orderService.getOrders(), order];
      this.orderService.updateOrders(orders);
      this.cartService.removeCart();
      alert("dat hang thanh cong!!")
      return;
    }else{
      const user:Partial<User> = {
        name: {
          lastname: this.lastname,
          firstname: this.firstname
        },
        phone:this.phone,
        address:{
          street: this.address,
          city: "",
          number: 0
        }
      }
      const order = {
        user: user,
        cart: this.cartService.getCart(),
        total: this.totalPrice(),
        quantity: this.totalItem()
      }
      const orders = [...this.orderService.getOrders(), order];
      this.orderService.updateOrders(orders);
      this.cartService.removeCart();
      alert("dat hang thanh cong")
      return;
    }

  }
  IncreaseItem(id?:number){
    let newCart = [...this.cartService.getCart()];
    newCart.forEach(e=>{
      if(e.id === id && e.quantity < 99){
        e.quantity = e.quantity + 1;
      }
    })
    this.cartService.updateCart(newCart);
    this.carts = this.cartService.getCart();
  }
  decreaseItem(id?:number, quantity?:number){
    let newCart = [...this.cartService.getCart()];
    if (quantity === 1) {
      this.removeItemCart(id);
      return;
    }
    newCart.forEach(e=>{
      if(e.id === id && e.quantity > 0){
        e.quantity = e.quantity - 1;
      }
    })
    this.cartService.updateCart(newCart);
    this.carts = this.cartService.getCart();
  }
}
