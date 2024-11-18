import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

;@Component({
  selector: 'app-auntentucation-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './auntentucation-login.component.html',
  styleUrl: './auntentucation-login.component.css'
})
export class AuntentucationLoginComponent {

}
