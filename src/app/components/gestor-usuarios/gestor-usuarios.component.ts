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
