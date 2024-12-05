import { Component } from '@angular/core';
import { HeaderDriverComponent } from '../header-driver/header-driver.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-inicio-pasajero',
  standalone: true,
  imports: [HeaderDriverComponent, FooterComponent],
  templateUrl: './travel-history-driver.component.html',
  styleUrl: './travel-history-driver.component.css'
})
export class TravelHistoryDriverComponent {

}
