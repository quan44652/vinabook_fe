import { Component } from '@angular/core';
import { faAngleDown, faBars, faCartShopping, faChevronCircleDown, faComment, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
barsIcon = faBars
arrowDownIcon = faAngleDown
phoneIcon = faPhone
commentIcon = faComment
cartIcon = faCartShopping
}
