import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() item:Product = {} as Product;
  rate?:number;
  unrate?:number;
  constructor() { }

  ngOnInit(): void {
    this.rate = Math.round(Number(this.item.rating?.rate));
    this.unrate =5-this.rate;
  }
  createRange(number:number|undefined){
    return new Array(number);
  }
}
