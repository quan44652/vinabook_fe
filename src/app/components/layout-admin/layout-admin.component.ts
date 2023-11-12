import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.css']
})
export class LayoutAdminComponent {
isShowSetting = false
isClassSelected = "bg-gray-900 text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium"
isClass = "text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium"
classIndex:number = 0
user:any = null

constructor(  private navigate: Router, private toastr: ToastrService,) {

}

ngOnInit() {
  this.user = JSON.parse(localStorage.getItem("user") as string)?.data

  console.log(this.user);
  
  if (this.user?.role != "admin"    ) {
    this.navigate.navigate(['/'])
    return
  }
}



menu = [
  {
    id: 0,
    name: "Dashboard",
    link: "/admin"
  },
  {
    id: 1,
    name: "Product",
    link: "/admin/product"
  },
  {
    id: 2,
    name: "Category",
    link: "/admin/category"
  },

  {
    id: 3,
    name: "User",
    link: "/admin/user"
  },

  {
    id: 4,
    name: "Order",
    link: "/admin/order"
  },


]

handleClick = (index:number) => {
this.classIndex = index
}


handleIsshowSetting = () => {
  this.isShowSetting = !this.isShowSetting
}



}
