import { Component } from '@angular/core';


import { FooterComponent } from "../footer/footer.component";
import { HeaderPassengerComponent } from '../header-passenger/header-passenger.component';


@Component({
  selector: 'app-edit-passenger',
  standalone: true,
  imports: [HeaderPassengerComponent],
  templateUrl: './edit-passenger.component.html',
  styleUrl: './edit-passenger.component.css'
})
export class EditPassengerComponent {

}
