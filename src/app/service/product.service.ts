import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { HttpParams } from '@angular/common/http';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(inject:Injector) {
    super(inject);
  }
  getAllProducts(){
    return this.get("/products", {})
  }
  getProductById(id:number){
    return this.get(`/products/${id}`, {});
  }
  getProductThumb(){
    const params = new HttpParams().set('limit', 6)
    return this.get("/products", params);
  }
  async getProductsTopRate(){
    const res = await this.getAllProducts();
    return (<Array<Product>>res).sort((a, b)=><number>b.rating?.rate - <number>a.rating?.rate).slice(0, 6);
  }
  getProductsJewelery(){
    return this.get("/products/category/jewelery", {})
  }
  getProductsElectronics(){
    return this.get("/products/category/electronics", {})
  }
  getProductsMenClothes(){
    return this.get("/products/category/men's clothing", {})
  }
  getProductsWomenClothes(){
    return this.get("/products/category/women's clothing", {})
  }
}
