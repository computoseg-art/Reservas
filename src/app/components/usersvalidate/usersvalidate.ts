import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-usersvalidate',
  imports: [CommonModule, FormsModule],
  templateUrl: './usersvalidate.html',
  styleUrl: './usersvalidate.css',
})
export class Usersvalidate {
  auth = inject(AuthService);

  // Volvemos a usar 'nombreUsuario' para que coincida con tu HTML
  nombreUsuario = signal('');
  passwordUsuario = signal('');
  esRegistro = signal(false);

  accionPrincipal() {
    const email = this.nombreUsuario().trim();
    const pass = this.passwordUsuario().trim();

    if (email.length > 0 && pass.length >= 6) {
      if (this.esRegistro()) {
        this.auth.registrar(email, pass);
      } else {
        this.auth.login(email, pass);
      }
    } else {
      alert('Por favor, ingresa un correo y una contraseña (mínimo 6 caracteres).');
    }
  }
}
