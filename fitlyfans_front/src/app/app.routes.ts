import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard'; // Ajusta la ruta según donde hayas creado el archivo
import { loginGuard } from './guards/auth.guard';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
    canActivate: [loginGuard]
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard] // Aquí aplicamos el guard
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
    canActivate: [loginGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'register-trainer',
    loadComponent: () => import('./register-trainer/register-trainer.page').then( m => m.RegisterTrainerPage)
  },
  {
    path: 'perfil-entrenador/:id',
    loadComponent: () =>
      import('./pages/perfil-entrenador/perfil-entrenador.page').then(m => m.PerfilEntrenadorPage),
    canActivate: [authGuard]
  },
  {
    path: 'explore-coaches',
    loadComponent: () => import('./pages/explore-coaches/explore-coaches.page').then( m => m.ExploreCoachesPage),
    canActivate: [authGuard]
  },
  {
    path: 'chat/:entrenador_id/:suscriptor_id',
    loadComponent: () => import('./pages/chat/chat.page').then(m => m.ChatPage),
    canActivate: [authGuard]
  },
  {
    path: 'home-trainer',
    loadComponent: () => import('./pages/home-trainer/home-trainer.page').then( m => m.HomeTrainerPage),
    canActivate: [authGuard]
  },
  {
    path: 'workout-routine',
    loadComponent: () => import('./pages/workout-routine/workout-routine.page').then( m => m.WorkoutRoutinePage),
    canActivate: [authGuard]
  },
  {
    path: 'create-exercise',
    loadComponent: () => import('./pages/create-exercise/create-exercise.page').then( m => m.CreateExercisePage),
    canActivate: [authGuard]
  },
  {
    path: 'subscriber-management',
    loadComponent: () => import('./pages/subscriber-management/subscriber-management.page').then( m => m.SubscriberManagementPage),
    canActivate: [authGuard]
  },
  {
    path: 'payment',
    loadComponent: () =>import('./pages/payment/payment.page').then(m => m.PaymentPage),
     canActivate: [authGuard]
  },



  


];