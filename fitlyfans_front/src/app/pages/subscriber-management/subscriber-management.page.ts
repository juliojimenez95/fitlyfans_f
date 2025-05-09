import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';

interface Subscriber {
  id: number;
  name: string;
  date: string;
  plan: 'Premium' | 'Basic';
  progress: number;
  avatar?: string;
}

interface Routine {
  id: number;
  name: string;
  popularity: number;
}

interface ApiResponse {
  subscribers: Subscriber[];
  total: number;
  retention_rate: number;
  monthly_revenue: number;
  popular_routines: Routine[];
}

@Component({
  selector: 'app-subscriber-management',
  standalone: true,
  templateUrl: './subscriber-management.page.html',
  styleUrls: ['./subscriber-management.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonicModule
  ],
})
export class SubscriberManagementPage implements OnInit {
  subscribers: Subscriber[] = [];
  totalSubscribers: number = 0;
  retentionRate: number = 0;
  monthlyRevenue: number = 0;
  popularRoutines: Routine[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerSuscriptores();
  }

  obtenerSuscriptores() {
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    // Usamos datos simulados para la demostración, reemplaza esta URL con tu endpoint real
    this.http.get<ApiResponse>('http://127.0.0.1:5000/api/suscriptor/listr', { headers }).subscribe({
      next: (data) => {
        this.subscribers = data.subscribers;
        this.totalSubscribers = data.total;
        this.retentionRate = data.retention_rate;
        this.monthlyRevenue = data.monthly_revenue;
        this.popularRoutines = data.popular_routines;
      },
      error: (err) => {
        console.error('Error al obtener suscriptores', err);
        // Para demostración, añadimos datos de ejemplo en caso de error
        this.cargarDatosEjemplo();
      },
    });
  }

  cargarDatosEjemplo() {
    // Datos de ejemplo basados en la imagen proporcionada
    this.totalSubscribers = 1492;
    this.retentionRate = 85;
    this.monthlyRevenue = 3750;
    
    this.popularRoutines = [
      { id: 1, name: 'HIIT Blast', popularity: 100 },
      { id: 2, name: 'Full Body Burn', popularity: 80 },
      { id: 3, name: 'Booty Builder', popularity: 65 }
    ];
    
    this.subscribers = [
      {
        id: 1,
        name: 'Adam Cohen',
        date: '30 October 21 2023',
        plan: 'Premium',
        progress: 100,
        avatar: 'assets/avatar-default.jpg'
      },
      {
        id: 2,
        name: 'John Arstrim',
        date: '31 October 21 2023',
        plan: 'Basic',
        progress: 50,
        avatar: 'assets/avatar-default.jpg'
      },
      {
        id: 3,
        name: 'Alex Slatten',
        date: '31 October 21 2023',
        plan: 'Premium',
        progress: 100,
        avatar: 'assets/avatar-default.jpg'
      },
      {
        id: 4,
        name: 'Brian Gausta',
        date: '31 October 31 2023',
        plan: 'Basic',
        progress: 50,
        avatar: 'assets/avatar-default.jpg'
      }
    ];
  }
}