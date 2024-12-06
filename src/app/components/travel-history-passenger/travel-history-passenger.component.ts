import { Component } from '@angular/core';
import { HeaderPassengerComponent } from '../header-passenger/header-passenger.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-inicio-pasajero',
  standalone: true,
  imports: [HeaderPassengerComponent, FooterComponent],
  templateUrl: './travel-history-passenger.component.html',
  styleUrl: './travel-history-passenger.component.css'
})
export class TravelHistoryPassengerComponent {

}
