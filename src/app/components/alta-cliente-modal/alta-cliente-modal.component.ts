import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../services/cliente-service.service';
import { ModalAlertComponent } from '../alerta-modal/modal-alerta/modal-alerta.component';

@Component({
  selector: 'app-alta-cliente-modal',
  imports: [ReactiveFormsModule, ModalAlertComponent, CommonModule],
  templateUrl: './alta-cliente-modal.component.html',
  styleUrl: './alta-cliente-modal.component.scss'
})
export class AltaClienteModalComponent implements OnInit {

  altaClienteForm: FormGroup;
  showAlert: boolean = false; // Controla la visibilidad de la alerta
  alertMessage: string = ''; // Mensaje de la alerta
  alertType: 'success' | 'error' = 'success'; // Tipo de alerta
  categoriasInternas: string[] = []; // Opciones del select de categoría interna

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
      tipoContribuyente: ['', Validators.required],
      subcategoriaMonotributo: [''], // Se requiere dinámicamente si es Monotributista
      provincia: [null, Validators.required],  // Agregar
      categoriaInterna: [{ value: '', disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
    // Escuchar los cambios en el selector 'tipoContribuyente'
    this.altaClienteForm.get('tipoContribuyente')?.valueChanges.subscribe((tipo) => {
      const categoriaControl = this.altaClienteForm.get('categoriaInterna');
      const subcategoriaControl = this.altaClienteForm.get('subcategoriaMonotributo');
      
      categoriaControl?.setValue(''); // Reiniciamos el valor seleccionado

      // Asignamos las opciones correspondientes y habilitamos el campo
      if (tipo === 'Monotributista') {
        this.categoriasInternas = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7'];
        categoriaControl?.enable();
        subcategoriaControl?.setValidators([Validators.required]);
      } else if (tipo === 'Responsable Inscripto') {
        this.categoriasInternas = ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10'];
        categoriaControl?.enable();
        subcategoriaControl?.clearValidators();
        subcategoriaControl?.setValue('');
      } else if (tipo === 'IVA Exento') {
        this.categoriasInternas = ['E1', 'E2', 'E3'];
        categoriaControl?.enable();
        subcategoriaControl?.clearValidators();
        subcategoriaControl?.setValue('');
      } else {
        this.categoriasInternas = [];
        categoriaControl?.disable(); // Deshabilita (grisa) el select si no hay un tipo válido
        subcategoriaControl?.clearValidators();
        subcategoriaControl?.setValue('');
      }
      subcategoriaControl?.updateValueAndValidity(); // Refrescar validaciones del formulario
    });
  }

  guardarCliente() {
    if (this.altaClienteForm.valid) {
      const clienteData = { ...this.altaClienteForm.value };

      // Concatenar subcategoría si es Monotributista
      if (clienteData.tipoContribuyente === 'Monotributista' && clienteData.subcategoriaMonotributo) {
        clienteData.tipoContribuyente = `Monotributista ${clienteData.subcategoriaMonotributo}`;
      }
      
      // Eliminar el campo temporal para no enviarlo al backend
      delete clienteData.subcategoriaMonotributo;

      this.clienteService.guardarCliente(clienteData).subscribe(
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
