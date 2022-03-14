import { Injectable,Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private httpClient?: HttpClient;
  private API_SERVER:string = "https://fakestoreapi.com";
  private header?:HttpHeaders;
  constructor(private injectable: Injector) {
    if (this.injectable) {
      this.httpClient = this.injectable.get(HttpClient);
      this.header = new HttpHeaders().set("Content-type", "application/json")
      // this.header = this.header.set("Authorization",
      // "Bearer 50e1df621b783dd6778020594ed2cf90bb20a2734f04cbb7291637ab7ba7a358"
      // )
    }
  }
  public get(path:string="", param:any){
    return new Promise((success, fail)=>{
      try {
        this.httpClient?.get(this.API_SERVER + path, {params:param})
        .subscribe((res:any)=>{
          success(res)
        })
      } catch (error) {
        fail(error)
      }
    })
  }
  public post(path:string="", body:any){
    return new Promise((success, fail)=>{
      try {
        this.httpClient?.post(this.API_SERVER + path, body, {headers: this.header})
        .subscribe((res:any)=>{
          success(res)
        })
      } catch (error) {
        fail(error)
      }
    })
  }
}
