import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SideMenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  showSidebar = true;
  userMenuOpen = false;
  userName = 'Nombre usuario';
  userDni = '11.111.111';
  userRole = 'Usuario';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedName = localStorage.getItem('username');
    if (storedName) {
      this.userName = storedName;
    }
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      this.userRole = storedRole;
    }
    const storedDni = localStorage.getItem('userDni');
    if (storedDni) {
      this.userDni = storedDni;
    }
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userDni');
    this.router.navigate(['/login']);
  }
}
