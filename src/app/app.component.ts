import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { HttpClient } from '@angular/common/http';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ModalAlertComponent } from './components/alerta-modal/modal-alerta/modal-alerta.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, SideMenuComponent, ReactiveFormsModule, SpinnerComponent, ModalAlertComponent],
  providers: [
    HttpClient
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hyperion-FE';
}
