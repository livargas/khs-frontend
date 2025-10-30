import { inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStore } from '@core/storage/auth-store';

export function tokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService: AuthStore = inject(AuthStore);
  const token = authService.getToken();

  let request = req;
  if (token) {
    request = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  return next(request);
}
