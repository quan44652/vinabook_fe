import { Component, Input } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sider-bar',
  templateUrl: './sider-bar.component.html',
  styleUrls: ['./sider-bar.component.css']
})
export class SiderBarComponent {
  arrowIcon = faAngleRight

  categoryList = [] as any

  constructor(private categoryService: CategoryService, private toastr: ToastrService) {
    this.categoryService.get().subscribe(({ data }) => {
      this.categoryList = data
    })
  }




}
