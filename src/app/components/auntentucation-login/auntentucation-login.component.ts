import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-auntentucation-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './auntentucation-login.component.html',
  styleUrl: './auntentucation-login.component.css'
})
export class AuntentucationLoginComponent {

}
