import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private router = inject(Router); // inyección manual de servicios

  constructor() {
    this.checkLoginExpiration();
  }

  checkLoginExpiration() {
    const loginTime = localStorage.getItem('loginTime');

    if (loginTime) {
      const now = new Date().getTime();
      const loginTimestamp = parseInt(loginTime, 10);
      const diff = now - loginTimestamp;

      const oneHour = 60 * 60 * 1000; // 1 hora en milisegundos

      if (diff > oneHour) {
        console.log('Sesión expirada. Limpiando localStorage.');
        localStorage.clear();
        this.router.navigate(['/login']);
      } else {
        const remainingTime = oneHour - diff;
        setTimeout(() => {
          console.log('Tiempo cumplido. Limpiando localStorage.');
          localStorage.clear();
          this.router.navigate(['/login']);
        }, remainingTime);
      }
    }
  }
}
