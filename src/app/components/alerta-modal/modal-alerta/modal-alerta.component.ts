import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-alerta',
  templateUrl: './modal-alerta.component.html',
  styleUrls: ['./modal-alerta.component.scss'],
  imports: [NgClass, NgIf]
})
export class ModalAlertComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';
  @Input() dismissible: boolean = true;
  visible: boolean = true;

  hide() {
    this.visible = false;
  }
  
}
