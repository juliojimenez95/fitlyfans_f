import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { checkmarkCircle, videocam } from 'ionicons/icons';
import { HttpHeaders } from '@angular/common/http';

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

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '1';

    const token = localStorage.getItem('token'); // O usa el storage de Ionic si lo prefieres
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get(`http://127.0.0.1:5000/api/entrenador/${id}`, { headers }).subscribe({
      next: (data) => {
        this.entrenador = data;
      },
      error: (err) => {
        console.error('Error al cargar el perfil del entrenador', err);
      }
    });
  }
}
