import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.page.html',
  styleUrls: ['./create-exercise.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class CreateExercisePage implements OnInit {
  exerciseName: string = '';
  exerciseDescription: string = '';
  exerciseType: string = 'Fuerza';
  exerciseIntensity: number = 3; // 1-4 escala de intensidad
  videoUrl: string | null = null;
  recordingInProgress: boolean = false;
  
  exerciseTypes = [
    { id: 'strength', name: 'Fuerza', selected: true },
    { id: 'cardio', name: 'Cardio', selected: false },
    { id: 'flexibility', name: 'Flexibilidad', selected: false }
  ];
  
  constructor() { }

  ngOnInit() {
  }
  
  selectExerciseType(typeId: string) {
    this.exerciseTypes.forEach(type => {
      type.selected = type.id === typeId;
    });
    
    const selectedType = this.exerciseTypes.find(type => type.selected);
    if (selectedType) {
      this.exerciseType = selectedType.name;
    }
  }
  
  setIntensity(level: number) {
    this.exerciseIntensity = level;
  }
  
  startRecording() {
    this.recordingInProgress = true;
    // Aquí iría la lógica para iniciar la grabación
    console.log('Iniciando grabación...');
  }
  
  stopRecording() {
    this.recordingInProgress = false;
    // Aquí iría la lógica para detener la grabación
    console.log('Grabación detenida');
  }
  
  handleFileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Procesar archivo de video
      console.log('Archivo subido:', file.name);
      
      // Crear URL para la vista previa
      this.videoUrl = URL.createObjectURL(file);
    }
  }
  
  saveExercise() {
    // Validar datos
    if (!this.exerciseName.trim()) {
      // Mostrar error
      console.log('El nombre del ejercicio es obligatorio');
      return;
    }
    
    // Crear objeto con datos del ejercicio
    const exerciseData = {
      name: this.exerciseName,
      description: this.exerciseDescription,
      type: this.exerciseType,
      intensity: this.exerciseIntensity,
      // Otros datos como músculos, etc.
    };
    
    // Enviar datos
    console.log('Guardando ejercicio:', exerciseData);
    
    // Aquí iría la lógica para guardar el ejercicio
    // this.exerciseService.saveExercise(exerciseData);
  }
}