import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { FavoriteService } from 'src/app/service/favorite.service';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id?: string | null;
  item: Product = {} as Product;
  loading: boolean = true;
  rate?: number;
  unrate?: number;
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private favoriteService:FavoriteService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadItem();
  }
  createRange(number: number | undefined) {
    return new Array(number);
  }
  async loadItem() {
    const res = await this.productService.getProductById(Number(this.id));
    this.item = res as Product;
    this.rate = Math.round(Number(this.item.rating?.rate))
    this.unrate = 5 - this.rate
    this.loading = false;
  }
  addToCart() {
    const cart = this.cartService.getCart();
    if (!this.cartService.checkItemInCart(<number>this.item.id)) {
      const newCart = [...cart, { ...this.item, quantity: 1 }];
      this.cartService.updateCart(newCart);
      alert("them san pham thanh cong!");
      return;
    } else {
      let newCart = [...cart];
      newCart.map(i => {
        if (i.id === this.item.id) {
          i.quantity += 1;
        }
      })
      this.cartService.updateCart(newCart);
      alert("cap nhat san pham thanh cong!")
      return;
    }
  }
  handleAddAndRemoveFavorite(){
    if(this.isFavorited(<number>this.item.id)){
      this.favoriteService.RemoveProductFromFavorites(<number>this.item.id);
      alert("Da xoa san pham yeu thich");
      return;
    }else{
      this.favoriteService.addProductToFavorites(this.item);
      alert("them san pham vao yeu thich thanh cong")
    }
  }
  isFavorited(id:number|undefined){
    return this.favoriteService.checkItemInFavorite(<number>id)
  }
  isLogin() {
    const user = sessionStorage.getItem("user");
    if (user) return true;
    else return false;
  }
}
