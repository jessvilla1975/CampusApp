import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { HeaderPassengerComponent } from '../header-passenger/header-passenger.component';

@Component({
  selector: 'app-edit-passenger',
  standalone: true,
  imports: [HeaderPassengerComponent, ReactiveFormsModule],
  templateUrl: './edit-passenger.component.html',
  styleUrls: ['./edit-passenger.component.css']
})
export class EditPassengerComponent implements OnInit {
  passengerForm: FormGroup;
  userId: string = '';
  fullName: string = '';
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    // Inicializar el formulario con validaciones
    this.passengerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      genero: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      direccion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContraseña: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Obtener el userId desde localStorage
    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage) {
      this.userId = userIdFromStorage;
      this.loadUserData();
    } else {
      this.router.navigate(['/login']); // Redirigir al login si no hay userId
    }
  }

  // Cargar los datos del usuario desde la API
  private loadUserData(): void {
    this.apiService.getUserById(this.userId).subscribe({
      next: (response: any) => {
        if (response.success) {
          // Convertir la fecha de nacimiento al formato yyyy-MM-dd
          const fechaNacimiento = this.formatDate(response.data.usuario.fechaNacimiento);
          this.fullName = `${response.data.usuario.nombre} ${response.data.usuario.apellido}`;
          this.passengerForm.patchValue({
            nombre: response.data.usuario.nombre,
            apellido: response.data.usuario.apellido,
            genero: response.data.usuario.genero,
            correo: response.data.usuario.correo,
            telefono: response.data.usuario.telefono,
            direccion: response.data.usuario.direccion,
            fechaNacimiento: fechaNacimiento,
            contraseña: response.data.usuario.contraseña,
            confirmarContraseña: response.data.usuario.contraseña
          });
        } else {
          alert('No se pudo cargar la información del usuario.');
        }
      },
      error: (error) => {
        console.error('Error al cargar los datos del usuario', error);
        alert('Error al cargar los datos del usuario.');
      }
    });
  }

  // Función para convertir la fecha al formato adecuado
  private formatDate(date: string): string {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Validador para comparar contraseñas
  private passwordMatchValidator(form: FormGroup): { mismatch: boolean } | null {
    const password = form.get('contraseña')?.value;
    const confirmPassword = form.get('confirmarContraseña')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Actualizar los datos del usuario
  onSubmit(): void {
    if (this.passengerForm.invalid) {
      alert('Por favor, complete todos los campos obligatorios correctamente.');
      return;
    }

    const formData = this.passengerForm.value;
    const userData = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      genero: formData.genero,
      correo: formData.correo,
      telefono: formData.telefono,
      direccion: formData.direccion,
      fechaNacimiento: formData.fechaNacimiento,
      contraseña: formData.contraseña
    };

    this.apiService.updateDriver(this.userId, userData).subscribe({
      next: (response) => {
        alert('Usuario actualizado correctamente.');
        //this.router.navigate(['/profile']); // Redirigir a otra página (ajusta según sea necesario)
      },
      error: (error) => {
        console.error('Error al actualizar el usuario:', error);
        alert('Error al actualizar el usuario. Intente nuevamente.');
      }
    });
  }


}
