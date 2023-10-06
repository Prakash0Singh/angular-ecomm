import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FakeapiService } from '../services/fakeapi.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit,AfterViewInit {
  quantity: any;
  totalMoney: number = 0;
  totalQuantity: number = 0;
  userId: any;
  CartData: any = [];
// for getting the indexes of same userId
  updateDataAt:number[]=[]
  userCart: any[] = [];
  constructor(private toastr: ToastrService, private _fakeProduct: FakeapiService, private route: Router) {
    this.userId = localStorage.getItem("loginedUser")
    this.CartData = JSON.parse(localStorage.getItem("userCart") || '[]')
  }

  ngOnInit() {
    this._fakeProduct.cartItem=0;
    this.cartVal()
    this.CartData.filter((data:any)=>{
      if (data.user==this.userId) {
        this._fakeProduct.cartItem++;
      }
    })
  }

  cartVal() {
    this.CartData.filter((data: any,index:number) => {
      if (data.user == this.userId) {
        this.userCart.push(data)
        this.updateDataAt.push(index)
      }
    })
    this.userCart.forEach((data: any) => {
      this.totalQuantity += data.quantity
      this.totalMoney += data.totalAmount
    });
    this.quantity = this.userCart
    // this.quantity = this.CartData

  }
  ngAfterViewInit(){
    let items=0
    this.CartData=JSON.parse(localStorage.getItem("userCart") || "[]")
    this.userId=JSON.parse(localStorage.getItem("loginedUser")||"0")
    this.CartData.filter((data:any)=>{
      if (data.user==this.userId) {
        items++;
      }
    })
    this._fakeProduct.cartItem=items
  }

  increase(data: any) {

    if (data.quantity >= 10) {
      this.toastr.warning('Item Out of Stock', 'Stock');
    }
    else {
      this.totalMoney = 0
      this.totalQuantity = 0
      data["quantity"] = ++data.quantity
      console.log(data.quantity);
      console.log(data.price);
      data["totalAmount"] = data.price * data.quantity
      this.quantity.forEach((data: any) => {
        this.totalMoney += data.totalAmount
        this.totalQuantity += data.quantity
      });
      this.CartData.filter((e:any,index:number)=>{
        if (e.id==data.id && e.user==this.userId) {
          this.CartData[index]=data
        }
      })
      console.log(this.userCart);
      
      localStorage.setItem("userCart", JSON.stringify(this.CartData));
    }
  }
  decrease(data: any) {

    if (data.quantity < 2) {
      console.log("Remove Item");
      this.totalMoney -= data.totalAmount
      this.totalQuantity -= data.quantity
      // for remove matching data from all userList Cart
      this.CartData.filter((e:any,index:number)=>{
        if (e.id==data.id && e.user==this.userId) {
          this.CartData.splice(index,1)
        }
      })
      // for remove matching data from current userList cart
      this.quantity.filter((e:any,index:number)=>{
        if (e.id==data.id) {
          this.quantity.splice(index,1)
        }
      })   
      localStorage.setItem("userCart", JSON.stringify(this.CartData))
      this._fakeProduct.cartItem = this.quantity.length;
      console.log(this.userCart);
    }

    else {
      console.log("Remove Quantity");

      this.totalMoney = 0;
      this.totalQuantity = 0;
      data["quantity"] = --data.quantity
      data["totalAmount"] = data.price * data.quantity
      this.quantity.forEach((data: any) => {
        this.totalMoney += data.totalAmount
        this.totalQuantity += data.quantity
      });
      this.CartData.filter((e:any,index:number)=>{
        if (e.id==data.id && e.user==this.userId) {
          this.CartData[index]=data
        }
      })
      localStorage.setItem("userCart", JSON.stringify(this.CartData));
      console.log(this.quantity);
    }
  }

  buyproducts() {
    let bill = { quantity: this.totalQuantity, amount: this.totalMoney }
    localStorage.setItem("userOrder", JSON.stringify(this.CartData))
    localStorage.setItem("userBill", JSON.stringify(bill))
    // localStorage.removeItem("userCart")
    this.route.navigate(["/order-page"])
  }
}
