import { Component } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  arrowIcon = faAngleRight
  productsList: any = null
  categoryList: any = null
  constructor(private productService: ProductService, private categoryService: CategoryService, private toastr: ToastrService) {
    this.productService.get().subscribe(({ data }) => {
      this.productsList = data
      console.log(data);
      
    })

    this.categoryService.get().subscribe(({ data }) => {
      this.categoryList = data
    })
  }
}
