import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FakeapiService {

  url="https://fakestoreapi.com/products";
  value:boolean=false;

  currentUserCart=JSON.parse(localStorage.getItem("userCart") || "[]")
  userId=JSON.parse(localStorage.getItem("loginedUser")||"0")

  cartItem:number=0
  constructor(public http: HttpClient) { 
    this.count() 
  }
  count() {
    const UserCart=JSON.parse(localStorage.getItem("userCart") || "[]")
   const Id=JSON.parse(localStorage.getItem("loginedUser")||"0")
    this.cartItem=0
    UserCart.filter((data:any)=>{
      if(data.user==Id)
      this.cartItem++;
    })
  }
  

  fakeProductsList(){
   return this.http.get(this.url)
  }

  fakeItemDetails(productID:number){
    return this.http.get('https://fakestoreapi.com/products/'+productID)
  }
  
}
