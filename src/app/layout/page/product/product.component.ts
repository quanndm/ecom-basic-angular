import { Component, OnInit, DoCheck } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/product.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, DoCheck {
  categorySelected: "electronics" | "jewelery" | "men's clothing" | "women's clothing" = "electronics";
  products: Array<Product> = [];
  loading:boolean = true;
  searchStr: string = "";
  sort:string = "asc"
  searchData:Array<Product> = [];
  constructor(private productService: ProductService, private searchService:SearchService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.getProducts(this.categorySelected);

  }
  ngDoCheck() {
    this.searchStr = this.searchService.getSearch();
    if (this.searchService.getIsSearch()) {
      this.onSearch();

      this.searchService.setIsSearch(false);

    }
  }
  async getProductsJewelery() {
    this.loading = true;
    const res = await this.productService.getProductsJewelery();
    this.products = res as Array<Product>;
    this.searchData = [...this.products]
    this.loading = false;
  }
  async getProductsElectronics() {
    this.loading = true;
    const res = await this.productService.getProductsElectronics();
    this.products = res as Array<Product>;
    this.searchData = [...this.products]
    this.loading = false;
  }
  async getProductsMenClothes() {
    this.loading = true;
    const res = await this.productService.getProductsMenClothes();
    this.products = res as Array<Product>;
    this.searchData = [...this.products]
    this.loading = false;
  }
  async getProductsWomenClothes() {
    this.loading = true;
    const res = await this.productService.getProductsWomenClothes();
    this.products = res as Array<Product>;
    this.searchData = [...this.products]
    this.loading = false;
  }
  getProducts(categorySelected:"electronics" | "jewelery" | "men's clothing" | "women's clothing") {
    this.categorySelected = categorySelected;
    switch (this.categorySelected ) {
      case "electronics":
        this.getProductsElectronics();
        break;
      case "jewelery":
        this.getProductsJewelery();
        break;
      case "men's clothing":
        this.getProductsMenClothes();
        break;
      case "women's clothing":
        this.getProductsWomenClothes();
        break;
    }
  }
  // sort
  sortTitle(){
    if(this.sort === "asc"){
      this.sort = "desc";
      this.searchData.sort((a, b)=>{
        if (a.title && b.title && (a.title.charAt(0).toLowerCase() > b.title.charAt(0).toLowerCase())) {
          return 1;
        }else if(a.title && b.title && (a.title.charAt(0).toLowerCase() < b.title.charAt(0).toLowerCase())) {
          return -1;
        }else return 0;
      })
    }else{
      this.sort = "asc";
      this.searchData.sort((a, b)=>{
        if (a.title && b.title && (a.title.charAt(0).toLowerCase() < b.title.charAt(0).toLowerCase())) {
          return 1;
        }else if(a.title && b.title && (a.title.charAt(0).toLowerCase() > b.title.charAt(0).toLowerCase())) {
          return -1;
        }else return 0;
      })
    }
  }
  sortPrice(){
    if(this.sort === "asc"){
      this.sort = "desc";
      this.searchData.sort((a, b)=>{
        if(a.price && b.price && a.price>b.price) return 1
        else if(a.price && b.price && a.price<b.price) return -1;
        else return 0;
      })
    }else{
      this.sort = "asc";
      this.searchData.sort((a, b)=>{
        if(a.price && b.price && a.price<b.price) return 1
        else if(a.price && b.price && a.price>b.price) return -1;
        else return 0;
      })
    }
  }
  // search
  async onSearch(){
    if(this.searchStr.length === 0){
       this.searchData = this.products;
       return;
    }else{
      const res = await this.productService.getAllProducts();
      let search = this.searchStr.trim().toLowerCase();
      this.searchData = (res as Array<Product>).filter((item)=>item.title?.toLowerCase().includes(search));
      return;
    }
  }
  // check search
  checkIsSearh(){
    return this.searchService.getIsSearch();
  }
}
