import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  arrowIcon = faAngleRight
  productsList: any = null
  categoryList: any = null
  sort: any = ""
  constructor(private categoryService: CategoryService, private productSerive: ProductService, private toastr: ToastrService, private router: ActivatedRoute,) {

  }

  ngOnInit() {
    this.router.params.subscribe(({ id }) => {
      if (id != "all") {
        this.categoryService.getOne(id).subscribe(({ data }) => {
          this.productsList = data.books
        })
      }
      else {
        this.productSerive.get().subscribe(({ data }) => {
          this.productsList = data
        })
      }
    })

    this.categoryService.get().subscribe(({ data }) => {
      this.categoryList = data

    })
  }

  handleSelectedCategory = (item: any) => {

    if (item == "") {
      this.productSerive.get().subscribe(({ data }) => {
        this.productsList = data
      })
    }
    else {
      this.categoryService.getOne(item._id).subscribe(({ data }) => {
        this.productsList = data.books
      })
    }

  }

  handleSort = () => {




    const params: any = {}

    if (this.sort == 1) {
      params._sort = "createdAt"
      params._order = "asc"
    }
    if (this.sort == 2) {
      params._sort = "createdAt"
      params._order = "desc"
    }
    if (this.sort == 3) {
      params._sort = "name"
      params._order = "asc"
    }
    if (this.sort == 4) {
      params._sort = "name"
      params._order = "desc"
    }
    if (this.sort ==5) {
      params._sort = "price"
      params._order = "asc"
    }
    if (this.sort == 6) {
      params._sort = "price"
      params._order = "desc"
    }


    this.productSerive.query(params).subscribe(({ data }) => {
      this.productsList = data
    })
  }

}
