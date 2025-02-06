import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { AltaClienteModalComponent } from '../alta-cliente-modal/alta-cliente-modal.component';
import { ClienteService } from '../../services/cliente-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-gestor-clientes',
  templateUrl: './gestor-clientes.component.html',
  styleUrls: ['./gestor-clientes.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule, SpinnerComponent],
})
export class GestorClientesComponent implements OnInit {
  clientes: any[] = [];
  clientesFiltrados: any[] = [];
  isLoading: boolean = true;

  filtrosForm: FormGroup;
  tiposContribuyentes: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog, private clienteService: ClienteService) {
    this.filtrosForm = this.fb.group({
      nombre: [''],
      dni: [''],
      cuit: [''],
      tipoContribuyente: [''],
      telefono: [''],
      email: [''],
      debe: [''],
      activo: [''],
    });
  }

  ngOnInit(): void {
    this.obtenerClientes();
    this.obtenerTipoContribuyentes();
  }

  obtenerClientes() {
    this.isLoading = true;
    this.clienteService.obtenerClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        this.clientesFiltrados = clientes;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando clientes', err);
        this.isLoading = false;
      }
    });
  }

  obtenerTipoContribuyentes() {
    this.clienteService.obtenerTipoContribuyentes().subscribe((data) => {
      console.log(data)
      this.tiposContribuyentes = data;
    });
  }

  aplicarFiltros() { 
    const filtros = this.filtrosForm.value;
    const nombreBuscado = filtros.nombre.toLowerCase().trim();
  
    this.clientesFiltrados = this.clientes.filter((cliente) => {
      const nombreCompleto = `${cliente.nombre} ${cliente.apellido}`.toLowerCase();
  
      return (
        (!filtros.nombre || nombreCompleto.includes(nombreBuscado)) &&
        (!filtros.dni || cliente.dni.includes(filtros.dni)) &&
        (!filtros.cuit || cliente.cuit.includes(filtros.cuit)) &&
        (!filtros.tipoContribuyente || cliente.tipoContribuyente.nombre === filtros.tipoContribuyente) &&
        (!filtros.telefono || cliente.telefono.includes(filtros.telefono)) &&
        (!filtros.email || cliente.email?.includes(filtros.email)) && 
        (filtros.debe === '' || cliente.debe === (filtros.debe === 'true')) &&
        (filtros.activo === '' || cliente.estado === (filtros.activo === 'true'))
      );
    });
  }

  abrirModalAltaCliente() {
    const dialogRef = this.dialog.open(AltaClienteModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((nuevoCliente) => {
      if (nuevoCliente) {
        this.obtenerClientes();
      }
    });
  }

  editarCliente(cliente: any) {

  }

  eliminarCliente(cliente: any) {

  }
}