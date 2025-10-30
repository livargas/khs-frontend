import { HttpEvent, HttpHandler, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function contentTypeInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const reqWithHeader = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  return next(reqWithHeader);
}
