import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-trainer',
  templateUrl: './register-trainer.page.html',
  styleUrls: ['./register-trainer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class RegisterTrainerPage {
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  especialidad: string = '';
  certificaciones: string = '';
  tipo_usuario: string = 'entrenador'; // Valor fijo

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router
  ) {}

  async registrar() {
    if (!this.nombre || !this.correo || !this.contrasena || !this.confirmarContrasena || !this.especialidad || !this.certificaciones) {
      const alert = await this.alertController.create({
        header: 'Campos incompletos',
        message: 'Por favor, completa todos los campos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['Intentar de nuevo'],
      });
      await alert.present();
      return;
    }

    const body = {
      nombre: this.nombre,
      correo: this.correo,
      contrasena: this.contrasena,
      tipo_usuario: this.tipo_usuario,
      especialidad: this.especialidad,
      certificaciones: this.certificaciones,
    };

    console.log('Datos a enviar:', body);

    this.http.post('http://127.0.0.1:5000/api/auth/register', body).subscribe({
      next: async (res: any) => {
        console.log('Registro exitoso:', res);

        if (res.token) {
          localStorage.setItem('token', res.token);

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

        this.router.navigate(['/login']);
      },
      error: async (err) => {
        console.error('Error al registrar:', err);
        let mensaje = 'Error al crear la cuenta. Por favor, intenta de nuevo.';

        if (err.error && err.error.message) {
          mensaje = err.error.message;
        }

        const alert = await this.alertController.create({
          header: 'Error',
          message: mensaje,
          buttons: ['Aceptar'],
        });
        await alert.present();
      },
    });
  }
}
