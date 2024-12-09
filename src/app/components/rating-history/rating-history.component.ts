import { Component } from '@angular/core';
import { HeaderDriverComponent } from "../header-driver/header-driver.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-rating-history',
  standalone: true,
  imports: [HeaderDriverComponent, FooterComponent],
  templateUrl: './rating-history.component.html',
  styleUrl: './rating-history.component.css'
})
export class RatingHistoryComponent {

}
