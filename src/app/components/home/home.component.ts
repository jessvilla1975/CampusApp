import { Component, OnInit } from '@angular/core';
import { SliderComponent } from "../slider/slider.component";
import { ApiService } from '../../api.service';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, RouterLink, ReactiveFormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  helpForm: FormGroup;

  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder,

  ) {
    // Inicializar el formulario con validación
    this.helpForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: [''],
      comentario: ['', Validators.required]
    });
  }

  // Función para enviar el formulario
  onSubmit() {
    if (this.helpForm.valid) {
      this.apiService.createHelpDeskRequest(this.helpForm.value).subscribe(
        response => {
          alert('Su mensaje ha sido enviado correctamente.');
          this.helpForm.reset({
            nombre: '',
            correo: '',
            telefono: '',
            comentario: ''
          });
        },
        error => {
          alert('Hubo un error al enviar el mensaje. Inténtelo de nuevo.');
        }
      );
    } else {
      alert('Por favor, complete los campos obligatorios.');
    }
  }



}
