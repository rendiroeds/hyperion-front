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
  

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).pipe(
        catchError((error) => {
          this.errorMessage = 'Usuario o contraseña inválido';
          return of(null);
        })
      ).subscribe((response) => {
        if (response?.token) {
          // Guarda el token en sessionStorage
          localStorage.setItem('token', response.token)
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Usuario o contraseña inválido';
        }
      });
    } else {
      this.errorMessage = 'Usuario o contraseña inválido';
    }
  }
  
}