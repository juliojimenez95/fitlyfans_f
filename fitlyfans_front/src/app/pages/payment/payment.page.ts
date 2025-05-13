import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PaymentPage {
  referencia_pago = 'TXN003';
  valor = 150000;
  metodo_pago = 'PSE';
  documento_cliente = '123456789';
  nombre_cliente = 'Juan Pérez';
  email_cliente = 'juan@example.com';

  constructor(private http: HttpClient, private alertCtrl: AlertController) {}

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
      await this.http.post('http://127.0.0.1:8000/api/pagos', body).toPromise();
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Pago registrado correctamente.',
        buttons: ['OK']
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
}
