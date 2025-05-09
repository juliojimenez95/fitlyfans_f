import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class LoginPage {
  correo: string = '';
  contrasena: string = '';

  constructor(private http: HttpClient, private alertController: AlertController, private router: Router) {}

  login() {
  const body = {
    correo: this.correo,
    contrasena: this.contrasena
  };

  this.http.post('http://127.0.0.1:5000/api/auth/login', body).subscribe({
    next: async (res: any) => {
      console.log('Login exitoso:', res);
      
      // Guardar token en localStorage
      localStorage.setItem('token', res.token);
      
      // Guardar información del usuario en localStorage
      //localStorage.setItem('usuario', JSON.stringify(res.usuario));
      
      // También puedes guardar datos específicos si los necesitas por separado
      localStorage.setItem('userId', res.usuario.id.toString());
      localStorage.setItem('userType', res.usuario.tipo_usuario);
      localStorage.setItem('userName', res.usuario.nombre);
      localStorage.setItem('tipo', res.usuario.tipo_usuario);
      localStorage.setItem('loginTime', Date.now().toString());
      
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Inicio de sesión correcto.',
        buttons: ['OK'],
      });
      await alert.present();

      if (res.usuario.tipo_usuario == 'suscriptor') {
        // Redirigir a la página principal o donde corresponda
        this.router.navigate(['/home']);
        
      } if(res.usuario.tipo_usuario == 'entrenador') {

        // Redirigir a la página principal o donde corresponda
        this.router.navigate(['/home-trainer']);
        
      }
    },
    error: async (err) => {
      console.error('Error al iniciar sesión:', err);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Correo o contraseña incorrectos.',
        buttons: ['Intentar de nuevo'],
      });
      await alert.present();
    }
  });
}
}
