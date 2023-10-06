import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './authentication/register-user/register-user.component';
import { LoginComponent } from './authentication/login/login.component';
import { OtpVerfiComponent } from './authentication/otp-verfi/otp-verfi.component';
import { ForgetPageComponent } from './authentication/forget-page/forget-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { AuthguardGuard } from './authguard/authguard.guard';
import { VerificationGuard } from './authguard/verification.guard';

const routes: Routes = [
  {path:"products-page",component:ProductsPageComponent,canActivate:[AuthguardGuard]},
  {path:"",component:HomepageComponent},

  {path:"registeration-page",component:RegisterUserComponent},
  {path:"login-page",component:LoginComponent},
  {path:"verification-user",component:OtpVerfiComponent,canActivate:[VerificationGuard]},
  {path:"forget-password",component:ForgetPageComponent},
  {path:"itemDetail",component:ProductDetailPageComponent,canActivate:[AuthguardGuard]},
  {path:"user-pannel",component:UserDashboardComponent,canActivate:[AuthguardGuard]},
  {path:"cart-page",component:CartPageComponent,canActivate:[AuthguardGuard]},
  {path:"order-page",component:OrderPageComponent,canActivate:[AuthguardGuard]},
  {path:"**",component:PagenotfoundComponent,canActivate:[AuthguardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
