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
  sortField: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

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
        this.applySort();
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
    this.applySort();
  }

  sortBy(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applySort();
  }

  private applySort(): void {
    if (!this.sortField) {
      return;
    }
    const direction = this.sortDirection === 'asc' ? 1 : -1;
    this.clientesFiltrados = [...this.clientesFiltrados].sort((a, b) => {
      const valA = this.getFieldValue(a, this.sortField!);
      const valB = this.getFieldValue(b, this.sortField!);
      if (valA == null && valB == null) return 0;
      if (valA == null) return -1 * direction;
      if (valB == null) return 1 * direction;
      if (typeof valA === 'number' && typeof valB === 'number') {
        return (valA - valB) * direction;
      }
      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();
      if (strA < strB) return -1 * direction;
      if (strA > strB) return 1 * direction;
      return 0;
    });
  }

  private getFieldValue(item: any, field: string): any {
    switch (field) {
      case 'nombre':
      case 'apellido':
      case 'direccion':
      case 'cuit':
      case 'whatsapp':
      case 'email':
      case 'fechaAlta':
        return item[field];
      case 'clienteId':
        return item.clienteId;
      case 'tipoContribuyente':
        return item.tipoContribuyente?.nombre;
      case 'provincia':
        return item.provincia?.nombre;
      case 'debe':
        return item.debe;
      case 'estado':
        return item.estado;
      default:
        return item[field];
    }
  }

  exportPdf(): void {
    // TODO: implementar exportación a PDF
  }

  exportCsv(): void {
    if (!this.clientesFiltrados?.length) {
      return;
    }
    const headers = [
      'ID',
      'Nombre',
      'Apellido',
      'Dirección',
      'CUIT',
      'WhatsApp',
      'Email',
      'Tipo Contribuyente',
      'Provincia',
      'Fecha Alta',
      'Debe',
      'Estado'
    ];
    const rows = this.clientesFiltrados.map((c) => [
      c.clienteId ?? '',
      c.nombre ?? '',
      c.apellido ?? '',
      c.direccion ?? '',
      c.cuit ?? '',
      c.whatsapp ?? '',
      c.email ?? '',
      c.tipoContribuyente?.nombre ?? '',
      c.provincia?.nombre ?? '',
      c.fechaAlta ?? '',
      c.debe ? 'Sí' : 'No',
      c.estado ? 'Activo' : 'Inactivo',
    ]);

    const csvContent =
      [headers, ...rows]
        .map((r) => r.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clientes.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  limpiarFiltros(): void {
    this.filtrosForm.reset({
      nombre: '',
      dni: '',
      cuit: '',
      tipoContribuyente: '',
      telefono: '',
      email: '',
      debe: '',
      activo: '',
    });
    this.clientesFiltrados = this.clientes;
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
