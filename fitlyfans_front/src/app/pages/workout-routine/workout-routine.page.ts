import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-workout-routine',
  templateUrl: './workout-routine.page.html',
  styleUrls: ['./workout-routine.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgCircleProgressModule, 
    RouterLink
  ]
})
export class WorkoutRoutinePage implements OnInit {
  // Variables para la página de creación
  routineName: string = '';
  routineDescription: string = '';
  difficulty: string = 'intermediate';
  
  // Control para cambiar entre las dos vistas
  showRoutineDetails: boolean = false;
  
  // Datos para la página de detalles
  weekProgress: number[] = [30, 50, 80, 40, 60, 20, 90];

  constructor() { }

  ngOnInit() {
  }
}