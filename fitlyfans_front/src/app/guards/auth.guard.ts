import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, timer } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  if (token) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};

export const loginGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');
  const router = inject(Router);

  if (token) {
    // Si el usuario está logueado, redirigir según userType
    if (userType === 'entrenador') {
      router.navigate(['/home-trainer']);
    } else {
      router.navigate(['/home']);
    }
    return false;
  } else {
    // Si el usuario NO está logueado, permitir acceso al login
    return true;
  }
};