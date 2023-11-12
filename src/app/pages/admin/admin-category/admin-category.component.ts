import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent {
  modalSetting = 0
  isMatch = false
  categorySelected = {
    name: ""
  } as any

  categoryList!: any;
  categoryNew: any;


  constructor(private CategoryService: CategoryService, private toastr: ToastrService, private formBuilder: FormBuilder) {
    this.CategoryService.get().subscribe(({ data }) => {
      this.categoryList = data
    })
  }


  formValue = this.formBuilder.group({
    name: [null, [Validators.required]],
  })


  handleCancelModal = () => {
    this.modalSetting = 0
  }

  handleDeletelModal = (data: any) => {
    this.modalSetting = 3
    this.categorySelected = data
  }

  handleSubmit = () => {
    this.isMatch = true
    if (this.formValue.valid) {
      this.categoryNew = {
        name: this.formValue.value.name || this.categorySelected.name,
      }
      if (this.modalSetting == 1) {
        this.CategoryService.create(this.categoryNew).subscribe((resp) => {
          this.toastr.success(resp.message, 'Chúc mừng!');
          this.CategoryService.get().subscribe(({ data }) => {
            this.categoryList = data
            this.modalSetting = 0
          })
        })
      }
      if (this.modalSetting == 2) {
        this.CategoryService.update(this.categorySelected._id,this.categoryNew).subscribe((resp) => {
          this.toastr.success(resp.message, 'Chúc mừng!');
          this.CategoryService.get().subscribe(({ data }) => {
            this.categoryList = data
            this.modalSetting = 0
          })
        })
      }
      this.isMatch = false
    }
  }


  handleDeleteCategory = () => {
    this.CategoryService.delete(this.categorySelected._id).subscribe((resp) => {
      this.toastr.success(resp.message, 'Chúc mừng!');
      this.CategoryService.get().subscribe(({ data }) => {
        this.categoryList = data
        this.modalSetting = 0
      })
    })
  }

  handleModalCreate = () => {
    this.modalSetting = 1
    this.categorySelected = {}
  }

  handleModalUpdate = (data: any) => {
    this.modalSetting = 2
    this.categorySelected = data
    console.log(data);
  }
}
