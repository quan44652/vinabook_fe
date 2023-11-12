import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent {
  modalSetting = 0
  userSelected = {} as any

  userList: any

  constructor(private UserService: UserService, private toastr: ToastrService) {
    this.UserService.getAllUser().subscribe(({ data }) => {
      this.userList = data
    })
  }

  handleCancelModal = () => {
    this.modalSetting = 0
  }

  handleCapquyen = () => {
    this.UserService.capquyen({id: this.userSelected._id}).subscribe((resp) => {
      this.toastr.success(resp.message,"Chúc mừng")
      this.UserService.getAllUser().subscribe(({ data }) => {
        this.userList = data
        this.modalSetting = 0
      })
    })
  }

  handleModalCapquyen = (data:any) => {
this.userSelected = data
this.modalSetting = 3
  }
  
}
