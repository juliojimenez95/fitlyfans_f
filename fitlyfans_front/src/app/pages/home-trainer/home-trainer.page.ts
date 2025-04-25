import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-trainer',
  templateUrl: 'home-trainer.page.html',
  styleUrls: ['home-trainer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink],
})
export class HomeTrainerPage {
  workoutCategories = [
    {
      title: 'Cardio Express',
      image: 'assets/images/cardio.jpg',
      color: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
    },
    {
      title: 'Estiramientos Guiados',
      image: 'assets/images/estiramiento.jpg',
      color: 'linear-gradient(135deg, #3F51B5, #1A237E)',
    },
    {
      title: 'Zona Core',
      image: 'assets/images/core.jpg',
      color: 'linear-gradient(135deg, #212121, #000000)',
    },
    {
      title: 'Resistencia',
      image: 'assets/images/resistencia.jpg',
      color: 'linear-gradient(135deg, #212121, #000000)',
    },
  ];

  recommendedWorkouts = [
    {
      title: 'Reto 30 Días',
      duration: '2h',
      image: 'assets/images/reto-30.jpg',
      color: 'linear-gradient(135deg, #212121, #000000)',
    },
    {
      title: 'Circuito Funcional',
      intensity: '7/10',
      image: 'assets/images/circuito.jpg',
      color: 'linear-gradient(135deg, #212121, #000000)',
    },
  ];

  constructor() {}
}
