import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SpinnerComponent } from '../spinner/spinner.component';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../services/usuario-service.service';
import { AltaUsuarioModalComponent } from '../alta-usuario-modal/alta-usuario-modal/alta-usuario-modal.component';

@Component({
  selector: 'app-gestor-usuarios',
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule, SpinnerComponent],
  templateUrl: './gestor-usuarios.component.html',
  styleUrl: './gestor-usuarios.component.scss'
})
export class GestorUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  isLoading: boolean = true;
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  filtrosForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog, private usuarioService: UsuarioService) {
    this.filtrosForm = this.fb.group({
      nombre: [''],
      email: [''],
    });
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.isLoading = true;
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (usuario) => {
        this.usuarios = usuario;
        this.usuariosFiltrados = usuario;
        this.applySort();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando usuarios', err);
        this.isLoading = false;
      }
    });
  }

  aplicarFiltros() { 
    const filtros = this.filtrosForm.value;
    const nombreBuscado = filtros.nombre.toLowerCase().trim();
  
    this.usuariosFiltrados = this.usuarios.filter((usuario) => {
      const nombreCompleto = `${usuario.firstName} ${usuario.lastName}`.toLowerCase();
  
      return (
        (!filtros.nombre || nombreCompleto.includes(nombreBuscado)) &&
        (!filtros.email || usuario.email?.includes(filtros.email))
      );
    });

    this.applySort();
  }

  limpiarFiltros() {
    this.filtrosForm.reset({
      nombre: '',
      email: '',
    });
    this.usuariosFiltrados = [...this.usuarios];
    this.applySort();
  }

  exportCsv() {
    const header = ['ID', 'Usuario', 'Nombre', 'Apellido', 'Email', 'Rol'];
    const rows = this.usuariosFiltrados.map((u) => [
      u.id ?? '',
      u.username ?? '',
      u.firstName ?? '',
      u.lastName ?? '',
      u.email ?? '',
      u.rol ?? ''
    ]);

    const csvContent = [header, ...rows]
      .map((row) =>
        row
          .map((cell: string) => {
            const safe = String(cell).replace(/"/g, '""');
            return `"${safe}"`;
          })
          .join(',')
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'usuarios.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  sortBy(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applySort();
  }

  private applySort() {
    if (!this.sortField) return;
    const direction = this.sortDirection === 'asc' ? 1 : -1;
    this.usuariosFiltrados = [...this.usuariosFiltrados].sort((a, b) => {
      const valA = this.getFieldValue(a, this.sortField);
      const valB = this.getFieldValue(b, this.sortField);
      if (valA == null && valB == null) return 0;
      if (valA == null) return -1 * direction;
      if (valB == null) return 1 * direction;
      if (typeof valA === 'number' && typeof valB === 'number') {
        return (valA - valB) * direction;
      }
      return String(valA).localeCompare(String(valB)) * direction;
    });
  }

  private getFieldValue(item: any, field: string): any {
    switch (field) {
      case 'id':
        return item.id;
      case 'username':
        return item.username;
      case 'firstName':
        return item.firstName;
      case 'lastName':
        return item.lastName;
      case 'email':
        return item.email;
      case 'rol':
        return item.rol;
      default:
        return item[field];
    }
  }

   abrirModalAltaUsuario() {
     const dialogRef = this.dialog.open(AltaUsuarioModalComponent, {
       width: '500px',
     });

     dialogRef.afterClosed().subscribe((nuevoUsuario) => {
       if (nuevoUsuario) {
         this.obtenerUsuarios();
       }
     });
   }

  editarCliente(cliente: any) {

  }

  eliminarCliente(cliente: any) {

  }
}
