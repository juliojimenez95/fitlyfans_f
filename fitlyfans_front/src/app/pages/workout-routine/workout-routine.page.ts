import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RouterLink } from '@angular/router';

interface Ejercicio {
  id: number;
  nombre: string;
  duracion: string;
  imagen: string;
  seleccionado?: boolean;
}

@Component({
  selector: 'app-workout-routine',
  templateUrl: './workout-routine.page.html',
  styleUrls: ['./workout-routine.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgCircleProgressModule,
    RouterLink
  ]
})
export class WorkoutRoutinePage implements OnInit {
  routineName: string = '';
  routineDescription: string = '';
  difficulty: string = 'intermediate';
  showRoutineDetails: boolean = false;
  weekProgress: number[] = [30, 50, 80, 40, 60, 20, 90];

  ejercicios: Ejercicio[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerEjercicios();
  }

  obtenerEjercicios() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<{ ejercicios: Ejercicio[] }>('http://127.0.0.1:5000/api/ejercicios', { headers })
      .subscribe({
        next: (res) => {
          this.ejercicios = res.ejercicios.map(e => ({ ...e, seleccionado: false }));
        },
        error: (err) => console.error('Error al obtener ejercicios', err)
      });
  }

  toggleSeleccion(ejercicio: Ejercicio) {
    ejercicio.seleccionado = !ejercicio.seleccionado;
  }

  guardarRutina() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!userId || !token) {
      alert('No se encontró el usuario o el token. Por favor, inicia sesión nuevamente.');
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    const rutina = {
      id_entrenador: parseInt(userId),
      nombre: this.routineName,
      descripcion: this.routineDescription,
      nivel_dificultad: this.difficulty,
      duracion_estimada: this.calcularDuracionEstimada()
    };

    this.http.post('http://127.0.0.1:5000/api/rutina/rutinas', rutina, { headers })
      .subscribe({
        next: (res: any) => {
          console.log('Rutina creada con éxito:', res);
          alert('¡Rutina guardada exitosamente!');
        },
        error: (err) => {
          console.error('Error al crear rutina', err);
          alert('Error al guardar la rutina.');
        }
      });
  }

  calcularDuracionEstimada(): number {
    const seleccionados = this.ejercicios.filter(e => e.seleccionado);
    return seleccionados.length * 1; // Ejemplo: 1 minuto por ejercicio seleccionado
  }
}
