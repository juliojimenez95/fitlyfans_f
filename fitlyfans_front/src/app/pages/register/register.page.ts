import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class RegisterPage {
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  objetivo: string = '';
  nivel_fitness: string = '';
  tipo_usuario: string = 'suscriptor'; // Valor predeterminado

  constructor(
    private http: HttpClient, 
    private alertController: AlertController, 
    private router: Router
  ) {}

  async registrar() {
    // Validación básica
    if (!this.nombre || !this.correo || !this.contrasena || !this.confirmarContrasena || !this.objetivo || !this.nivel_fitness) {
      const alert = await this.alertController.create({
        header: 'Campos incompletos',
        message: 'Por favor, completa todos los campos.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.contrasena !== this.confirmarContrasena) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['Intentar de nuevo']
      });
      await alert.present();
      return;
    }

    // Preparar los datos para enviar al servidor
    const body = {
      nombre: this.nombre,
      correo: this.correo,
      contrasena: this.contrasena,
      tipo_usuario: this.tipo_usuario, // Enviamos el valor predeterminado
      objetivo: this.objetivo,
      nivel_fitness: this.nivel_fitness
    };

    console.log('Datos a enviar:', body);

    // Enviar solicitud HTTP para registrar al usuario
    this.http.post('http://127.0.0.1:5000/api/auth/register', body).subscribe({
      next: async (res: any) => {
        console.log('Registro exitoso:', res);
        
        // Si el backend devuelve un token directamente tras el registro
        if (res.token) {
          localStorage.setItem('token', res.token);
          
          // Si el backend devuelve datos del usuario
          if (res.usuario) {
            localStorage.setItem('userId', res.usuario.id.toString());
            localStorage.setItem('userType', res.usuario.tipo_usuario);
            localStorage.setItem('userName', res.usuario.nombre);
          }
        }
        
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Registro completado correctamente.',
          buttons: ['OK'],
        });
        await alert.present();
        
        // Redirigir al login o a home según tu flujo de aplicación
        this.router.navigate(['/login']);
      },
      error: async (err) => {
        console.error('Error al registrar:', err);
        let mensaje = 'Error al crear la cuenta. Por favor, intenta de nuevo.';
        
        // Si el backend devuelve un mensaje específico
        if (err.error && err.error.message) {
          mensaje = err.error.message;
        }
        
        const alert = await this.alertController.create({
          header: 'Error',
          message: mensaje,
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
    });
  }
}