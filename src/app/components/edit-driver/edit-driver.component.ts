import { Component, OnInit } from '@angular/core';
import { HeaderDriverComponent } from "../header-driver/header-driver.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-edit-driver',
  standalone: true,
  imports: [HeaderDriverComponent, ReactiveFormsModule],
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css']
})

export class EditDriverComponent implements OnInit {
  driverForm: FormGroup;
  userId: string = '';
  fullName: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    // Inicializar el formulario con validaciones
    this.driverForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      genero: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      direccion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContraseña: ['', Validators.required],

      // Datos de la licencia
      numeroLicencia: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],

      // Datos del vehículo
      idPlaca: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      ano: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      color: ['', Validators.required],
      capacidadPasajeros: ['', Validators.required]
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
    this.apiService.getConductorById(this.userId).subscribe({
      next: (response: any) => {
        console.log('data:', response); // Imprimir la respuesta en la consola
        if (response.success) {
          // Convertir la fecha de nacimiento al formato yyyy-MM-dd
          const fechaNacimiento = this.formatDate(response.data.fechaNacimiento);
          const fechaVencimiento = this.formatDate(response.data.fecha_vencimiento);
          this.fullName = `${response.data.nombre} ${response.data.apellido}`;

          // Llenar el formulario con los datos obtenidos
          this.driverForm.patchValue({
            nombre: response.data.nombre,
            apellido: response.data.apellido,
            genero: response.data.genero,
            correo: response.data.correo,
            telefono: response.data.telefono,
            direccion: response.data.direccion,
            fechaNacimiento: fechaNacimiento,
            contraseña: response.data.contraseña,
            confirmarContraseña: response.data.contraseña,
            numeroLicencia: response.data.numero_licencia,
            fechaVencimiento: fechaVencimiento,
            idPlaca: response.data.vehiculo.id_placa,
            marca: response.data.vehiculo.marca,
            modelo: response.data.vehiculo.modelo,
            ano: response.data.vehiculo.ano,
            color: response.data.vehiculo.color,
            capacidadPasajeros: response.data.vehiculo.capacidad_pasajeros
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
  private formatDate(date: string | null): string {
    if (!date) {
      return ''; // Si la fecha es NULL o vacía, devuelve una cadena vacía
    }

    const dateObject = new Date(date);
    if (isNaN(dateObject.getTime())) {
      console.error("Fecha inválida:", date);
      return ''; // Devuelve una cadena vacía si la fecha no es válida
    }

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
    if (this.driverForm.invalid) {
      alert('Por favor, complete todos los campos obligatorios correctamente.');
      return;
    }

    const formData = this.driverForm.value;
    const userData = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      genero: formData.genero,
      correo: formData.correo,
      telefono: formData.telefono,
      direccion: formData.direccion,
      fechaNacimiento: formData.fechaNacimiento,
      contraseña: formData.contraseña,
      numeroLicencia: formData.numeroLicencia,
      fechaVencimiento: formData.fechaVencimiento,
      idPlaca: formData.idPlaca,
      marca: formData.marca,
      modelo: formData.modelo,
      ano: formData.ano,
      color: formData.color,
      capacidadPasajeros: formData.capacidadPasajeros
    };

    this.apiService.updateDriver(this.userId, userData).subscribe({
      next: (response) => {
        alert('Usuario actualizado correctamente.');
        this.router.navigate(['/edit-driver']); // Redirigir a otra página (ajusta según sea necesario)
      },
      error: (error) => {
        console.error('Error al actualizar el usuario:', error);
        alert('Error al actualizar el usuario. Intente nuevamente.');
      }
    });
  }
}
