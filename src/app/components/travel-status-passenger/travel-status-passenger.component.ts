import { Component } from '@angular/core';
import { HeaderPassengerComponent } from '../header-passenger/header-passenger.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-travel-status-passenger',
  standalone: true,
  imports: [HeaderPassengerComponent, FooterComponent],
  templateUrl: './travel-status-passenger.component.html',
  styleUrl: './travel-status-passenger.component.css'
})
export class TravelStatusPassengerComponent {
  fullName: string = '';

}
