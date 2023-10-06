import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit{
  currentUserDetails: any;
  showDetailsForm: boolean=true;
  userOrdersData: any;
  displayedColumns: string[]=[]
  dataSource: any;
  userAddress:any;
  userOrdersDetials:any[]=[]
  userId: any;
  currentUserAddress: any;
  constructor(private _formBuilder: FormBuilder) {}

  allUsers=JSON.parse(localStorage.getItem("allUsers")||"[]")
  logedUser=JSON.parse(localStorage.getItem("loginedUser")||"")

  ngOnInit(): void {
    this.userId=0;
    this.userOrdersData=[];
    this.userOrdersDetials=[];
    this.currentUserAddress={};
    this.currentUserDetails={};
    this.displayedColumns=[];
    this.dataSource=[];
    this.userId=JSON.parse(localStorage.getItem("loginedUser")||"0")
    this.userOrdersData= JSON.parse(localStorage.getItem("userOrder")||"[]")

    this.userOrdersData.filter((data:any)=>{
      if (data.user==this.userId) {
        this.userOrdersDetials.push(data)
      }
    })

     this.userAddress=JSON.parse(localStorage.getItem("orderAddress")||"[]")
     this.userAddress.filter((data:any)=>{
      if (data.user==this.userId) {
        this.showDetailsForm=false
        this.currentUserAddress=data
        console.log(this.currentUserAddress);
      }
     })
    this.currentUserDetails = this.allUsers.find((record: any) => record.otp == this.logedUser);
    this.firstFormGroup.patchValue({
      userName:this.currentUserDetails.name,
      userEmail:this.currentUserDetails.email
    })
    this.displayedColumns = ['image','title', 'quantity', 'totalAmount'];
    this.dataSource = new MatTableDataSource(this.userOrdersDetials);


  }

//details form logic here 
  firstFormGroup = this._formBuilder.group({
    userName: ['', Validators.required],
    userEmail: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    city:['',Validators.required],
    state:['',Validators.required],
    pincode:['',Validators.required],
    address:['',Validators.required],
    user:[''],
    showForm:['']
  });
  orderDetail(){
    this.secondFormGroup.value["user"]=this.userId
    this.secondFormGroup.value["showForm"]="false"
    let otherAddress=JSON.parse(localStorage.getItem("orderAddress")||"[]");
    if (otherAddress.length) {
      localStorage.setItem("orderAddress",JSON.stringify([...otherAddress,this.secondFormGroup.value]))
    }
    else{
      localStorage.setItem("orderAddress",JSON.stringify([this.secondFormGroup.value]))
    }
    console.log(this.secondFormGroup.value);
    this.showDetailsForm=false
    this.ngOnInit()
  }
  orderAddress(){
   console.log(this.firstFormGroup.value);
  }
// table Coding & logic
}
