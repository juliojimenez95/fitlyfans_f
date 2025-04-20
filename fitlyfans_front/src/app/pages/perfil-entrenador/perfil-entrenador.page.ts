import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router /*, RouterLink */} from '@angular/router';

@Component({
  selector: 'app-perfil-entrenador',
  templateUrl: './perfil-entrenador.page.html',
  styleUrls: ['./perfil-entrenador.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule/*, RouterLink*/],
})
export class PerfilEntrenadorPage implements OnInit {
  entrenador: any = null;
  idEntrenador: number = 1; // por defecto

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Si deseas obtener el ID desde los parámetros de la ruta:
    // this.idEntrenador = +this.route.snapshot.paramMap.get('id')!;
    
    this.obtenerPerfil();
  }

  obtenerPerfil() {
    this.http.get(`http://127.0.0.1:5000/api/entrenador/${this.idEntrenador}`).subscribe({
      next: (res: any) => {
        this.entrenador = res;
        console.log('Datos del entrenador:', res);
      },
      error: (err) => {
        console.error('Error al obtener el perfil del entrenador:', err);
      },
    });
  }

  volver() {
    this.router.navigate(['/']); // O ajusta según tu flujo (ej. /home)
  }
}
