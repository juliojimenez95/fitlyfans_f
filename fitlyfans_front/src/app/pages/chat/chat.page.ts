import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, IonicModule],
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  mensajes: any[] = [];
  nuevoMensaje: string = '';
  suscriptor_id: string | null = null;
  entrenador_id: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    // Captura los parámetros de la URL
    this.entrenador_id = this.route.snapshot.paramMap.get('entrenador_id');
    this.suscriptor_id = this.route.snapshot.paramMap.get('suscriptor_id');

    if (this.entrenador_id && this.suscriptor_id) {
      this.cargarMensajes();
    }
  }

  cargarMensajes() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const url = `http://127.0.0.1:5000/api/mensaje/entrenador/${this.entrenador_id}/suscriptor/${this.suscriptor_id}`;
    this.http.get<any>(url, { headers }).subscribe({
      next: (res) => {
        this.mensajes = res.mensajes.map((mensaje: any) => ({
          ...mensaje,
          autor: mensaje.emisor === 1 ? 'yo' : 'entrenador',
        }));
      },
      error: (err) => console.error('Error al cargar mensajes', err),
    });
  }

  enviarMensaje() {
    if (!this.nuevoMensaje.trim() || !this.entrenador_id || !this.suscriptor_id) return;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const payload = {
      suscriptor_id: Number(this.suscriptor_id),
      entrenador_id: Number(this.entrenador_id),
      contenido: this.nuevoMensaje,
      emisor: 1, // El suscriptor envía
    };

    this.http.post('http://127.0.0.1:5000/api/mensaje', payload, { headers }).subscribe({
      next: () => {
        this.nuevoMensaje = '';
        this.cargarMensajes();
      },
      error: (err) => console.error('Error al enviar mensaje', err),
    });
  }
}
