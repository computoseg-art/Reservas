import { CommonModule } from '@angular/common'; // Para @for, @if, etc.
import { RouterLink, RouterLinkActive } from '@angular/router'; // <--- ESTO ES LO QUE FALTA
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, // Importante para [routerLink]
    RouterLinkActive, // Importante para [routerLinkActive]
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}
