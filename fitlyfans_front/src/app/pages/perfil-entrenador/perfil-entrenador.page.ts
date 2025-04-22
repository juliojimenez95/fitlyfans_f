import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { checkmarkCircle, videocam } from 'ionicons/icons';

@Component({
  selector: 'app-perfil-entrenador',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule 
  ],
  templateUrl: './perfil-entrenador.page.html',
  styleUrls: ['./perfil-entrenador.page.scss']
})
export class PerfilEntrenadorPage {
  entrenador: any;
  checkmarkCircle = checkmarkCircle;
  videocam = videocam;
  id_seguido: string = ''; // <- aquí guardamos el id del entrenador

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id_seguido = this.route.snapshot.paramMap.get('id') || '1'; // <- lo guardamos aquí también

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get(`http://127.0.0.1:5000/api/entrenador/${this.id_seguido}`, { headers }).subscribe({
      next: (data) => {
        this.entrenador = data;
      },
      error: (err) => {
        console.error('Error al cargar el perfil del entrenador', err);
      }
    });
  }

  suscribirse() {
    const id_seguidor = localStorage.getItem('userId'); // Suponiendo que tienes guardado el id del usuario logueado

    if (!id_seguidor || !this.id_seguido) {
      console.error('Faltan datos para la suscripción');
      return;
    }

    const payload = {
      id_seguidor: Number(id_seguidor),
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
        // Aquí podrías mostrar un mensaje tipo toast si quieres
      },
      error: (err) => {
        console.error('Error al suscribirse', err);
      }
    });
  }
}
