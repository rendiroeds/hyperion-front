import { Component } from '@angular/core';
import { ImageService } from '../../../services/image.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-scan-pdf',
  imports: [NgIf],
  templateUrl: './scan-pdf.component.html',
  styleUrl: './scan-pdf.component.scss'
})
export class ScanPdfComponent {
  fileSelected: File | null = null;
  fileName: string = '';

  constructor(private imageService: ImageService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileSelected = file;
      this.fileName = file.name;
    }
  }

  uploadFile() {
    if (this.fileSelected) {
      this.imageService.uploadPdf(this.fileSelected).subscribe(response => {
        this.downloadFile(response, 'libro_iva_digital.zip');
      }, error => {
        console.error('Error al procesar el PDF', error);
      });
    }
  }

  downloadFile(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/zip' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  

}
