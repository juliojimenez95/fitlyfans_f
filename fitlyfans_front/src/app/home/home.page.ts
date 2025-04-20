import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http'; // Asegúrate de importar esto
import { RouterLink } from '@angular/router';

interface Entrenador {
  id: number;
  nombre: string;
  correo: string;
  contrasena: string;
  fecha_registro: string;
}

interface ApiResponse {
  entrenadores: Entrenador[];
  total: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonicModule // ✅ Suficiente para usar todos los componentes de Ionic
  ],
})
export class HomePage implements OnInit {
  entrenadores: Entrenador[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerEntrenadores();
  }

  obtenerEntrenadores() {
    const token = localStorage.getItem('token'); // O usa el storage de Ionic si lo prefieres
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    this.http.get<ApiResponse>('http://127.0.0.1:5000/api/entrenador', { headers }).subscribe({
      next: (data) => {
        this.entrenadores = data.entrenadores;  // Asignamos los entrenadores de la respuesta
      },
      error: (err) => {
        console.error('Error al obtener entrenadores', err);
      },
    });
  }
}
