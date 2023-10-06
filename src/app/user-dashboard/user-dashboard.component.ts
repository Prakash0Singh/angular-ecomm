import { ChangeDetectorRef, Component ,OnInit,OnDestroy} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit ,OnDestroy{
  
  currentUserDetails: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  profileImage: any;
  notFound: boolean=true;
  userOTP: any;
  previousImg: any;

  constructor( private matDialog:MatDialog ,private formBulider:FormBuilder,private changeDetector:ChangeDetectorRef,private toastr: ToastrService){}
  
  logedUser=JSON.parse(localStorage.getItem("loginedUser")||"")
  allUsers=JSON.parse(localStorage.getItem("allUsers")||"[]")
  registerationForm = this.formBulider.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    age: ['', [Validators.required, Validators.maxLength(2), Validators.pattern("^[0-9]+$")]],
    gender: ['', [Validators.required]],
    number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
    password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]],
    image:[''],
    otp:['']
  })
  ngOnInit(): void {
    this.newFunction();
  }
// for getting loged user details 
  newFunction() {
    this.currentUserDetails = this.allUsers.find((record: any) => record.otp == this.logedUser);
    // console.log(this.currentUserDetails?.image,"This is image");
    console.log(this.allUsers);
    this.userOTP = this.currentUserDetails.otp;
  }

//sending user details to form fields 
  accountEdit(editForm:any){
    this.registerationForm.patchValue({
      name:this.currentUserDetails.name,
      email: this.currentUserDetails.email,
      age: this.currentUserDetails.age,
      gender:this.currentUserDetails.gender,
      number:this.currentUserDetails.number,
      password:this.currentUserDetails.password,
      confirm_password: this.currentUserDetails.confirm_password,
    })
    this.previousImg=this.currentUserDetails.image

    this.matDialog.open(editForm); 
}

// for converting image into base64 code
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

  UpdateDetails() {
    
    // change here - removing old from array list
    const index=this.allUsers.indexOf(this.currentUserDetails)
    if (index>-1) {
      this.allUsers.splice(index,1);
      console.log(this.allUsers,"Data After Splice");
    }
// change here - removing old from array list

// for setting Previous image if user not change image

if (this.registerationForm.value.image=='') {
  this.registerationForm.value.image=this.previousImg
  console.log(this.registerationForm.value.image,"Setting Previous Image Here");
}

else{
      if(this.registerationForm.value.image == undefined){
        this.registerationForm.value.image=this.previousImg
      }
      else{
        this.registerationForm.value.image=this.profileImage
      }
    }
this.registerationForm.value.otp = this.userOTP
    
    // for user email already exists or not
    if (this.allUsers.length>0 ) {
      
      this.allUsers.filter((data: any) => 
      {
        if(data.email == this.registerationForm.value.email)
        { this.notFound=false
          console.log(data.email,"This is the data")
        console.log("Hiiiiiiii")
      }
    })
    }
   

    if (this.allUsers.length>=0 && this.notFound==true) 
    {
      this.allUsers.push(this.registerationForm.value)
      localStorage.setItem("allUsers", JSON.stringify(this.allUsers));
      this.registerationForm.reset();
      this.toastr.success('Details Updated','Updated');
      console.log("User Waiting for");
      this.newFunction();
      this.matDialog.closeAll(); 
    }
    else {
      this.allUsers.filter((data: any) => {
        if(data.email == this.registerationForm.value.email) {
          console.log(data.email,"User Email Already Registered");
          this.toastr.warning('E-mail Already Registered', 'Already Registered');
        }
      })
      this.notFound=true
    }
    
  }
  
  ngOnDestroy(): void {
    this.matDialog.closeAll(); 

  }
}
