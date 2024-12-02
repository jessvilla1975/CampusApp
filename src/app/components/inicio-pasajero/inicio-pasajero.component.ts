import { Component } from '@angular/core';
import { HeaderPassengerComponent } from '../header-passenger/header-passenger.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-inicio-pasajero',
  standalone: true,
  imports: [HeaderPassengerComponent, FooterComponent],
  templateUrl: './inicio-pasajero.component.html',
  styleUrl: './inicio-pasajero.component.css'
})
export class InicioPasajeroComponent {

}
