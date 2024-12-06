import { Component } from '@angular/core';
import { HeaderPassengerComponent } from '../header-passenger/header-passenger.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [HeaderPassengerComponent, FooterComponent],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {

}
