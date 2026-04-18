import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-card">
      <h2>Iniciar Sesión</h2>
      <input
        [ngModel]="email()"
        (ngModelChange)="email.set($event)"
        placeholder="Tu correo electrónico"
      />
      <input
        type="password"
        [ngModel]="password()"
        (ngModelChange)="password.set($event)"
        placeholder="Tu contraseña"
      />

      <button (click)="entrar()" [disabled]="!email() || !password()">Entrar</button>
    </div>
  `,
})
export class Login {
  email = signal('');
  password = signal('');
  auth = inject(AuthService);

  entrar() {
    // Ahora pasamos los dos argumentos que pide el servicio
    this.auth.login(this.email(), this.password());
  }
}
