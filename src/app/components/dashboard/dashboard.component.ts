import { Component } from '@angular/core';
import { SideMenuComponent } from "../side-menu/side-menu.component";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [SideMenuComponent, CommonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showSidebar: boolean = true;

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}
