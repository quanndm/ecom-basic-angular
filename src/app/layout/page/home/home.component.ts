import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, DoCheck {
  products?: Product[];
  productsTopRate?:Product[];
  loading:boolean = true;
  constructor(private productService:ProductService,  private router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.onLoad();
  }
  onLoad(){
    this.productService.getProductThumb()
    .then(res=>{
      this.products =  <Array<Product>>res;
    })
    .catch(err=>console.log(err))

    this.productService.getProductsTopRate()
    .then(res=>{
      this.productsTopRate = <Array<Product>>res;
    }).catch(err=>console.log(err))
  }
  ngDoCheck(){
    if(this.products) this.loading = false
  }
  goToProductPage(){
    this.router.navigate(["/product"])
  }
}
