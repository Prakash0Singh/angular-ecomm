import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FakeapiService } from 'src/app/services/fakeapi.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userDetailsMatch:boolean=false
  loginDetails: any;

  constructor(private formBuilder:FormBuilder,private router:Router,private toastr: ToastrService, private _fakeProduct:FakeapiService){
    
  }

  userLoginForm=this.formBuilder.group({
    useremail:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    userpassword:['',[Validators.required]]
  })


  loginUser(){
    const allUsers=JSON.parse(localStorage.getItem("allUsers")||"[]")
    console.log(allUsers);

    this.loginDetails=this.userLoginForm.value
    let otp=0
    const email=this.userLoginForm.value.useremail
    const password=this.userLoginForm.value.userpassword

    console.log(email);
    console.log(password);

    if (allUsers.length>0) {
      allUsers.filter((record:any)=>{
          if (record.email==email && record.password== password) {
            this.userDetailsMatch=true
            otp=record.otp
          }
      })
    }

    // allUsers.filter((record:any)=>{
    //   if (record.email==email && record.password== password) {
    //     console.log(record);
    //     this.toastr.success(`Redirecting Home Page`, 'Login Successfully');
    //     this.router.navigate([''])
    //   }
    //   else{
    //     this.userLoginForm.reset();
    //     this.toastr.error(`E-Mail and Password Doesn't Match`, 'User Details');
    //   }
    // })
    if (this.userDetailsMatch==true) {
      this.toastr.success(`Welcome`, 'Login Successfully');
      localStorage.setItem("loginedUser",JSON.stringify(otp))
      localStorage.setItem("toggleButton", "true")
      localStorage.setItem("verify","false");
      this._fakeProduct.value = true
      this._fakeProduct.count();
      this.router.navigate(['/products-page'])
    }
    else
    {
        this.userLoginForm.reset();
        this.toastr.error(`E-Mail and Password Doesn't Match`, 'User Details');
    }
  }


}
