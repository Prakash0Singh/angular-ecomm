import { AfterContentInit, AfterViewChecked, Component,DoCheck,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FakeapiService } from './services/fakeapi.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,DoCheck{

  
  constructor(public router:Router, public _fakeProduct:FakeapiService){}
  ngDoCheck(): void {
    this._fakeProduct.count();
  }
  // ngAfterContentInit(): void {
  //   this._fakeProduct.count();
  // }
  // ngAfterViewChecked(): void {
  //   this._fakeProduct.count();
  // }

  ngOnInit(){
    this._fakeProduct.value = JSON.parse(localStorage.getItem("toggleButton") || "false")
  }
  
  homepage(){
    if (this._fakeProduct.value) {
    this.router.navigate(['/products-page'])
    }
    else{
    this.router.navigate([''])
    }
  }
  registerUser(){
    this.router.navigate(['/registeration-page'])
  }
  loginUser(){
    this.router.navigate(['/login-page'])
  }
  userLogout(){
    this._fakeProduct.cartItem=0;
    this._fakeProduct.value = false
    localStorage.removeItem("loginedUser");
    localStorage.removeItem("toggleButton")
    this.router.navigate([''])
  }
  cartpage(){
    this.router.navigate(['/cart-page'])
  }
}
