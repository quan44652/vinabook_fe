import { Component } from '@angular/core';
import { faBook, faTruck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.css']
})
export class TopPageComponent {
truckIcon = faTruck
bookIcon = faBook
}
