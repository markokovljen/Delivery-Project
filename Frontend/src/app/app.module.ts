import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes,RouterModule} from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './user/user-login/user-login/user-login.component';
import { AuthenticationService } from './services/authentication.service';
import { AlertifyService } from './services/alertify.service';
import { HttpClientModule } from '@angular/common/http';
import { UserRegisterComponent } from './user/user-register/user-register/user-register.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ModifyProfileComponent } from './user/modify-profile/modify-profile/modify-profile.component';
import { RequestListComponent } from './request/request-list/request-list/request-list.component';
import { RequestCardComponent } from './request/request-card/request-card/request-card.component';
import { ProductService } from './services/product.service';
import { ProductListComponent } from './product/product-list/product-list/product-list.component';
import { ProductCardComponent } from './product/product-card/product-card/product-card.component';
import { DashboardUserComponent } from './dashboard/dashboard-user/dashboard-user/dashboard-user.component';
import { OrderService } from './services/order.service';
import { DashboardDelivererComponent } from './dashboard/dashboard-deliverer/dashboard-deliverer/dashboard-deliverer.component';
import { CurrentOrderDelivererComponent } from './current-order/current-order-deliverer/current-order-deliverer/current-order-deliverer.component';
import { CurrentOrderAdminComponent } from './current-order/current-order-admin/current-order-admin/current-order-admin.component';
import { MapComponent } from './map/map/map.component';
import { environment } from 'src/environments/environment';
import { NgxsModule } from '@ngxs/store';
import { RequestState } from './store/requests/request-state';
import { ProductState } from './store/products/product-state';
import { OrderState } from './store/orders/order-state';
import { CurrentOrderUserComponent } from './current-order/current-order-user/current-order-user/current-order-user.component';
import { AuthGuard } from './auth/auth.guard';


const appRoutes: Routes=[
  {path:'dashboard',component:DashboardComponent,canActivate: [AuthGuard] ,
  data: {
    role1:"administrator"
  }},
  {path:'dashboard/user',component:DashboardUserComponent,canActivate: [AuthGuard] ,
  data: {
    role1:"user"
  }},
  {path:'dashboard/deliverer',component:DashboardDelivererComponent,canActivate: [AuthGuard] ,
  data: {
    role1:"deliverer"
  }},
  {path:'dashboard/deliverer/currentorders',component:CurrentOrderDelivererComponent,canActivate: [AuthGuard] ,
  data: {
    role1:"deliverer"
  }},
  {path:'dashboard/admin/currentorders',component:CurrentOrderAdminComponent,canActivate: [AuthGuard] ,
  data: {
    role1:"administrator"
  }},
  {path:'dashboard/user/currentorders',component:CurrentOrderUserComponent,canActivate: [AuthGuard] ,
  data: {
    role1:"user"
  }},
  {path:'user/login',component:UserLoginComponent},
  {path:'user/register',component:UserRegisterComponent},
  {path:'modify-profile/:email',component:ModifyProfileComponent,canActivate: [AuthGuard] ,
  data: {
    role1:"deliverer",
    role2:"administrator",
    role3:"user"
  }},
  {path:'user/request-list',component:RequestListComponent,canActivate: [AuthGuard] ,
  data: {
    role1:"administrator"
  }},
  {path: '**',component:UserLoginComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UserLoginComponent,
    UserRegisterComponent,
    DashboardComponent,
    ModifyProfileComponent,
    RequestListComponent,
    RequestCardComponent,
    ProductListComponent,
    ProductCardComponent,
    DashboardUserComponent,
    DashboardDelivererComponent,
    CurrentOrderDelivererComponent,
    CurrentOrderAdminComponent,
    CurrentOrderUserComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([RequestState,ProductState,OrderState],{
      developmentMode: true
    }
      ),
  ],
  providers: [
    AuthenticationService,
    AlertifyService,
    ProductService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
