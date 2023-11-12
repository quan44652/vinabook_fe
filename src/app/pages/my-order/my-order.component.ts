import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {
  trashCan = faTrashCan
  isFalse = false

  user: any = null

  orderList: any = null


  totalQuantity:number = 0
  totalPrice:number = 0

  status:any = {
    0 : "Đã hủy",
    1 : "Đang chờ duyệt",
    2 : "Đang vận chuyển",
    3 : "Đã nhận",
  }

  constructor( private orderService: OrderService , private navigate: Router, private toastr: ToastrService,) {

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user") as string)?.data

    this.orderService.getOne(this.user._id).subscribe(({ data }) => {
      this.orderList = data
      console.log(data);
      
    })

    if (!this.user) {
      this.navigate.navigate(['/'])
      return
    }
  }










}
