import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  isUserLoged(){
    return JSON.parse(localStorage.getItem("toggleButton")||"false")
  }
  userVerfy(){
    return JSON.parse(localStorage.getItem("verify")||"false")
  }
}
