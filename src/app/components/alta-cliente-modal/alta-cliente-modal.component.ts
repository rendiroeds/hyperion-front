import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../services/cliente-service.service';
import { ModalAlertComponent } from '../alerta-modal/modal-alerta/modal-alerta.component';

@Component({
  selector: 'app-alta-cliente-modal',
  imports: [ReactiveFormsModule, ModalAlertComponent],
  templateUrl: './alta-cliente-modal.component.html',
  styleUrl: './alta-cliente-modal.component.scss'
})
export class AltaClienteModalComponent {

  altaClienteForm: FormGroup;
  showAlert: boolean = false; // Controla la visibilidad de la alerta
  alertMessage: string = ''; // Mensaje de la alerta
  alertType: 'success' | 'error' = 'success'; // Tipo de alerta

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AltaClienteModalComponent>,
    private http: HttpClient,
    private clienteService: ClienteService
  ) {
    this.altaClienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],  // Agregar
      direccion: ['', Validators.required],  // Agregar
      cuit: ['', Validators.required],
      whatsapp: ['', Validators.required],  // Agregar
      email: ['', [Validators.required, Validators.email]],
      tipoContribuyente: [null, Validators.required],  // Debe ser un número
      provincia: [null, Validators.required],  // Agregar
      fechaAlta: ['', Validators.required]
    });
  }

  guardarCliente() {
    if (this.altaClienteForm.valid) {
      this.clienteService.guardarCliente(this.altaClienteForm.value).subscribe(
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
