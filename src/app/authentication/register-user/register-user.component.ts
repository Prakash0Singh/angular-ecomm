import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  registerationForm: FormGroup;
  allregisteruser: any;
  notFound:boolean =true
  base64String :any;
file: any;
  profileImage: any;
  constructor(private formBulider: FormBuilder, private router: Router,private toastr: ToastrService,private changeDetector:ChangeDetectorRef) {
    this.registerationForm = this.formBulider.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      age: ['', [Validators.required, Validators.maxLength(2), Validators.pattern("^[0-9]+$")]],
      gender: ['', [Validators.required]],
      number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      image:['',[Validators.required]]
    })
  }
  ngOnInit(): void {
    this.allregisteruser = JSON.parse(localStorage.getItem("allUsers") || "[]")
  }

  CreateNewUser() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(this.registerationForm.value["otp"] = otp);
    this.registerationForm.value.image=this.profileImage
    // console.log(this.registerationForm.value.image);
  
    if (this.allregisteruser.length) {
      
      this.allregisteruser.filter((data: any) => 
      {
        if(data.email == this.registerationForm.value.email)
         { this.notFound=false
          console.log(data.email,"This is the data")
        console.log("Hiiiiiiii")
        }
      })
    }

    if (this.allregisteruser.length>=0 && this.notFound==true) 
    {
      localStorage.setItem("newuser", JSON.stringify(this.registerationForm.value));
      localStorage.setItem("verify","true");

      this.registerationForm.reset();
      this.toastr.success('Verify User Details','E-mail Verfication');
      this.router.navigate(['/verification-user']);
      console.log("User Waiting for");
    }
    else {
      this.allregisteruser.filter((data: any) => {
        console.log(data,"This is the data")
        console.log(this.registerationForm.value.email,"This is the email")
        if(data.email == this.registerationForm.value.email) {
          console.log("User Email Already Registered");
          this.toastr.warning('E-mail Already Registered', 'Already Registered');
        }
      })
      this.notFound=true
    }
  }

// for Convert Image into base64

 
  preview(event:any) {
    var file = event.target.files.length;
    for(let i=0;i<file;i++)
    {
       var reader = new FileReader();
       reader.onload = (event:any) => 
       {
           this.profileImage = event.target.result;
           this.changeDetector.detectChanges();
       }
       reader.readAsDataURL(event.target.files[i]);
    }
  }
}
