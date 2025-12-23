import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  showPassword = false;
  showRecoveryModal = false;
  recoveryForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.recoveryForm = this.fb.group({
      username: ['', [Validators.required]],
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService
        .login(username, password)
        .pipe(
          catchError(() => {
            this.errorMessage =
              'Error al iniciar: Usuario o contrase\u00f1a incorrectos, por favor verifique de nuevo.';
            return of(null);
          })
        )
        .subscribe((response) => {
          if (response?.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', username);
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage =
              'Error al iniciar: Usuario o contrase\u00f1a incorrectos, por favor verifique de nuevo.';
          }
        });
    } else {
      this.errorMessage =
        'Error al iniciar: Usuario o contrase\u00f1a incorrectos, por favor verifique de nuevo.';
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  openRecoveryModal(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.recoveryForm.reset();
    this.showRecoveryModal = true;
  }

  closeRecoveryModal(): void {
    this.showRecoveryModal = false;
  }

  onRecover(): void {
    if (this.recoveryForm.invalid) {
      return;
    }
    // TODO: llamar a un servicio para gestionar el envío de recuperación
    this.showRecoveryModal = false;
  }
}
