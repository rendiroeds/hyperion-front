import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-scan-ticket',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './scan-ticket.component.html',
  styleUrl: './scan-ticket.component.scss'
})
export class ScanTicketComponent {
  fileSelected: File | null = null;
  fileName: string = '';
  loading: boolean = false;
  errorMsg: string = '';
  successMsg: string = '';
  lastCsvBlob: Blob | null = null;

  constructor(private imageService: ImageService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    this.fileSelected = file;
    this.fileName = file.name;
    this.errorMsg = '';
    this.successMsg = '';
    this.lastCsvBlob = null;
  }

  clearSelection(fileInput?: HTMLInputElement) {
    this.fileSelected = null;
    this.fileName = '';
    this.errorMsg = '';
    this.successMsg = '';
    this.lastCsvBlob = null;

    if (fileInput) {
      fileInput.value = '';
    }
  }

  uploadTicket() {
    if (!this.fileSelected) {
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.imageService.uploadTicket(this.fileSelected).subscribe({
      next: (blob: Blob) => {
        this.loading = false;
        this.successMsg = 'Ticket procesado con exito.';
        this.lastCsvBlob = blob;
        this.downloadCsv();
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Error al procesar el ticket. Intenta con otra imagen.';
      }
    });
  }

  downloadCsv() {
    if (!this.lastCsvBlob) {
      return;
    }

    const url = window.URL.createObjectURL(this.lastCsvBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'libro_iva_compras_ticket.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(url), 100);
  }
}
