import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { checkmarkCircle, videocam } from 'ionicons/icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil-entrenador',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    RouterModule
  ],
  templateUrl: './perfil-entrenador.page.html',
  styleUrls: ['./perfil-entrenador.page.scss']
})
export class PerfilEntrenadorPage {
  entrenador: any;
  checkmarkCircle = checkmarkCircle;
  videocam = videocam;
  id_seguido: string = '';      // ID del entrenador
  id_suscriptor: string = '';   // ID del suscriptor (usuario logueado)
  mostrarChat: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id_seguido = this.route.snapshot.paramMap.get('id') || '';
    this.id_suscriptor = localStorage.getItem('userId') || '';

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get(`http://127.0.0.1:5000/api/entrenador/${this.id_seguido}`, { headers }).subscribe({
      next: (data) => {
        this.entrenador = data;
        this.verificarSuscripcion();
      },
      error: (err) => {
        console.error('Error al cargar el perfil del entrenador', err);
      }
    });
  }

  suscribirse() {
    if (!this.id_suscriptor || !this.id_seguido) {
      console.error('Faltan datos para la suscripción');
      return;
    }

    const payload = {
      id_seguidor: Number(this.id_suscriptor),
      id_seguido: Number(this.id_seguido)
    };

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.post('http://127.0.0.1:5000/api/suscripcion', payload, { headers }).subscribe({
      next: (res) => {
        console.log('Suscripción exitosa', res);
        this.verificarSuscripcion();
      },
      error: (err) => {
        console.error('Error al suscribirse', err);
      }
    });
  }

  verificarSuscripcion() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    if (!this.id_suscriptor || !this.id_seguido) return;

    this.http.get<{ sigue: boolean }>(
      `http://127.0.0.1:5000/api/suscripcion/verificar/doble?id_seguidor=${this.id_suscriptor}&id_seguido=${this.id_seguido}`,
      { headers }
    ).subscribe({
      next: (res) => {
        this.mostrarChat = res.sigue;
      },
      error: (err) => {
        console.error('Error al verificar suscripción', err);
      }
    });
  }
}
