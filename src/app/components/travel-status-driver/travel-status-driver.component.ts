import { Component } from '@angular/core';
import { HeaderDriverComponent } from '../header-driver/header-driver.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-travel-status-driver',
  standalone: true,
  imports: [HeaderDriverComponent, FooterComponent],
  templateUrl: './travel-status-driver.component.html',
  styleUrl: './travel-status-driver.component.css'
})
export class TravelStatusDriverComponent {
  fullName: string = '';

}
