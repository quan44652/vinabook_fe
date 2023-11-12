import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  closeIcon = faXmark

  product: any = null
  user: any = null
  isShowModal: boolean = false
  cartItem: any = null
  quantity: number = 1

  constructor(private productSerive: ProductService, private feedbackService: FeedbackService, private navigate: Router ,  private cartService: CartService, private orderService: OrderService, private toastr: ToastrService, private router: ActivatedRoute,  private formBuilder: FormBuilder) {

  }



  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user") as string)?.data
    this.router.params.subscribe(({ id }) => {
      if (id) {
        this.productSerive.getOne(id).subscribe(({ data }) => {
          this.product = data
        })
      }

    })

  }

  handleClose() {
    this.isShowModal = false
  }

  handleShowModal() {
    this.user = JSON.parse(localStorage.getItem("user") as string)?.data
    if (!this.user) {
      this.toastr.info("Bạn cần đăng nhập để thực hiện hàng động này", "Nhắc nhở")
    }
    else {
      this.isShowModal = true
    }
  }

  handleAddToCart() {
    this.user = JSON.parse(localStorage.getItem("user") as string)?.data
    if (!this.user) {
      this.toastr.info("Bạn cần đăng nhập để thực hiện hàng động này", "Nhắc nhở")
    }
    else {
      const cartItem = {
        userId: this.user._id, 
        bookId: this.product._id, 
        quantity: 1, 
        total: this.product.price / 100 * (100 - this.product.discount)
      }

      this.cartService.create(cartItem).subscribe((resp) => {
        this.toastr.success(resp.message,"Chúc mừng")
        this.navigate.navigate(['/cart'])
      })
      
    }
  }

  handleThem = () => {
    this.quantity = this.quantity + 1
  }

  handleBot = () => {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1
    }

  }

  handleOrder = () => {
    const newOrder = {
      userId: this.user._id,
      phone: this.user.phone,
      address: this.user.address,
      name: this.user.name,
      bookId: this.product._id,
      quantity: this.quantity,
      total: this.quantity * this.product.price / 100 * (100 - this.product.discount)
    }

    this.orderService.create(newOrder).subscribe((resp) => {
      this.toastr.success(resp.message)
      this.isShowModal = false
    })
  }

  formValueFeedback = this.formBuilder.group({
    content: [""],
  })


  handleSearch() {
    this.user = JSON.parse(localStorage.getItem("user") as string)?.data
    if (!this.user) {
      this.toastr.info("Bạn cần đăng nhập để thực hiện hàng động này", "Nhắc nhở")
      return
    }
    if(this.formValueFeedback.value.content == "") {
      this.toastr.info("Bạn cần nhập nội dung phản hồi","Cảnh báo")
      return
    }
  const newValue = {
      content: this.formValueFeedback.value.content,
      bookId: this.product._id,
      userId: this.user._id
    } 

    this.feedbackService.create(newValue).subscribe((resp) => {
      this.toastr.success(resp.message,"Chúc mừng")
      this.formValueFeedback.reset();
      this.router.params.subscribe(({ id }) => {
        if (id) {
          this.productSerive.getOne(id).subscribe(({ data }) => {
            this.product = data
          })
        }
  
      })
    })
    
  }
}
