import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class PaymentPage {
  referencia_pago = 'TXN003';
  valor = 150000;
  metodo_pago = 'PSE';
  documento_cliente = '123456789';
  nombre_cliente = 'Juan Pérez';
  email_cliente = 'juan@example.com';
  
  // Datos de la suscripción pendiente
  datosSuscripcion: any = null;

  constructor(
    private http: HttpClient, 
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    // Recuperar los datos de suscripción guardados temporalmente
    const datosPendientes = localStorage.getItem('suscripcionPendiente');
    if (datosPendientes) {
      this.datosSuscripcion = JSON.parse(datosPendientes);
      
      // También podríamos obtener datos del usuario actual para prellenar el formulario
      const userId = localStorage.getItem('userId');
      if (userId) {
        // Opcional: Cargar datos del usuario para prellenar el formulario
        // this.cargarDatosUsuario(userId);
      }
    }
  }

  async confirmarPago() {
    const body = {
      referencia_pago: this.referencia_pago,
      valor: this.valor,
      metodo_pago: this.metodo_pago,
      documento_cliente: this.documento_cliente,
      nombre_cliente: this.nombre_cliente,
      email_cliente: this.email_cliente
    };

    try {
      // 1. Registrar el pago
      await this.http.post('http://127.0.0.1:8000/api/pagos', body).toPromise();
      
      // 2. Si hay datos de suscripción pendiente, completar la suscripción
      if (this.datosSuscripcion) {
        await this.completarSuscripcion();
      }
      
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Pago registrado correctamente. Su suscripción ha sido activada.',
        buttons: [{
          text: 'OK',
          handler: () => {
            // Eliminar datos de suscripción pendiente
            localStorage.removeItem('suscripcionPendiente');
            
            // Obtener el ID del entrenador almacenado
            const entrenadorId = localStorage.getItem('entrenadorId') || 'home';
            localStorage.removeItem('entrenadorId'); // Limpiar después de usar
            
            // Usar window.location para forzar una recarga completa
            window.location.href = `/perfil-entrenador/${entrenadorId}`;
          }
        }]
      });
      await alert.present();
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No se pudo registrar el pago.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }

  async completarSuscripcion() {
    if (!this.datosSuscripcion) return;

    const payload = {
      id_seguidor: Number(this.datosSuscripcion.id_seguidor),
      id_seguido: Number(this.datosSuscripcion.id_seguido)
    };

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    try {
      await this.http.post('http://127.0.0.1:5000/api/suscripcion', payload, { headers }).toPromise();
      console.log('Suscripción completada con éxito');
      
      // Guardar el ID del entrenador para usarlo en la redirección
      localStorage.setItem('entrenadorId', this.datosSuscripcion.id_seguido);
    } catch (error) {
      console.error('Error al completar la suscripción después del pago', error);
      throw error; // Propagar el error para que sea capturado por el método principal
    }
  }

  cancelarPago() {
    this.router.navigate(['/perfil-entrenador', this.datosSuscripcion?.id_seguido || 'home']);
  }
}