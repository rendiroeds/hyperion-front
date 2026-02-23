import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { GestorClientesComponent } from './components/gestor-clientes/gestor-clientes.component';
import { GestorUsuariosComponent } from './components/gestor-usuarios/gestor-usuarios.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScanPdfComponent } from './components/scan-pdf/scan-pdf/scan-pdf.component';
import { ConsultaDeudaComponent } from './components/consulta-deuda/consulta-deuda.component';
import { ScanTicketComponent } from './components/scan-ticket/scan-ticket/scan-ticket.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { HonorariosComponent } from './components/honorarios/honorarios.component';
import { GestionCobrosComponent } from './components/gestion-cobros/gestion-cobros.component';
import { EstadoCuentaComponent } from './components/estado-cuenta/estado-cuenta.component';
import { ArqueoCajaComponent } from './components/arqueo-caja/arqueo-caja.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'gestion-clientes', component: GestorClientesComponent },
      { path: 'gestion-usuarios', component: GestorUsuariosComponent },
      { path: 'consulta-deuda', component: ConsultaDeudaComponent },
      { path: 'escaneo-tickets', redirectTo: 'scan-ticket', pathMatch: 'full' },
      { path: 'carga-pdf', component: ScanPdfComponent },
      { path: 'scan-ticket', component: ScanTicketComponent },
      { path: 'quienes-somos', component: QuienesSomosComponent },
      { path: 'honorarios-presupuestos', component: HonorariosComponent },
      { path: 'gestion-cobros', component: GestionCobrosComponent },
      { path: 'estado-cuenta', component: EstadoCuentaComponent },
      { path: 'caja-gastos-operativos', component: ArqueoCajaComponent },
      { path: 'reportes-dashboard', component: ReportesComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];
