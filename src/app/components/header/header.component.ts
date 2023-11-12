import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faCartShopping, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartIcon = faCartShopping
  searchIcon = faMagnifyingGlass
  closeIcon = faXmark

  isShowModal = 0
  isMatch: boolean = false

  isUser: any = null;

  productList: any = null


  constructor(private userService: UserService, private productService: ProductService, private toastr: ToastrService, private formBuilder: FormBuilder) {
    this.isUser = JSON.parse(localStorage.getItem("user") as string) || null
  }

  formValueSearch = this.formBuilder.group({
    search: [""],
  })



  formSigninValue = this.formBuilder.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
  })

  formSignupValue = this.formBuilder.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
    name: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required]],
    address: [null, [Validators.required]],
    phone: [null, [Validators.required]],
  })


  handleSignup = async () => {
    this.isMatch = true
    console.log(this.formSignupValue);

    if (this.formSignupValue.valid) {
      this.userService.signup(this.formSignupValue.value).subscribe((resp) => {
        this.toastr.info(resp.message)
        if (resp.data) {
          this.isMatch = false
          this.isShowModal = 1
        }

      })
    }
  }

  handleSignin = async () => {
    this.isMatch = true
    if (this.formSigninValue.valid) {

      this.userService.signin(this.formSigninValue.value).subscribe((resp) => {
        this.toastr.info(resp.message)

        if (resp.data) {
          this.isMatch = false
          this.isShowModal = 0
          localStorage.setItem("user", JSON.stringify(resp))
          this.isUser = JSON.parse(localStorage.getItem("user") as string) || null
        }
      })

    }
  }

  handleClose = () => {
    this.isShowModal = 0
  }

  handleLogout = () => {
    this.isUser = null
    localStorage.clear()
  }


  handleShowSignin = () => {
    this.isShowModal = 1
  }

  handleShowSignup = () => {
    this.isShowModal = 2
  }

  handleSearch() {
    this.productService.search(this.formValueSearch.value).subscribe((resp) => {
      this.productList = resp.data
    })
  }
  handleModalSearch () {
    this.productList = null
  }
}
