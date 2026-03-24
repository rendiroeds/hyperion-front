import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { GestorClientesComponent } from './components/gestor-clientes/gestor-clientes.component';
import { GestorUsuariosComponent } from './components/gestor-usuarios/gestor-usuarios.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScanPdfComponent } from './components/scan-pdf/scan-pdf/scan-pdf.component';
import { ConsultaDeudaComponent } from './components/consulta-deuda/consulta-deuda.component';
import { EscaneoTicketsComponent } from './components/escaneo-tickets/escaneo-tickets.component';
import { ScanTicketComponent } from './components/scan-ticket/scan-ticket/scan-ticket.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeRedirectComponent } from './components/home-redirect/home-redirect.component';

export const routes: Routes = [
  { path: '', component: HomeRedirectComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'gestion-clientes', component: GestorClientesComponent },
      { path: 'gestion-usuarios', component: GestorUsuariosComponent },
      { path: 'consulta-deuda', component: ConsultaDeudaComponent },
      { path: 'escaneo-tickets', component: EscaneoTicketsComponent },
      { path: 'carga-pdf', component: ScanPdfComponent },
      { path: 'scan-ticket', component: ScanTicketComponent },
      // Puedes agregar más rutas hijas aquí si es necesario
    ]
  },
  { path: '**', component: NotFoundComponent },
];
