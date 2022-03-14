import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  @Input() searchStr:string = ""
  @Input() isSearch:boolean = false;
  constructor() { }
  setSearch(str:string){
    this.searchStr = str;
    this.isSearch = true;
  }
  getSearch(){return this.searchStr;}
  setIsSearch(flag: boolean){
    this.isSearch = flag;
  }
  getIsSearch(){
    return this.isSearch;
  }
}
