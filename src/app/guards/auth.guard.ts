import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Observamos el estado del usuario de Firebase
  return user(auth).pipe(
    take(1), // Tomamos el primer valor emitido
    map((currUser) => {
      if (currUser) {
        return true; // Hay usuario, permite el paso
      } else {
        console.log('Guard: Acceso denegado, redirigiendo a home');
        router.navigate(['/home']);
        return false; // No hay usuario, bloquea
      }
    }),
  );
};
