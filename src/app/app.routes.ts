import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { GestorClientesComponent } from './components/gestor-clientes/gestor-clientes.component';
import { GestorUsuariosComponent } from './components/gestor-usuarios/gestor-usuarios.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'gestion-clientes', component: GestorClientesComponent },
      { path: 'gestion-usuarios', component: GestorUsuariosComponent },
      // Puedes agregar más rutas hijas aquí si es necesario
    ]
  },
  { path: '**', redirectTo: 'dashboard' },
];
