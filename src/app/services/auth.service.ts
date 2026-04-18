import { Injectable, signal, computed, inject, NgZone } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth); // Inyectamos el servicio de autenticación de Firebase
  private router = inject(Router); // Para redireccionar después de login/logout
  private zone = inject(NgZone); // Para asegurar que las redirecciones ocurran dentro del Angular Zone

  // Estado del usuario (Base de toda la app)
  user$ = user(this.auth); // user$ es un Observable que emite el estado del usuario (null si no hay sesión)
  userSignal = toSignal(this.user$); // userSignal es la versión señal de user$, para usarla directamente en templates y lógica reactiva

  usuarioLogueado = computed(() => this.userSignal()?.email?.toLowerCase() || null); // Computed que devuelve el email del usuario logueado o null si no hay sesión

  // Helper para saber si es Admin
  // computed es una función que crea una señal computada, que se actualiza automáticamente cuando las señales que usa cambian.
  // En este caso, se actualiza cuando cambia el usuario logueado.
  esAdmin = computed(() => {
    const email = this.usuarioLogueado();
    return email === 'admin@gmail.com' || email === 'estebangarriga@gmail.com';
  });

  async login(email: string, pass: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, pass);
      this.zone.run(() => this.router.navigate(['/agenda']));
    } catch (e: any) {
      alert('Error en login: ' + e.message);
    }
  }

  async registrar(email: string, pass: string) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, pass);
      this.zone.run(() => this.router.navigate(['/agenda']));
    } catch (e: any) {
      alert('Error al registrar: ' + e.message);
      throw e;
    }
  }

  async logout() {
    await signOut(this.auth);
    this.zone.run(() => this.router.navigate(['/home']));
  }
}
