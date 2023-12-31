import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent {
  modalSetting = 0
  productSelected = null as any
  isMatch: boolean = false

  productsList?: any = null;
  categoryList?: any = null;
  productNew ?: any = null
  constructor(private productService: ProductService, private CategoryService: CategoryService, private toastr: ToastrService, private formBuilder: FormBuilder) {
    
  }

  
  ngOnInit () {
    this.productService.get().subscribe(({ data }) => {
      this.productsList = data
    })

    this.CategoryService.get().subscribe(({ data }) => {
      this.categoryList = data
    })
  }


  formValue = this.formBuilder.group({
    name: [null, [Validators.required]],
    image: [null, [Validators.required]],
    author: [null, [Validators.required]],
    price: [0 ,[Validators.required,Validators.pattern(/^[0-9]*$/)]],
    discount: [0 ,[Validators.required,Validators.pattern(/^[0-9]*$/)]],
    description: [null, [Validators.required]],
    categoryId: [null, [Validators.required]],
  })

  handleSubmit = () => {
    this.isMatch = true  
    if (this.formValue.valid) {
      this.productNew = {
        name: this.formValue.value.name,
        image: this.formValue.value.image,
        author: this.formValue.value.author,
        price: this.formValue.value.price,
        discount: this.formValue.value.discount,
        description: this.formValue.value.description,
        categoryId: this.formValue.value.categoryId,
      }
      if (this.modalSetting == 1) {
        this.productService.create(this.productNew).subscribe((resp) => {
          this.toastr.success(resp.message, 'Chúc mừng!');
          this.productService.get().subscribe(({ data }) => {
            this.productsList = data
            this.modalSetting = 0
          })
        })
      }
      if (this.modalSetting == 2) {
        this.productService.update(this.productSelected._id, this.productNew).subscribe((resp) => {
          this.toastr.success(resp.message, 'Chúc mừng!');
          this.productService.get().subscribe(({ data }) => {
            this.productsList = data
            this.modalSetting = 0
          })
        })
        
      }
      this.isMatch = false
    }

  }

  

  handleDelete = () => {
    this.productService.delete(this.productSelected._id).subscribe((resp) => {
      this.toastr.success(resp.message, 'Chúc mừng!');
      this.productService.get().subscribe(({ data }) => {
        this.productsList = data
        this.modalSetting = 0
      })
    })
  }

  handleDeletelModal = (data: any) => {
    this.modalSetting = 3
    this.productSelected = data
  }

  handleCancelModal = () => {
    this.modalSetting = 0
  }

  handleModalCreate = () => {
    this.productSelected =  {
      discount: 0,
      name: "",
      description: "",
      image: "",
      author: "",
      price: 0,
      categoryId: {
          _id: "",
      },
  }
    this.modalSetting = 1
    console.log(this.categoryList);
  }

  handleModalUpdate = (data: any) => {
    this.modalSetting = 2
    this.productSelected = data
    console.log(data);
    
  }

  

}
