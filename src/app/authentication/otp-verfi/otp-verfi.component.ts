import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp-verfi',
  templateUrl: './otp-verfi.component.html',
  styleUrls: ['./otp-verfi.component.css']
})
export class OtpVerfiComponent implements OnInit {

  tempUser:any;
  allUsers:any[]=[]
  
  constructor(private route:Router,private toastr: ToastrService) {}

  countdownTimmer=9
  ngOnInit():void{
    const timmer=setInterval(()=>{
     this.countdownTimmer=this.countdownTimmer-1
     if (this.countdownTimmer==0) {
      clearInterval(timmer)
     }
    },1000);
    const userInfo= localStorage.getItem("newuser");
    this.tempUser=JSON.parse(userInfo || "{}")
  }

  onOtpChange(para:any){
    // console.log(this.tempUser.otp);
    // console.log(Number(para));
    if(this.tempUser.otp==Number(para)){

      if (localStorage.getItem("allUsers")==null) {
        this.allUsers.push(this.tempUser)
        localStorage.setItem("allUsers", JSON.stringify(this.allUsers));
      }
      else{
        const enterdUsers= JSON.parse(localStorage.getItem("allUsers")||"[]")
        console.log(enterdUsers);
        localStorage.setItem("allUsers",JSON.stringify([this.tempUser,...enterdUsers]))
      }
      // console.log(this.allUsers);
      localStorage.removeItem("newuser")
      this.toastr.success(`E-mail Successfully Verified`, 'Successfully Verified');
      this.route.navigate(['/login-page'])
    }
  }

}
