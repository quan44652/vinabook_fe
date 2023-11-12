import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  trashCan = faTrashCan
  isFalse = false

  user: any = null

  cartList: any = null
  productList: any = null

  totalQuantity:number = 0
  totalPrice:number = 0

  constructor(private cartService: CartService, private orderService: OrderService , private productService: ProductService, private navigate: Router, private toastr: ToastrService,) {

  }

  handleReset () {
    this.totalQuantity = 0
    this.totalPrice = 0
    for (let index = 0; index < this.cartList.cartItems.length; index++) {
      this.totalQuantity += this.cartList.cartItems[index].quantity
      this.totalPrice += this.cartList.cartItems[index].total
    }
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user") as string)?.data

    this.productService.get().subscribe(({ data }) => {
      this.productList = data
    })
console.log("123",this.user);

    if (!this.user) {
      this.navigate.navigate(['/'])
      return
    }

    this.cartService.getOne(this.user._id).subscribe(({ data }) => {
      this.cartList = data
      this.handleReset()
    })
  }

  handleThem(bookId: string, quantity: number, price: number) {
    const newItem = {
      userId: this.user._id,
      bookId,
      quantity: quantity + 1,
      total: (quantity + 1) * price
    }

    this.cartService.create(newItem).subscribe(() => {
      this.cartService.getOne(this.user._id).subscribe(({ data }) => {
        this.cartList = data
        this.handleReset()
      })
    })

  }

  handleBot(bookId: string, quantity: number, price: number) {
    const newItem = {
      userId: this.user._id,
      bookId,
      quantity: quantity - 1,
      total: (quantity - 1) * price
    }

    this.cartService.create(newItem).subscribe((resp) => {
      this.cartService.getOne(this.user._id).subscribe(({ data }) => {
        this.cartList = data
        this.handleReset()
      })
    })

  }

  handleRemove (id:string) {
    this.cartService.delete(id).subscribe((resp) => {
      this.toastr.success(resp.message,"Chúc mừng")
      this.cartService.getOne(this.user._id).subscribe(({ data }) => {
        this.cartList = data
        this.handleReset()
      })
    })
  }

  handleOrder = () => {
    const newOrder = {
      userId: this.user._id,
      phone: this.user.phone,
      address: this.user.address,
      name: this.user.name,
    }

    this.orderService.create(newOrder).subscribe((resp) => {
      this.toastr.success(resp.message)
      this.navigate.navigate(['/'])
    })
  }






}
