import { Component ,ElementRef,OnInit,ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-page',
  templateUrl: './forget-page.component.html',
  styleUrls: ['./forget-page.component.css']
})
export class ForgetPageComponent implements OnInit {

  forgetPasswordForm:any
  createNewPasswordForm:any
  checkemail: any;
  showButton:boolean=true
  allregisteruser: any;
  userFound:boolean=false
  showUpdatePasswordForm:boolean=false
  userIndex: any;
  constructor(private formbuilder:FormBuilder,private router:Router,private toastr: ToastrService)
  {
    this.forgetPasswordForm=this.formbuilder.group({
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    })
    this.createNewPasswordForm=this.formbuilder.group({
      password:['',[Validators.required]],
      confirm_password:['',[Validators.required]]
    })
  }
  ngOnInit():void{
   this.allregisteruser=JSON.parse(localStorage.getItem("allUsers")||"[]")
  }
  checkAccount(){
   console.log("Checking Account");
   this.checkemail=this.forgetPasswordForm.value.email;

   this.allregisteruser.filter((data:any)=>{
    if (data.email==this.checkemail) {
      console.log("User-Found");
      this.userIndex=this.allregisteruser.indexOf(data)
      this.forgetPasswordForm.get('email').disable({emitEvent: true});
      this.showButton=false
      this.showUpdatePasswordForm=true
    }
  })

  }
  updatePassword(){
    const pass=this.createNewPasswordForm.value.password;
    const conPass=this.createNewPasswordForm.value.confirm_password;
  
    this.allregisteruser[this.userIndex].password=pass;
    this.allregisteruser[this.userIndex].confirm_password=conPass
    console.log(this.allregisteruser[this.userIndex].password);
    console.log(this.allregisteruser[this.userIndex].confirm_password);

    localStorage.setItem("allUsers",JSON.stringify(this.allregisteruser))
    this.toastr.success('User Password Updated','Update Password');
    this.router.navigate(['/login-page']);

  }
}
