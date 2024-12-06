import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-passenger',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-passenger.component.html',
  styleUrls: ['./header-passenger.component.css']
})
export class HeaderPassengerComponent {
  @Input() fullName: string = ''; // Variable para recibir el nombre completo
}
