import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { LayoutAdminComponent } from './components/layout-admin/layout-admin.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductComponent } from './pages/admin/admin-product/admin-product.component';
import { AdminCategoryComponent } from './pages/admin/admin-category/admin-category.component';
import { AdminUserComponent } from './pages/admin/admin-user/admin-user.component';
import { AdminOrderComponent } from './pages/admin/admin-order/admin-order.component';
import { MyOrderComponent } from './pages/my-order/my-order.component';

const routes: Routes = [
    {
        path: "", component: HomeComponent
    },
    {
        path: "category/:id", component: ProductsComponent
    },
    {
        path: "myOrder", component: MyOrderComponent
    },
    {
        path: "admin", component: LayoutAdminComponent, children: [
            {
                path: "", component: AdminDashboardComponent, pathMatch: "full"
            },
            {
                path: "product", component: AdminProductComponent
            },
            {
                path: "category", component: AdminCategoryComponent
            },
            {
                path: "user", component: AdminUserComponent
            },
            {
                path: "order", component: AdminOrderComponent
            },
        ]
    },
    {
        path: "product/:id", component: DetailComponent
    },
    {
        path: "cart", component: CartComponent
    },
    {
        path: "**", component: NotFoundComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }