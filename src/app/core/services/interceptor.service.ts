import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  private toastr = inject(ToastrService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        const message = error.message ? error.message : error.error?.message;
        this.toastr.error(message, "Error");
        throw error;
      })
    );
  }
}
