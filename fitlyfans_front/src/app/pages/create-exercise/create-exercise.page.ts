import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicModule, ToastController, ActionSheetController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


interface ExerciseType {
  id: string;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.page.html',
  styleUrls: ['./create-exercise.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ]
})
export class CreateExercisePage implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  
  exerciseName: string = '';
  exerciseDescription: string = '';
  exerciseType: string = 'fuerza';
  muscleGroup: string = '';
  videoUrl: SafeUrl | null = null;
  videoPath: string | Blob | null = null;
  videoDuration: string = '00:00';
  isLoading: boolean = false;
  
  exerciseTypes: ExerciseType[] = [
    { id: 'fuerza', name: 'Fuerza', selected: true },
    { id: 'cardio', name: 'Cardio', selected: false },
    { id: 'flexibilidad', name: 'Flexibilidad', selected: false }
  ];
  
  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {}

  // Método auxiliar para obtener el nombre del tipo de ejercicio seleccionado
  getSelectedExerciseTypeName(): string {
    const selectedType = this.exerciseTypes.find(t => t.selected);
    return selectedType ? selectedType.name : 'Fuerza';
  }

  // Método auxiliar para verificar si un tipo de ejercicio está seleccionado
  isExerciseTypeSelected(type: ExerciseType): boolean {
    return type.selected;
  }
  
  async presentVideoOptions() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Seleccionar video',
      buttons: [
        {
          text: 'Grabar con cámara',
          icon: 'videocam',
          handler: () => {
            this.captureVideo();
          }
        },
        {
          text: 'Seleccionar de galería',
          icon: 'images',
          handler: () => {
            this.pickVideo();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
  
  async captureVideo() {
    try {
      if (Capacitor.getPlatform() === 'web') {
        // En web, usamos el input file nativo
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*';
        input.capture = 'camera'; // Esto intentará abrir la cámara en dispositivos móviles
        
        // Crear una promesa para manejar la selección
        const fileSelected = new Promise<File | null>((resolve) => {
          input.onchange = (event) => {
            const files = (event.target as HTMLInputElement).files;
            if (files && files.length > 0) {
              resolve(files[0]);
            } else {
              resolve(null);
            }
          };
        });
        
        // Disparar el diálogo de selección
        input.click();
        
        // Esperar a que el usuario seleccione un archivo
        const file = await fileSelected;
        if (file) {
          const webPath = URL.createObjectURL(file);
          await this.processVideoResult(webPath, webPath);
        }
      } else {
        // En dispositivos nativos, usamos el método getPhoto con sourceType = CAMERA
        const videoCapture = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          saveToGallery: true
        } as any); // Usando 'as any' para evitar el error de tipo
        
        if (videoCapture && videoCapture.webPath) {
          await this.processVideoResult(videoCapture.webPath, videoCapture.path);
        }
      }
    } catch (e) {
      console.error('Error capturing video', e);
      this.showToast('Error al capturar el video');
    }
  }

  async pickVideo() {
    try {
      if (Capacitor.getPlatform() === 'web') {
        // En web, usamos el input file nativo
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*';
        
        // Crear una promesa para manejar la selección
        const fileSelected = new Promise<File | null>((resolve) => {
          input.onchange = (event) => {
            const files = (event.target as HTMLInputElement).files;
            if (files && files.length > 0) {
              resolve(files[0]);
            } else {
              resolve(null);
            }
          };
        });
        
        // Disparar el diálogo de selección
        input.click();
        
        // Esperar a que el usuario seleccione un archivo
        const file = await fileSelected;
        if (file) {
          const webPath = URL.createObjectURL(file);
          await this.processVideoResult(webPath, webPath);
        }
      } else {
        // En dispositivos nativos, usamos el método getPhoto con sourceType = PHOTOS
        const videoSelection = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Photos
        } as any);
        
        if (videoSelection && videoSelection.webPath) {
          await this.processVideoResult(videoSelection.webPath, videoSelection.path);
        }
      }
    } catch (e) {
      console.error('Error selecting video', e);
      this.showToast('Error al seleccionar el video');
    }
  }
  
  async processVideoResult(webPath: string, filePath?: string) {
    this.isLoading = true;
    
    try {
      if (webPath) {
        // Create safe URL for preview
        this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(webPath);
        
        // If we have a filePath, save it for later use
        if (filePath) {
          this.videoPath = webPath; // Guardamos el webPath para ambos casos (web y nativo)
          
          // Set duration when video is loaded
          setTimeout(() => {
            if (this.videoPlayer?.nativeElement) {
              const video = this.videoPlayer.nativeElement;
              video.onloadedmetadata = () => {
                const seconds = Math.floor(video.duration);
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                this.videoDuration = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
              };
            }
          }, 500);
        }
      }
    } catch (e) {
      console.error('Error processing video', e);
      this.showToast('Error al procesar el video');
    } finally {
      this.isLoading = false;
    }
  }
  
  blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        // Extract the base64 part if it's a data URL
        const base64Content = base64data.split(',')[1];
        resolve(base64Content);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  
  selectExerciseType(typeId: string) {
    this.exerciseTypes.forEach(type => {
      type.selected = type.id === typeId;
    });
    
    const selectedType = this.exerciseTypes.find(t => t.selected);
    if (selectedType) {
      this.exerciseType = selectedType.id;
    }
  }

  async saveExercise() {
    // Validar datos
    if (!this.exerciseName.trim()) {
      this.showToast('El nombre del ejercicio es obligatorio');
      return;
    }
    
    if (!this.videoPath) {
      this.showToast('Debes seleccionar o grabar un video');
      return;
    }
    
    this.isLoading = true;
    
    try {
      // Crear un FormData para enviar datos y archivos
      const formData = new FormData();
      formData.append('nombre', this.exerciseName);
      formData.append('descripcion', this.exerciseDescription || '');
      formData.append('grupo_muscular', this.muscleGroup || '');
      formData.append('tipo', this.exerciseType);
      
      // Obtener el archivo de video en blob/File
      let videoFile: Blob | null = null;
      
      if (Capacitor.getPlatform() === 'web') {
        // En web, el videoPath ya es un blob URL, necesitamos convertirlo a Blob
        try {
          if (typeof this.videoPath === 'string') {
            const response = await fetch(this.videoPath);
            videoFile = await response.blob();
          } else if (this.videoPath instanceof Blob) {
            videoFile = this.videoPath;
          }
        } catch (e) {
          console.error('Error al obtener el blob del video', e);
          this.showToast('Error al procesar el video');
          this.isLoading = false;
          return;
        }
      } else {
        // En nativo, necesitamos leer el archivo del filesystem si lo guardamos allí
        // o directamente usar el webPath para obtener el blob
        try {
          if (typeof this.videoPath === 'string' && this.videoPath.startsWith('file://')) {
            // Si hemos guardado el archivo en el filesystem, lo leemos
            const pathString: string = this.videoPath;
            const fileData = await Filesystem.readFile({
              path: pathString.replace('file://', ''),
              directory: Directory.Data
            });
            
            // Convertir base64 a blob
            const byteCharacters = atob(fileData.data as string);
            const byteArrays = [];
            for (let offset = 0; offset < byteCharacters.length; offset += 512) {
              const slice = byteCharacters.slice(offset, offset + 512);
              const byteNumbers = new Array(slice.length);
              for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              byteArrays.push(byteArray);
            }
            videoFile = new Blob(byteArrays, { type: 'video/mp4' });
          } else if (typeof this.videoPath === 'string') {
            // Si no, obtenemos el blob desde la URL
            const response = await fetch(this.videoPath);
            videoFile = await response.blob();
          } else if (this.videoPath instanceof Blob) {
            // Si ya es un Blob, lo usamos directamente
            videoFile = this.videoPath;
          }
        } catch (e) {
          console.error('Error al leer el archivo de video', e);
          this.showToast('Error al leer el archivo de video');
          this.isLoading = false;
          return;
        }
      }
      
      // Verificar que hemos obtenido el archivo correctamente
      if (!videoFile) {
        this.showToast('Error al procesar el video');
        this.isLoading = false;
        return;
      }
      
      // Crear un nombre de archivo basado en el timestamp
      const fileName = `video_${new Date().getTime()}.mp4`;
      
      // Añadir el archivo de video al FormData
      formData.append('video', videoFile, fileName);
      
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
        // No establecemos Content-Type porque FormData lo hace automáticamente con el boundary
      });
      
      // Enviar datos a la API
      const response = await this.http.post('http://127.0.0.1:5000/api/ejercicios', formData, { 
        headers 
      }).toPromise();
      
      this.showToast('Ejercicio guardado correctamente');
      this.resetForm();
    } catch (e) {
      console.error('Error saving exercise', e);
      this.showToast('Error al guardar el ejercicio');
    } finally {
      this.isLoading = false;
    }
  }
  
  resetForm() {
    this.exerciseName = '';
    this.exerciseDescription = '';
    this.exerciseType = 'fuerza';
    this.muscleGroup = '';
    this.videoUrl = null;
    this.videoPath = null;
    this.videoDuration = '00:00';
    
    this.exerciseTypes.forEach(type => {
      type.selected = type.id === 'fuerza';
    });
  }
  
  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}