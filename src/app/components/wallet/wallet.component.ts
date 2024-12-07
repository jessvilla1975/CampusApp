import { Component } from '@angular/core';
import { HeaderPassengerComponent } from '../header-passenger/header-passenger.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [HeaderPassengerComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {
  locationInput: string = '';
  locationOutput: string = '';
  distance: number = 0;
  duration: number = 0;
  price: number = 0;

  toggleFormulario() {
    const formulario = document.getElementById('formulario');
    if (formulario) {
      formulario.style.display = formulario.style.display === 'none' ? 'block' : 'none';
    }
  }

}
