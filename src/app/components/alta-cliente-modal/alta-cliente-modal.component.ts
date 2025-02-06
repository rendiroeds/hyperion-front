import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../services/cliente-service.service';

@Component({
  selector: 'app-alta-cliente-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './alta-cliente-modal.component.html',
  styleUrl: './alta-cliente-modal.component.scss'
})
export class AltaClienteModalComponent {

  altaClienteForm: FormGroup;

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
          },
          (error) => {
             console.error('Error al guardar cliente:', error);
          }
       );
    }
 }
  

  cerrarModal() {
    this.dialogRef.close();
  }
}
