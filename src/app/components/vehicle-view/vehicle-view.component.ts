import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderDriverComponent } from '../header-driver/header-driver.component';

@Component({
  selector: 'app-vehicle-view',
  standalone: true,
  imports: [FooterComponent, HeaderDriverComponent],
  templateUrl: './vehicle-view.component.html',
  styleUrl: './vehicle-view.component.css'
})
export class VehicleViewComponent {

}
