import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

 /* getUsuario(): any {
    const userStr = localStorage.getItem('usuario');
    return userStr ? JSON.parse(userStr) : null;
  }*/

  logout(): void {
    localStorage.removeItem('token');
    //localStorage.removeItem('usuario');
  }
}
