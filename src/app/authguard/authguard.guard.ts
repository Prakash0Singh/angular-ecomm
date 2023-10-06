import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate{

  constructor(private _authGuardService:AuthServiceService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this._authGuardService.isUserLoged()) {  
        this.router.navigateByUrl("");  
    }  
    return this._authGuardService.isUserLoged(); 
  }

}
