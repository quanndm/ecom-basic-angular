import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart-favorite',
  templateUrl: './cart-favorite.component.html',
  styleUrls: ['./cart-favorite.component.scss']
})
export class CartFavoriteComponent implements OnInit {
  @Input() item:Product = <Product>{};

  constructor() { }

  ngOnInit(): void {
  }

}
