import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SiderBarComponent } from './components/sider-bar/sider-bar.component';
import { ProductsComponent } from './pages/products/products.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AppRoutingModule } from './router.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopPageComponent } from './components/top-page/top-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterSocialComponent } from './components/footer-social/footer-social.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminCategoryComponent } from './pages/admin/admin-category/admin-category.component';
import { AdminOrderComponent } from './pages/admin/admin-order/admin-order.component';
import { AdminProductComponent } from './pages/admin/admin-product/admin-product.component';
import { AdminUserComponent } from './pages/admin/admin-user/admin-user.component';
import { LayoutAdminComponent } from './components/layout-admin/layout-admin.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MyOrderComponent } from './pages/my-order/my-order.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SiderBarComponent,
    ProductsComponent,
    HomeComponent,
    DetailComponent,
    NotFoundComponent,
    TopPageComponent,
    NavbarComponent,
    FooterSocialComponent,
    CartComponent,
    AdminCategoryComponent,
    AdminOrderComponent,
    AdminProductComponent,
    AdminUserComponent,
    LayoutAdminComponent,
    AdminDashboardComponent,
    MyOrderComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FontAwesomeModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
