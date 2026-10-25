import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/** Il backend risponde con { errore: "..." }: lo trasformiamo in un Error con quel messaggio. */
export const erroriApiInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      const msg: string =
        e.error?.errore ||
        (e.status === 0
          ? 'Backend non raggiungibile (porta 3000)'
          : e.statusText || 'Errore di rete');
      return throwError(() => new Error(msg));
    }),
  );
