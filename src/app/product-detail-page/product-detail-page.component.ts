import { Component, OnInit } from '@angular/core';
import { FakeapiService } from '../services/fakeapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailPageComponent implements OnInit {
  productDetail: any;
  count: any
  allCartItems: any[] = []
  cartUser: any;
  showButton: boolean = true
  userId: any;
  cartItemNumber:number=0
  constructor(public _fakeProduct: FakeapiService, private activeRoute: ActivatedRoute) {
    this.userId=JSON.parse(localStorage.getItem("loginedUser") || "0")
    this.allCartItems = JSON.parse(localStorage.getItem("userCart") || "[]")
   }

  ngOnInit() {
    console.log(this.userId)
    this.allCartItems.filter((data)=>{
      if (data.user==this.userId) {
        this.cartItemNumber++
      }
    })
    console.log(this.cartItemNumber);
    this.allCartItems.forEach((data:any) => {
      data["quantity"]=1;
        data["price"]=Math.round(data.price)
      });
    console.log(this.allCartItems.length, "Items in Caft Items");
    // TO show Product Details 
    const productId = Number(this.activeRoute.snapshot.queryParamMap.get('id'))
    this._fakeProduct.fakeItemDetails(productId).subscribe(data => {
      this.productDetail = data
      // To toggle showbutton on loading of data 
      this.showButton = !(this.allCartItems.some((e) => e.id == this.productDetail?.id && e.user==this.userId))})
      
      this._fakeProduct.cartItem=this.cartItemNumber
    }


  cartAdd(product: any) {
    console.log("Item Added on Cart", product);
      product["quantity"]=1
      product["price"]=Math.round(product.price)
      product["totalAmount"]=product.price
      product["user"]=this.userId
 
    let items = JSON.parse(localStorage.getItem("userCart") || "[]")
// return false - data will be not founded in record
    const addNewData = !(items.some((e: any) => e.id == product.id && e.user==this.userId))

    if (addNewData){
      localStorage.setItem("userCart",JSON.stringify([...items,product]))
      this.showButton=false;
      this._fakeProduct.cartItem=this.cartItemNumber+1;
    }
  }

  cartRemove(product: any) {
    console.log("Item Removed on Cart", product);
    const items = JSON.parse(localStorage.getItem("userCart") || "[]")
    let removeItem:number=-1
    const removeData = items.some((e: any) => e.id == product.id)
    if (removeData) {
      const remaingData=items.find((e:any,index:number) =>{
            if(e.id == product.id && e.id==this.userId)
            {
            console.log(index,"Item Index in Cart List");
            removeItem=index;
            }
          } )
      items.splice(removeItem,1)    
      console.log(items,"Cart Arrya After Removing Items");
      localStorage.setItem("userCart",JSON.stringify(items))
      this.showButton=true;
//setting number on cart Badge
       this._fakeProduct.cartItem = this.cartItemNumber-1
    }
  }
}

//! Add to cart code--
  // let cartlength:any;
    // if(this.allCartItems.length){
    //  localStorage.setItem("userCart",JSON.stringify([...this.allCartItems,product]))
    // }
    // else{
    //    localStorage.setItem("userCart",JSON.stringify([product]))
    // }
    // this.showButton=false
    // cartlength=JSON.parse(localStorage.getItem("userCart")||"[]")
    // this._fakeProduct.cartItem=cartlength.length

//! Remove to Cart Code ---
   //   this.cartUser=JSON.parse(localStorage.getItem("userCart")||"[]")
    //   console.log(this.cartUser);
    //   // this.cartUser.indexOf(product)
    //   const remaingData=this.allCart.find((e,index) =>{
    //     if(e.id == product.id)
    //     {
    //     console.log(index);
    //     this.cartUser.splice(index,1);
    //     }
    //   } )
    //   console.log(this.cartUser);
    //  this._fakeProduct.cartItem = this.cartUser.length
    //  localStorage.removeItem("userCart")
    //  localStorage.setItem("userCart",JSON.stringify(this.cartUser))
    //   // console.log(this.cartUser);
    //   // console.log(this.cartUser.indexOf(this.allCart.find(e => e.id == this.productDetail?.id)))

    //   this.showButton=true;