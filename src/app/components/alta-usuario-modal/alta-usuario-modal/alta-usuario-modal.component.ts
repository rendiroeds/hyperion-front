import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../services/usuario-service.service';
import { ModalAlertComponent } from '../../alerta-modal/modal-alerta/modal-alerta.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-alta-usuario-modal',
  imports: [ReactiveFormsModule, ModalAlertComponent, NgIf],
  templateUrl: './alta-usuario-modal.component.html',
  styleUrl: './alta-usuario-modal.component.scss'
})
export class AltaUsuarioModalComponent {
  altaUsuarioForm: FormGroup;

  showAlert: boolean = false; // Controla la visibilidad de la alerta
  alertMessage: string = ''; // Mensaje de la alerta
  alertType: 'success' | 'error' = 'success'; // Tipo de alerta

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AltaUsuarioModalComponent>,
    private usuarioService: UsuarioService,
    private dialog: MatDialog // ✅ Inyectamos MatDialog
  ) {
    this.altaUsuarioForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required]
    });
  }

  guardarUsuario() {
    if (this.altaUsuarioForm.valid) {
      this.usuarioService.guardarUsuario(this.altaUsuarioForm.value).subscribe(
        (response) => {
          console.log('Cliente guardado con éxito:', response);
          this.mostrarAlerta('Cliente guardado con éxito', 'success');
          this.dialogRef.close(true); // Cierra el modal y devuelve un valor (opcional)
        },
        (error) => {
          console.error('Error al guardar cliente:', error);
          this.mostrarAlerta('Error al guardar el cliente', 'error');
        }
      );
    } else {
      this.mostrarAlerta('Por favor, complete todos los campos requeridos', 'error');
    }
  }

  mostrarAlerta(mensaje: string, tipo: 'success' | 'error') {
    this.alertMessage = mensaje;
    this.alertType = tipo;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

  cerrarModal() {
    this.dialogRef.close();
  }
}
