import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, CommonModule, FooterComponent],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
  agregarUsuario: FormGroup;
  isPasswordVisible: boolean = false;
  tipoUsuario: string = 'usuario';  // Por defecto es 'usuario'

  constructor(private fb: FormBuilder, private userService: ApiService, private router: Router) {
    this.agregarUsuario = this.fb.group({
      id: ['', Validators.required],
      genero: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContraseña: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
  }

  // Método para actualizar el tipo de usuario
  onUserTypeChange(tipo: string): void {
    this.tipoUsuario = tipo;

    if (tipo === 'conductor') {
      this.agregarUsuario.addControl('numero_licencia', this.fb.control('', Validators.required));
      this.agregarUsuario.addControl('fecha_vencimiento', this.fb.control('', Validators.required));
      this.agregarUsuario.addControl('id_placa', this.fb.control('', Validators.required)); // ID Placa
      this.agregarUsuario.addControl('marca', this.fb.control('', Validators.required)); // Marca
      this.agregarUsuario.addControl('modelo', this.fb.control('', Validators.required));
      this.agregarUsuario.addControl('ano', this.fb.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])); // Año como string
      this.agregarUsuario.addControl('color', this.fb.control('', Validators.required)); // Color
      this.agregarUsuario.addControl('capacidad_pasajeros', this.fb.control('', Validators.required));
    } else {
      this.agregarUsuario.removeControl('numero_licencia');
      this.agregarUsuario.removeControl('fecha_vencimiento');
      this.agregarUsuario.removeControl('id_placa');
      this.agregarUsuario.removeControl('marca');
      this.agregarUsuario.removeControl('modelo');
      this.agregarUsuario.removeControl('ano'); // Remover año si no es conductor
      this.agregarUsuario.removeControl('color'); // Remover color si no es conductor
      this.agregarUsuario.removeControl('capacidad_pasajeros'); // Remover capacidad de pasajeros si no es conductor
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('contraseña')?.value === form.get('confirmarContraseña')?.value ? null : { mismatch: true };
  }

  // Método para agregar un nuevo usuario
  onSubmit() {
    if (this.agregarUsuario.valid) {
        console.log('Formulario válido, enviando datos:', this.agregarUsuario.value);

        // Verificar el tipo de usuario
        if (this.tipoUsuario === 'conductor') {
            // Llama al servicio para registrar el usuario
            const {
                id, genero, nombre, apellido, correo, telefono, direccion, fecha_nacimiento, contraseña,
                numero_licencia, fecha_vencimiento, id_placa, marca, modelo, ano, color, capacidad_pasajeros
            } = this.agregarUsuario.value;

            // Primero registra al usuario
            this.userService.newUser({
                id,
                genero,
                nombre,
                apellido,
                correo,
                telefono,
                direccion,
                fecha_nacimiento,
                contraseña,
                rol: 'conductor'
            }).subscribe((userResponse) => {
                console.log('Usuario registrado:', userResponse);
                localStorage.setItem('correo', this.agregarUsuario.value.correo);
                // Al registrar al usuario, obtén su ID
                const id_conductor = id; // Asumiendo que el ID se retorna

                // Luego registra al conductor
                this.userService.addConductor({
                    id_conductor, // El ID del usuario registrado
                    numero_licencia,
                    fecha_vencimiento
                }).subscribe((conductorResponse) => {
                    console.log('Conductor registrado:', conductorResponse);

                    // Ahora, registra el vehículo asociado al conductor
                    this.userService.addVehiculo({
                        id_placa,
                        id_conductor, // Usamos el ID del conductor
                        marca,
                        modelo,
                        ano,
                        color,
                        capacidad_pasajeros
                    }).subscribe(
                        vehiculoResponse => {
                            console.log('Vehículo registrado:', vehiculoResponse);
                            alert('Registro de conductor y vehículo exitoso');

                            this.router.navigate(['/bike']);
                            setTimeout(() => {

                              this.router.navigate(['/auntentication-login']);
                            }, 3000);
                        },
                        error => {
                            console.error('Error al registrar vehículo:', error);
                            alert('Error al registrar el vehículo. Por favor, intenta nuevamente.');
                        }
                    );

                }, error => {
                    console.error('Error al registrar conductor:', error);
                    alert('Error al registrar el conductor. Por favor, intenta nuevamente.');
                });

            }, error => {
                console.error('Error al registrar usuario:', error);
                alert('Error al registrar el usuario. Por favor, intenta nuevamente.');
            });

        } else {
            // Envía los datos como usuario normal
            this.userService.newUser(this.agregarUsuario.value).subscribe(
                response => {
                    console.log('Usuario registrado:', response);
                    // Guardar correo en localStorage
                    localStorage.setItem('correo', this.agregarUsuario.value.correo);
                    alert('Registro exitoso');
                    this.router.navigate(['/bike']);
                    setTimeout(() => {
                      this.router.navigate(['/auntentication-login']);
                    }, 3000);
                },
                error => {
                    console.error('Error al registrar usuario:', error);
                    alert('Error al registrar el usuario. Por favor, intenta nuevamente.');
                }
            );
        }
    } else {
        console.error('Formulario no válido');
        // Imprimir los errores específicos
        Object.keys(this.agregarUsuario.controls).forEach(control => {
            const controlErrors = this.agregarUsuario.get(control)?.errors;
            if (controlErrors) {
                console.log(`Control: ${control}`, controlErrors);
            }
        });
    }
}


  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}

