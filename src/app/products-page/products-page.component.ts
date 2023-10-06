import { AfterViewInit, Component ,DoCheck,OnInit } from '@angular/core';
import { FakeapiService } from '../services/fakeapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit,DoCheck {

  productsData:any;
  userId: any;
  quantity: any;
  currentUserCart: any;
  showButton:boolean=true
  allCartItems: any;
  cartItemNumber: any;
  productDetail: any=[];
  allProducts:any;
  totalMoney: number=0;
  totalQuantity: number=0;
  updateDataAt:number[]=[]
  userCart: any[] = [];
  constructor( private _fakeProduct:FakeapiService ,private route:Router,private activeRoute: ActivatedRoute,private toastr: ToastrService,){
    this.userId=JSON.parse(localStorage.getItem("loginedUser") || "0")
    this.allCartItems = JSON.parse(localStorage.getItem("userCart") || "[]")
  }
  ngOnInit(): void {   
  console.log(this._fakeProduct.value,"pp");
  this._fakeProduct.fakeProductsList().subscribe(data=>{
    this.productDetail=data
    this.productDetail = this.productDetail.map((v:any) => Object.assign(v, {user: this.userId},{isAdd:true},{isRemove:false},{quantity:0}))
  })
  // cart quantiy logic
  this.allCartItems.filter((data:any)=>{
    if (data.user==this.userId) {
      this.cartItemNumber++
    }
  })
  console.log(this.cartItemNumber);
  this.allCartItems.forEach((data:any) => {
    data["quantity"]=1;
      data["price"]=Math.round(data.price)
    });
  // TO show Product Details 
  // const productId = Number(this.activeRoute.snapshot.queryParamMap.get('id'))
  // this._fakeProduct.fakeItemDetails(productId).subscribe(data => {
  //   this.productDetail = data
  //   // To toggle showbutton on loading of data 
  //   this.showButton = !(this.allCartItems.some((e:any) => e.id == this.productDetail?.id && e.user==this.userId))})
  //   console.log(this.showButton);
  //   this._fakeProduct.cartItem=this.cartItemNumber

// for increase quantity
  // this.cartVal();
  }



  Details(productId:number){
    console.log(productId);
    this.route.navigate(['/itemDetail'],{queryParams:{id:productId}})
  }

  // add to Cart button logic
  cartAdd(product: any) {
    console.log("Item Added on Cart", product);
      product["quantity"]=1
      product["price"]=Math.round(product.price)
      product["totalAmount"]=product.price 
      
    let items = JSON.parse(localStorage.getItem("userCart") || "[]")
// return false - data will be not founded in record
    const addNewData = !(items.some((e: any) => e.id == product.id && e.user==this.userId))

    if (addNewData){
      localStorage.setItem("userCart",JSON.stringify([...items,product]))
      product["isAdd"]=!addNewData
      this._fakeProduct.cartItem=this.cartItemNumber+1;
    }
    else{
    product["isAdd"]=addNewData
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

  // Docheck code for check data already in Cart or not
  ngDoCheck(): void {

    const items = JSON.parse(localStorage.getItem("userCart") || "[]")
    items.filter((cart:any)=>{
      this.productDetail.filter((all:any)=>{
        if (cart.id== all.id) {
          all.isAdd=false;
          all.isRemove=true;
          all.quantity=cart.quantity
        }
      })
    })
  
  }

  cartVal() {
    const newList=JSON.parse(localStorage.getItem("userCart") || "[]")
    newList.filter((data: any,index:number) => {
      if (data.user == this.userId) {
        this.userCart.push(data)
      }
    })
    // this.userCart.forEach((data: any) => {
    //   this.totalQuantity += data.quantity
    //   this.totalMoney += data.totalAmount
    // });
    // console.log(this.userCart);
    this.quantity = this.userCart
    // this.quantity = this.allCartItems

  }
  // for quantity Increase
  
  increase(data: any) {
    this.userCart=[];
    const newList=JSON.parse(localStorage.getItem("userCart") || "[]")
    newList.filter((data: any,index:number) => {
      if (data.user == this.userId) {
        this.userCart.push(data)
        this.updateDataAt.push(index)
      }
    })
    this.quantity = this.userCart;
    console.log(this.quantity,"This is it");
    if (data.quantity >= 10) {
      this.toastr.warning('Item Out of Stock', 'Stock');
    }

    else {
      // this.totalMoney = 0
      // this.totalQuantity = 0
      data["quantity"] = ++data.quantity
      // console.log(data.quantity);
      // console.log(data.price);
      data["totalAmount"] = data.price * data.quantity
      // this.quantity.forEach((data: any) => {
      //   this.totalMoney += data.totalAmount
      //   this.totalQuantity += data.quantity
      // });
      newList.filter((e:any,index:number)=>{
        if (e.id==data.id && e.user==this.userId) {
          newList[index]=data
        }
      })
      
      localStorage.setItem("userCart", JSON.stringify(newList));
    }
  }
  
// for quantity decrease

  decrease(data: any) {
    this.userCart=[];
    const newList=JSON.parse(localStorage.getItem("userCart") || "[]")
    newList.filter((data: any,index:number) => {
      if (data.user == this.userId) {
        this.userCart.push(data)
        this.updateDataAt.push(index)
      }
    })
    this.quantity = this.userCart;
    if (data.quantity < 2) {
      console.log("Remove Item");
     
      // for remove matching data from all userList Cart
      newList.filter((e:any,index:number)=>{
        if (e.id==data.id && e.user==this.userId) {
          newList.splice(index,1)
        }
      })
      data["isAdd"]=true
      data["quantity"]=0
      // for remove matching data from current userList cart
      this.quantity.filter((e:any,index:number)=>{
        if (e.id==data.id) {
          this.quantity.splice(index,1)
        }
      })   

      localStorage.setItem("userCart", JSON.stringify(newList))
      this._fakeProduct.cartItem = this.quantity.length;
      console.log(newList);
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
      this.allCartItems.filter((e:any,index:number)=>{
        if (e.id==data.id && e.user==this.userId) {
          this.allCartItems[index]=data
        }
      })
      localStorage.setItem("userCart", JSON.stringify(this.allCartItems));
      console.log(this.quantity);
    }
  }
}
