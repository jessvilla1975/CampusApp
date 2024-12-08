import { Component } from '@angular/core';
import { HeaderDriverComponent } from "../header-driver/header-driver.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [HeaderDriverComponent, FooterComponent],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {

}
