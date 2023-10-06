import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterUserComponent } from './authentication/register-user/register-user.component';
import { OtpVerfiComponent } from './authentication/otp-verfi/otp-verfi.component';
import { ForgetPageComponent } from './authentication/forget-page/forget-page.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import { ToastrModule } from 'ngx-toastr';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';



import {AuthServiceService } from './services/auth-service.service';

import { NgOtpInputModule } from  'ng-otp-input';
import { HomepageComponent } from './homepage/homepage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CartPageComponent } from './cart-page/cart-page.component';
import { OrderPageComponent } from './order-page/order-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterUserComponent,
    OtpVerfiComponent,
    ForgetPageComponent,
    HomepageComponent,
    PagenotfoundComponent,
    ProductsPageComponent,
    ProductDetailPageComponent,
    UserDashboardComponent,
    CartPageComponent,
    OrderPageComponent,
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,HttpClientModule,
    AppRoutingModule,
    NgOtpInputModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(
      {
        timeOut: 1000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        progressBar:true
      }
    ), // ToastrModule added
    NoopAnimationsModule,MatButtonToggleModule,MatMenuModule,MatDialogModule,MatStepperModule,MatTableModule,
    MatCardModule,MatFormFieldModule,MatInputModule,MatRadioModule,MatButtonModule,MatToolbarModule,MatIconModule,MatTooltipModule, NgbModule,
  ],
  providers: [AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
